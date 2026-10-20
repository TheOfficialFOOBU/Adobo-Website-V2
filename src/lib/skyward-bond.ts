import { getMemberBySlug, memberSlug, slugify, members, type Member } from "@/lib/members";

export const SKYWARD_BOND_MIN_FLOOR = 1;
export const SKYWARD_BOND_MAX_FLOOR = 10;

export const SKYWARD_BOND_DIFFICULTIES = ["normal", "hard", "abyss"] as const;

export type SkywardBondDifficulty = (typeof SKYWARD_BOND_DIFFICULTIES)[number];

export const SKYWARD_BOND_DIFFICULTY_LABELS: Record<SkywardBondDifficulty, string> = {
  normal: "Normal",
  hard: "Hard",
  abyss: "Abyss",
};

const SKYWARD_BOND_DIFFICULTY_PRIORITY: Record<SkywardBondDifficulty, number> = {
  normal: 0,
  hard: 1,
  abyss: 2,
};

export type SkywardBondFloorClear = {
  floor: number;
  clearedAt?: string;
};

export type SkywardBondAchievement = {
  id: string;
  difficulty: SkywardBondDifficulty;
  memberSlug?: string;
  displayName?: string;
  portrait?: string;
  floorsCleared: SkywardBondFloorClear[];
  highestFloor?: number;
  note?: string;
};

export type SkywardBondClear = {
  floor: number;
  difficulty: SkywardBondDifficulty;
  clearedAt?: string;
};

export type ResolvedSkywardBondAchievement = {
  id: string;
  slug: string;
  name: string;
  portrait?: string;
  member?: Member;
  difficulty: SkywardBondDifficulty | null;
  difficultyLabel: string;
  floorsCleared: SkywardBondFloorClear[];
  highestFloor?: number;
  overallHighest?: SkywardBondClear;
  latestClear?: SkywardBondClear;
  errors: string[];
  note?: string;
};

export const skywardBondAchievements: readonly SkywardBondAchievement[] = [
  {
    id: "hard-rin",
    memberSlug: "rin",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-diassha",
    memberSlug: "diassha",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-ninjatim",
    memberSlug: "ninjatim",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-ambon",
    memberSlug: "ambon",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-ilindawalkeri",
    memberSlug: "ilindawalkeri",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-astrophiliac",
    memberSlug: "astrophiliac",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-sanji",
    memberSlug: "sanji",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-rongjie",
    memberSlug: "rongjie",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-driiin",
    displayName: "Driiin",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-calialy",
    memberSlug: "calialy",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-leiselle",
    memberSlug: "leiselle",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-schalsweiser",
    memberSlug: "schalsweiser",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-vermouth",
    memberSlug: "vermouth",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-quickxtrike",
    displayName: "QuickXtrike",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-axolotelle",
    memberSlug: "axolotelle",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "hard-hy-r-the-ry",
    memberSlug: "hy-r-the-ry",
    difficulty: "hard",
    floorsCleared: [{ floor: 10 }],
  },
  {
    id: "normal-idjmp",
    displayName: "iDjMP",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-schalsweiser",
    memberSlug: "schalsweiser",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-hy-r-the-ry",
    memberSlug: "hy-r-the-ry",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-rianon",
    displayName: "Rianon",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-toku",
    displayName: "Tokȗ",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-aeleigh",
    memberSlug: "aeleigh",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
  {
    id: "normal-heuphemia",
    memberSlug: "heuphemia",
    difficulty: "normal",
    floorsCleared: [{ floor: 5 }],
  },
];

export function isValidSkywardBondFloor(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= SKYWARD_BOND_MIN_FLOOR &&
    value <= SKYWARD_BOND_MAX_FLOOR
  );
}

export function isSkywardBondDifficulty(value: unknown): value is SkywardBondDifficulty {
  return SKYWARD_BOND_DIFFICULTIES.some(difficulty => difficulty === value);
}

function textValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function firstNonEmpty(...values: unknown[]): string | undefined {
  for (const value of values) {
    const trimmed = textValue(value);
    if (trimmed) return trimmed;
  }
  return undefined;
}

function timestampValue(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? undefined : timestamp;
}

export function validateSkywardBondAchievement(record: SkywardBondAchievement): string[] {
  const errors: string[] = [];
  const floors = Array.isArray(record.floorsCleared) ? record.floorsCleared : [];
  const hasIdentity = Boolean(textValue(record.memberSlug) || textValue(record.displayName));

  if (!textValue(record.id)) {
    errors.push("Record id is required.");
  }

  if (!isSkywardBondDifficulty(record.difficulty)) {
    errors.push("Difficulty must be Normal, Hard, or Abyss.");
  }

  if (!hasIdentity) {
    errors.push("A member slug or display name is required.");
  }

  if (!Array.isArray(record.floorsCleared)) {
    errors.push("Floors cleared must be a list.");
  } else if (floors.length === 0) {
    errors.push("At least one valid floor clear is required.");
  } else {
    floors.forEach((clear, index) => {
      if (!isValidSkywardBondFloor(clear?.floor)) {
        errors.push(
          `Floor clear ${index + 1} must be a whole number from ${SKYWARD_BOND_MIN_FLOOR} to ${SKYWARD_BOND_MAX_FLOOR}.`,
        );
      }

      if (clear?.clearedAt !== undefined && timestampValue(clear.clearedAt) === undefined) {
        errors.push(`Floor clear ${index + 1} has an invalid clear timestamp.`);
      }
    });
  }

  if (record.highestFloor !== undefined) {
    if (!isValidSkywardBondFloor(record.highestFloor)) {
      errors.push(
        `Highest floor must be a whole number from ${SKYWARD_BOND_MIN_FLOOR} to ${SKYWARD_BOND_MAX_FLOOR}.`,
      );
    } else if (
      floors.length > 0 &&
      floors.every(clear => isValidSkywardBondFloor(clear?.floor))
    ) {
      const derivedHighest = Math.max(...floors.map(clear => clear.floor));
      if (record.highestFloor !== derivedHighest) {
        errors.push("Highest floor must match the highest cleared floor.");
      }
    }
  }

  return errors;
}

export function highestClearedFloor(
  record: Pick<SkywardBondAchievement, "floorsCleared">,
): number | undefined {
  const floors = Array.isArray(record.floorsCleared) ? record.floorsCleared : [];
  const validFloors = floors
    .map(clear => clear?.floor)
    .filter((floor): floor is number => isValidSkywardBondFloor(floor));

  if (validFloors.length === 0) return undefined;
  return Math.max(...validFloors);
}

function compareHighestClears(a: SkywardBondClear, b: SkywardBondClear): number {
  const priorityDelta =
    SKYWARD_BOND_DIFFICULTY_PRIORITY[a.difficulty] -
    SKYWARD_BOND_DIFFICULTY_PRIORITY[b.difficulty];
  if (priorityDelta !== 0) return priorityDelta;
  return a.floor - b.floor;
}

export function highestSkywardBondClear(
  clears: readonly SkywardBondClear[],
): SkywardBondClear | undefined {
  const validClears = clears.filter(
    clear =>
      isSkywardBondDifficulty(clear.difficulty) && isValidSkywardBondFloor(clear.floor),
  );

  let highest: SkywardBondClear | undefined;
  for (const clear of validClears) {
    if (!highest || compareHighestClears(clear, highest) > 0) highest = clear;
  }
  return highest;
}

export function latestSkywardBondClear(
  clears: readonly SkywardBondClear[],
): SkywardBondClear | undefined {
  const validClears = clears.filter(
    clear =>
      isSkywardBondDifficulty(clear.difficulty) && isValidSkywardBondFloor(clear.floor),
  );

  if (validClears.length === 0) return undefined;
  if (validClears.length === 1) return validClears[0];

  const timestamps = validClears.map(clear => timestampValue(clear.clearedAt));
  if (timestamps.some(timestamp => timestamp === undefined)) return undefined;

  const latestTimestamp = Math.max(...(timestamps as number[]));
  const latestClears = validClears.filter((_, index) => timestamps[index] === latestTimestamp);
  return latestClears.length === 1 ? latestClears[0] : undefined;
}

const membersByName = new Map(members.map(member => [member.name, member]));

function resolveRecordMember(record: SkywardBondAchievement): Member | undefined {
  const requestedSlug = textValue(record.memberSlug);
  const suppliedName = textValue(record.displayName);
  return (requestedSlug ? getMemberBySlug(requestedSlug) : undefined) ??
    (suppliedName ? membersByName.get(suppliedName) : undefined);
}

function memberIdentity(record: ResolvedSkywardBondAchievement): string {
  return record.member ? `member:${memberSlug(record.member)}` : `standalone:${record.name}`;
}

export function resolveSkywardBondAchievements(
  records: readonly SkywardBondAchievement[] = skywardBondAchievements,
): ResolvedSkywardBondAchievement[] {
  const resolved = records.map(record => {
    const id = textValue(record.id) ?? "unknown-record";
    const requestedSlug = textValue(record.memberSlug);
    const member = resolveRecordMember(record);
    const name =
      member?.name ?? firstNonEmpty(record.displayName, requestedSlug, id) ?? "Unknown Wanderer";
    const difficulty = isSkywardBondDifficulty(record.difficulty) ? record.difficulty : null;
    const errors = validateSkywardBondAchievement(record);
    const floorsCleared =
      errors.length === 0
        ? [...record.floorsCleared]
            .filter(clear => isValidSkywardBondFloor(clear.floor))
            .sort((a, b) => b.floor - a.floor)
        : [];
    const highestFloor = errors.length === 0 ? highestClearedFloor(record) : undefined;

    return {
      id,
      slug: member ? memberSlug(member) : slugify(name),
      name,
      portrait: member ? member.image : firstNonEmpty(record.portrait),
      member,
      difficulty,
      difficultyLabel: difficulty ? SKYWARD_BOND_DIFFICULTY_LABELS[difficulty] : "Unassigned",
      floorsCleared,
      highestFloor,
      errors,
      note: firstNonEmpty(record.note),
    };
  });

  const recordsByMember = new Map<string, ResolvedSkywardBondAchievement[]>();
  for (const record of resolved) {
    if (record.errors.length > 0) continue;
    const identity = memberIdentity(record);
    const group = recordsByMember.get(identity) ?? [];
    group.push(record);
    recordsByMember.set(identity, group);
  }

  return resolved.map(record => {
    if (record.errors.length > 0 || !record.difficulty) return record;

    const group = recordsByMember.get(memberIdentity(record)) ?? [record];
    const clears = group.flatMap(memberRecord =>
      memberRecord.floorsCleared.map(clear => ({
        floor: clear.floor,
        difficulty: memberRecord.difficulty as SkywardBondDifficulty,
        clearedAt: clear.clearedAt,
      })),
    );

    return {
      ...record,
      overallHighest: highestSkywardBondClear(clears),
      latestClear: latestSkywardBondClear(clears),
    };
  });
}

function difficultyOrder(difficulty: SkywardBondDifficulty | null): number {
  if (!difficulty) return SKYWARD_BOND_DIFFICULTIES.length;
  return SKYWARD_BOND_DIFFICULTIES.indexOf(difficulty);
}

export function sortSkywardBondAchievements(
  achievements: ResolvedSkywardBondAchievement[],
): ResolvedSkywardBondAchievement[] {
  return [...achievements].sort((a, b) => {
    const validityDelta = Number(a.errors.length > 0) - Number(b.errors.length > 0);
    if (validityDelta !== 0) return validityDelta;

    const difficultyDelta = difficultyOrder(a.difficulty) - difficultyOrder(b.difficulty);
    if (difficultyDelta !== 0) return difficultyDelta;

    const floorDelta = (b.highestFloor ?? 0) - (a.highestFloor ?? 0);
    if (floorDelta !== 0) return floorDelta;

    const nameDelta = a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    return nameDelta !== 0 ? nameDelta : a.id.localeCompare(b.id);
  });
}
