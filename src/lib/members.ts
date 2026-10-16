import sourceMembers from "@/app/data/members.json";

export type Group = "Founder" | "Core" | "Officer" | "Member";
export type Position = "Guild Master" | "Vice Master" | "Officer" | "Architect" | "Member";
export type Member = Omit<(typeof sourceMembers)[number], "group" | "position"> & { group: Group; position: Position };

export const members = sourceMembers as Member[];

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
  return members.find(member => memberSlug(member) === slug);
}

export function getMemberNeighbors(member: Member) {
  const index = members.findIndex(candidate => candidate.name === member.name);
  return {
    previous: index > 0 ? members[index - 1] : undefined,
    next: index < members.length - 1 ? members[index + 1] : undefined,
  };
}
