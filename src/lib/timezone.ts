import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { GUILD_TIMEZONE, recurringEvents, type RecurringEvent } from "./schedule";

export { formatInTimeZone } from "date-fns-tz";

/**
 * A week frame is the calendar week shown by the schedule, expressed as plain
 * `yyyy-MM-dd` strings anchored to a Monday. String space keeps every render
 * deterministic: the server can prerender the current guild week (Manila) and
 * the client can hydrate from the exact same values before switching to the
 * visitor's own timezone.
 */
export type WeekFrame = {
  weekStartDate: string;
  todayDate: string;
};

const DAY_MS = 86_400_000;

function noonUTC(dateISO: string): Date {
  return new Date(`${dateISO}T12:00:00Z`);
}

function isoDay(dateUTC: Date): string {
  return dateUTC.toISOString().slice(0, 10);
}

export function shiftISODate(dateISO: string, days: number): string {
  return isoDay(new Date(noonUTC(dateISO).getTime() + days * DAY_MS));
}

export function dayOfWeekIndex(dateISO: string): number {
  return noonUTC(dateISO).getUTCDay();
}

export function getTargetWeekFrame(
  targetTimezone: string,
  reference: Date = new Date(),
): WeekFrame {
  const todayDate = formatInTimeZone(reference, targetTimezone, "yyyy-MM-dd");
  const isoWeekday = Number(formatInTimeZone(reference, targetTimezone, "i"));
  return {
    weekStartDate: shiftISODate(todayDate, 1 - isoWeekday),
    todayDate,
  };
}

export function getWeekStartDates(weekStartDate: string): string[] {
  return Array.from({ length: 7 }, (_, index) => shiftISODate(weekStartDate, index));
}

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekdayShortNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function formatWeekdayName(dateISO: string, short = false): string {
  return (short ? weekdayShortNames : weekdayNames)[dayOfWeekIndex(dateISO)];
}

export function formatDate(dateISO: string): string {
  return noonUTC(dateISO).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatTime(wallTime: string): string {
  return new Date(wallTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function detectBrowserTimezone(): string {
  if (typeof window === "undefined") return GUILD_TIMEZONE;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return GUILD_TIMEZONE;
  }
}

export interface EventOccurrence {
  id: string;
  eventId: string;
  name: string;
  category: RecurringEvent["category"];
  startTime: string;
  endTime?: string;
  /** Wall-calendar day (yyyy-MM-dd) of the event in the target display timezone. */
  wallDate: string;
  /** 0=Sunday .. 6=Saturday, derived from wallDate for calendar placement. */
  localDayIndex: number;
  notes?: string;
  isFlexible?: boolean;
}

export function createEventOccurrence(
  event: RecurringEvent,
  weekStartDate: string,
  targetTimezone: string,
): EventOccurrence | null {
  const dayOffset = (event.dayOfWeek - 1 + 7) % 7;
  const eventDateISO = shiftISODate(weekStartDate, dayOffset);

  const startInstant = fromZonedTime(`${eventDateISO}T${event.startTime}:00`, GUILD_TIMEZONE);
  const startInTarget = formatInTimeZone(startInstant, targetTimezone, "yyyy-MM-dd'T'HH:mm:ss");

  let endTime: string | undefined;
  if (event.endTime) {
    const endInstant = fromZonedTime(`${eventDateISO}T${event.endTime}:00`, GUILD_TIMEZONE);
    endTime = formatInTimeZone(endInstant, targetTimezone, "yyyy-MM-dd'T'HH:mm:ss");
  }

  const wallDate = startInTarget.slice(0, 10);
  const localDayIndex = dayOfWeekIndex(wallDate);

  return {
    id: `${event.id}-${formatInTimeZone(startInstant, GUILD_TIMEZONE, "yyyy-MM-dd")}`,
    eventId: event.id,
    name: event.name,
    category: event.category,
    startTime: startInTarget,
    endTime,
    wallDate,
    localDayIndex,
    notes: event.notes,
    isFlexible: event.isFlexible,
  };
}

export function generateWeekOccurrences(
  weekStartDate: string,
  targetTimezone: string,
): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];
  const weekEndDate = shiftISODate(weekStartDate, 6);

  const inCurrentWeek = (dayISO: string): boolean => dayISO >= weekStartDate && dayISO <= weekEndDate;

  for (const event of recurringEvents) {
    const occurrence = createEventOccurrence(event, weekStartDate, targetTimezone);
    if (occurrence && inCurrentWeek(occurrence.wallDate)) {
      occurrences.push(occurrence);
    }
  }

  for (const offset of [-7, 7]) {
    const adjacentWeekStart = shiftISODate(weekStartDate, offset);
    for (const event of recurringEvents) {
      const occurrence = createEventOccurrence(event, adjacentWeekStart, targetTimezone);
      if (occurrence && inCurrentWeek(occurrence.wallDate)) {
        const exists = occurrences.some(existing => existing.id === occurrence.id);
        if (!exists) occurrences.push(occurrence);
      }
    }
  }

  const seen = new Set<string>();
  const deduplicated = occurrences.filter(occurrence => {
    const key = `${occurrence.eventId}-${occurrence.wallDate}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduplicated.sort(
    (a, b) => Date.parse(a.startTime) - Date.parse(b.startTime),
  );
}

export function groupOccurrencesByDay(occurrences: EventOccurrence[]): EventOccurrence[][] {
  const days: EventOccurrence[][] = [[], [], [], [], [], [], []];
  for (const occ of occurrences) {
    if (occ.localDayIndex >= 0 && occ.localDayIndex <= 6) {
      const calendarIndex = (occ.localDayIndex + 6) % 7;
      days[calendarIndex].push(occ);
    }
  }
  return days;
}

export function getWeekLabel(weekStartDate: string): string {
  const start = noonUTC(weekStartDate);
  const end = noonUTC(shiftISODate(weekStartDate, 6));
  const short = (date: Date, withYear = false) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      ...(withYear ? { year: "numeric" } : {}),
      timeZone: "UTC",
    });
  return `${short(start)} - ${short(end, true)}`;
}
