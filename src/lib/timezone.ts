import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { getDay, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns";
import { GUILD_TIMEZONE, recurringEvents, type RecurringEvent } from "./schedule";

export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function getWeekDays(weekStart: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    days.push(day);
  }
  return days;
}

export function formatWeekdayName(date: Date, short = false): string {
  const dayIndex = getDay(date);
  const names = short
    ? ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return names[dayIndex];
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export { formatInTimeZone } from "date-fns-tz";

export function detectBrowserTimezone(): string {
  if (typeof window === "undefined") return GUILD_TIMEZONE;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return GUILD_TIMEZONE;
  }
}

export function createEventOccurrence(
  event: RecurringEvent,
  weekStart: Date,
  targetTimezone: string
): EventOccurrence | null {
  const eventDayOffset = (event.dayOfWeek - 1 + 7) % 7;
  const eventDate = new Date(weekStart);
  eventDate.setDate(weekStart.getDate() + eventDayOffset);

  const [startHour, startMinute] = event.startTime.split(":").map(Number);
  const startDate = new Date(eventDate);
  startDate.setHours(startHour, startMinute, 0, 0);

  let endDate: Date | undefined;
  if (event.endTime) {
    const [endHour, endMinute] = event.endTime.split(":").map(Number);
    endDate = new Date(eventDate);
    endDate.setHours(endHour, endMinute, 0, 0);
  }

  const startInGuildTz = fromZonedTime(startDate, GUILD_TIMEZONE);
  const startInTargetTz = formatInTimeZone(startInGuildTz, targetTimezone, "yyyy-MM-dd'T'HH:mm:ss");

  let endInTargetTz: string | undefined;
  if (endDate) {
    const endInGuildTz = fromZonedTime(endDate, GUILD_TIMEZONE);
    endInTargetTz = formatInTimeZone(endInGuildTz, targetTimezone, "yyyy-MM-dd'T'HH:mm:ss");
  }

  const localDayIndex = getDay(new Date(startInTargetTz));
  const localDate = new Date(startInTargetTz);

  return {
    id: `${event.id}-${formatInTimeZone(startInGuildTz, GUILD_TIMEZONE, "yyyy-MM-dd")}`,
    eventId: event.id,
    name: event.name,
    category: event.category,
    startTime: startInTargetTz,
    endTime: endInTargetTz,
    localDayIndex,
    localDate,
    notes: event.notes,
    isFlexible: event.isFlexible,
  };
}

export interface EventOccurrence {
  id: string;
  eventId: string;
  name: string;
  category: RecurringEvent["category"];
  startTime: string;
  endTime?: string;
  localDayIndex: number;
  localDate: Date;
  notes?: string;
  isFlexible?: boolean;
}

export function generateWeekOccurrences(weekStart: Date, targetTimezone: string): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  function isInCurrentWeek(date: Date): boolean {
    return date >= weekStart && date <= weekEnd;
  }

  for (const event of recurringEvents) {
    const occurrence = createEventOccurrence(event, weekStart, targetTimezone);
    if (occurrence && isInCurrentWeek(occurrence.localDate)) {
      occurrences.push(occurrence);
    }
  }

  const prevWeekStart = subWeeks(weekStart, 1);
  for (const event of recurringEvents) {
    const occurrence = createEventOccurrence(event, prevWeekStart, targetTimezone);
    if (occurrence && isInCurrentWeek(occurrence.localDate)) {
      const exists = occurrences.some((o) => o.id === occurrence.id);
      if (!exists) occurrences.push(occurrence);
    }
  }

  const nextWeekStart = addWeeks(weekStart, 1);
  for (const event of recurringEvents) {
    const occurrence = createEventOccurrence(event, nextWeekStart, targetTimezone);
    if (occurrence && isInCurrentWeek(occurrence.localDate)) {
      const exists = occurrences.some((o) => o.id === occurrence.id);
      if (!exists) occurrences.push(occurrence);
    }
  }

  // Deduplicate by eventId + local calendar date (target timezone)
  const seen = new Set<string>();
  const deduplicated = occurrences.filter((occ) => {
    const localDateStr = occ.localDate.toISOString().split("T")[0];
    const key = `${occ.eventId}-${localDateStr}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduplicated.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export function groupOccurrencesByDay(occurrences: EventOccurrence[]): EventOccurrence[][] {
  const days: EventOccurrence[][] = [[], [], [], [], [], [], []];
  for (const occ of occurrences) {
    if (occ.localDayIndex >= 0 && occ.localDayIndex <= 6) {
      // localDayIndex: 0=Sun, 1=Mon, ..., 6=Sat
      // Calendar index: 0=Mon, 1=Tue, ..., 6=Sun
      const calendarIndex = (occ.localDayIndex + 6) % 7;
      days[calendarIndex].push(occ);
    }
  }
  return days;
}

export function isToday(date: Date): boolean {
  const now = new Date();
  return now.toDateString() === date.toDateString();
}

export function isEventOngoing(occurrence: EventOccurrence): boolean {
  const now = new Date();
  const start = new Date(occurrence.startTime);
  const end = occurrence.endTime ? new Date(occurrence.endTime) : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  return now >= start && now < end;
}

export function getWeekLabel(weekStart: Date): string {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const startStr = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endStr = weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${startStr} - ${endStr}`;
}