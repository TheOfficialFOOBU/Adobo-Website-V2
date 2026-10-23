export type EventCategory =
  | "guild-party"
  | "showdown"
  | "breaking-army"
  | "guild-war"
  | "ranked-guild-war";

export interface RecurringEvent {
  id: string;
  name: string;
  category: EventCategory;
  dayOfWeek: number;
  startTime: string;
  endTime?: string;
  notes?: string;
  isFlexible?: boolean;
}

export interface FlexibleActivity {
  id: string;
  name: string;
  description: string;
  minMembers?: number;
}

export const GUILD_TIMEZONE = "Asia/Manila";

export const recurringEvents: RecurringEvent[] = [
  {
    id: "guild-party-mon",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 1,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "showdown-tue",
    name: "Showdown",
    category: "showdown",
    dayOfWeek: 2,
    startTime: "20:00",
    endTime: "21:00",
  },
  {
    id: "guild-party-tue",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 2,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "showdown-wed",
    name: "Showdown",
    category: "showdown",
    dayOfWeek: 3,
    startTime: "20:00",
    endTime: "21:00",
  },
  {
    id: "guild-party-wed",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 3,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "breaking-army-thu",
    name: "Breaking Army",
    category: "breaking-army",
    dayOfWeek: 4,
    startTime: "21:00",
    endTime: "23:00",
  },
  {
    id: "guild-party-thu",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 4,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "breaking-army-fri",
    name: "Breaking Army",
    category: "breaking-army",
    dayOfWeek: 5,
    startTime: "21:00",
    endTime: "23:00",
  },
  {
    id: "guild-party-fri",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 5,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "guild-war-sat",
    name: "Guild War",
    category: "guild-war",
    dayOfWeek: 6,
    startTime: "20:30",
  },
  {
    id: "guild-party-sat",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 6,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "ranked-guild-war-sat",
    name: "Ranked Guild War",
    category: "ranked-guild-war",
    dayOfWeek: 6,
    startTime: "21:30",
    notes: "Usually after Guild Party",
    isFlexible: true,
  },
  {
    id: "guild-war-sun",
    name: "Guild War",
    category: "guild-war",
    dayOfWeek: 0,
    startTime: "20:30",
  },
  {
    id: "guild-party-sun",
    name: "Daily Guild Party",
    category: "guild-party",
    dayOfWeek: 0,
    startTime: "21:00",
    notes: "Daily gathering",
  },
  {
    id: "ranked-guild-war-sun",
    name: "Ranked Guild War",
    category: "ranked-guild-war",
    dayOfWeek: 0,
    startTime: "21:30",
    notes: "Usually after Guild Party",
    isFlexible: true,
  },
];

export const flexibleActivities: FlexibleActivity[] = [
  {
    id: "sword-trial",
    name: "Sword Trial",
    description: "Can be organized anytime when enough players are available.",
  },
  {
    id: "normal-heros-realm",
    name: "Normal Hero's Realm",
    description: "Can be organized anytime when enough players are available.",
  },
  {
    id: "guild-heros-realm",
    name: "Guild Hero's Realm (GHR)",
    description: "Can be organized anytime when enough players are available, with at least 10 members available.",
    minMembers: 10,
  },
];

export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const weekdayShortNames = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];