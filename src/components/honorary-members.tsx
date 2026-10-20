import { MemberCard } from "@/components/member-card";
import type { Member } from "@/lib/members";

export function HonoraryMembers({ members }: { members: Member[] }) {
  if (!members.length) return null;

  return (
    <section aria-labelledby="honorary-members-heading">
      <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-border pb-4">
        <h2 id="honorary-members-heading" className="font-display text-4xl">Honorary Members</h2>
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-terracotta">
          {members.length} {members.length === 1 ? "Guest" : "Guests"}
        </span>
      </div>
      <p className="max-w-2xl font-display text-2xl italic leading-snug text-sage">Honored guests, always welcome at our table.</p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-sage">
        Not every Wanderer walks the same path, but some leave a mark on ours. This space is dedicated to the friends and guests who have shared our journey and become part of the Adobo story.
      </p>
      <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <MemberCard key={`${member.name}-${index}`} member={member} featured={index % 4 === 1} />
        ))}
      </div>
    </section>
  );
}
