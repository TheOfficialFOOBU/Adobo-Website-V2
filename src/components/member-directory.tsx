"use client";

import { useState } from "react";
import { MemberCard } from "@/components/member-card";
import type { Member } from "@/lib/members";

export function MemberDirectory({ members }: { members: Member[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const filters = ["All", "Guild Master", "Vice Master", "Officer", "Architect", "Member"];
  const positionRank: Record<string, number> = { "Guild Master": 0, "Vice Master": 1, Officer: 2, Architect: 3, Member: 4 };
  const classRank = (value: string) => value.trim().split("/")[0].trim() === "DPS" ? 0 : value.trim().split("/")[0].trim() === "Tank" ? 1 : 2;
  const visible = [...members]
    .filter(member => filter === "All" || member.position === filter)
    .filter(member => member.name.toLowerCase().includes(query.toLowerCase().trim()))
    .sort((a, b) => {
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "position") return (positionRank[a.position] - positionRank[b.position]) || a.name.localeCompare(b.name);
      if (sort === "class") return (classRank(a.class) - classRank(b.class)) || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
  const groups = ["Founder", "Core", "Member"] as const;
  return <>
    <div className="mb-12 grid gap-5 border-b border-border pb-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-end">
      <label className="font-mono text-[10px] uppercase tracking-[.14em] text-sage">Find a Wanderer<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search names" className="mt-2 block w-full border-b border-border bg-transparent px-0 py-3 font-body text-base normal-case tracking-normal text-forest placeholder:text-sage/60 focus:border-terracotta focus:outline-none" /></label>
      <label className="font-mono text-[10px] uppercase tracking-[.14em] text-sage">Position<select value={filter} onChange={event => setFilter(event.target.value)} className="mt-2 block min-w-40 border border-border bg-paper px-3 py-3 font-body text-sm normal-case tracking-normal text-forest">{filters.map(option => <option key={option}>{option}</option>)}</select></label>
      <label className="font-mono text-[10px] uppercase tracking-[.14em] text-sage">Sort by<select value={sort} onChange={event => setSort(event.target.value)} className="mt-2 block min-w-40 border border-border bg-paper px-3 py-3 font-body text-sm normal-case tracking-normal text-forest"><option value="name-asc">Name A-Z</option><option value="name-desc">Name Z-A</option><option value="position">Position</option><option value="class">Class</option></select></label>
    </div>
    {groups.map(group => { const groupMembers = visible.filter(member => member.group === group); return groupMembers.length ? <section key={group} className="mb-20 last:mb-0"><div className="mb-8 flex items-baseline justify-between border-b border-border pb-4">          <h2 className="font-display text-4xl">{group === "Founder" ? "Founders" : group === "Core" ? "Core" : "Members"}</h2><span className="font-mono text-[10px] uppercase tracking-[.14em] text-terracotta">{groupMembers.length} Wanderers</span></div><div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{groupMembers.map((member, index) => <MemberCard key={`${member.name}-${index}`} member={member} featured={index % 4 === 1} />)}</div></section> : null; })}
    {!visible.length && <p className="py-16 text-center font-display text-3xl text-sage">No Wanderer found.</p>}
  </>;
}
