import type { Member } from "@/lib/content";
import { MemberImageViewer } from "@/components/member-image-viewer";
import { memberSlug } from "@/lib/members";
import Link from "next/link";

export function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  return <article className={`group ${featured ? "md:mt-14" : ""}`}><MemberImageViewer member={member} /><div className="border-b border-border py-5"><div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[.14em] text-terracotta"><span>{member.position}</span><span>{member.class}</span></div><h3 className="mt-2 font-display text-3xl"><Link href={`/members/${memberSlug(member)}`} className="transition-colors hover:text-terracotta">{member.name}</Link></h3><p className="mt-3 text-sm italic leading-relaxed text-sage">“{member.quote}”</p><Link href={`/members/${memberSlug(member)}`} className="mt-4 inline-block font-mono text-[9px] uppercase tracking-[.14em] text-terracotta transition-colors hover:text-forest">View profile →</Link></div></article>;
}