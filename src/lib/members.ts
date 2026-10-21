import sourceMembers from "@/app/data/members.json";
import sourceHonoraryMembers from "@/app/data/honorary-members.json";

export type Group = "Founder" | "Core" | "Officer" | "Member" | "Honorary";
export type Position = "Guild Master" | "Vice Master" | "Officer" | "Architect" | "Member" | "Honorary Member";

export type Member = {
  name: string;
  class: string;
  weapon: string;
  image: string;
  previewPosition?: string;
  quote: string;
  title?: string;
  founder?: boolean;
  discordId?: string;
  group: Group;
  position: Position;
};

export const members = sourceMembers as Member[];

export const honoraryMembers: Member[] = sourceHonoraryMembers.map(member => ({
  ...member,
  group: "Honorary" as const,
  position: "Honorary Member" as const,
}));

export const allMembers: Member[] = [...members, ...honoraryMembers];

export function memberSlug(member: Member) {
  return slugify(member.name);
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "wanderer";
}

export function getMemberBySlug(slug: string) {
  return allMembers.find(member => memberSlug(member) === slug);
}

export function getMemberNeighbors(member: Member) {
  const collection = member.group === "Honorary" ? honoraryMembers : members;
  const index = collection.findIndex(candidate => candidate.name === member.name);
  return {
    previous: index > 0 ? collection[index - 1] : undefined,
    next: index < collection.length - 1 ? collection[index + 1] : undefined,
  };
}
