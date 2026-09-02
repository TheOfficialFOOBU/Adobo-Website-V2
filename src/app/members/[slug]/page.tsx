import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMemberBySlug, getMemberNeighbors, memberSlug, members } from "@/lib/members";
import { Arrow, SectionLabel, SiteFooter, SiteHeader } from "@/components/site-header";

type ProfileProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return members.map(member => ({ slug: memberSlug(member) }));
}

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return { title: "Wanderer not found" };
  return {
    title: `${member.name} | Adobo Wanderers`,
    description: `Member profile for ${member.name} of Adobo.`,
    openGraph: { title: `${member.name} | Adobo Wanderers`, description: `Member profile for ${member.name} of Adobo.`, images: [member.image] },
  };
}

export default async function MemberProfilePage({ params }: ProfileProps) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();
  const { previous, next } = getMemberNeighbors(member);
  const details = [["Weapon", member.weapon], ["Class", member.class], ["Position", member.position], ["Group", member.group], ...(member.title ? [["Role", member.title]] : [])];
  return <main className="bg-paper text-forest"><div className="relative bg-forest"><SiteHeader /><section className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-16 pt-36 text-paper lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-44"><div className="relative min-h-[420px] overflow-hidden bg-forest-deep sm:min-h-[620px]"><Image src={member.image} alt={`${member.name}, complete member artwork`} fill sizes="(max-width: 1023px) 100vw, 55vw" quality={90} preload className="object-contain" /></div><div className="flex flex-col justify-end"><Link href="/members" className="mb-auto inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.15em] text-gold hover:text-paper">← Back to Wanderers</Link><SectionLabel light>{member.group} · {member.position}</SectionLabel><h1 className="mt-6 font-display text-[clamp(4rem,8vw,8rem)] leading-[.84] tracking-[-.07em]">{member.name}</h1><p className="mt-8 max-w-xl font-display text-3xl leading-tight text-paper/85">“{member.quote}”</p></div></section></div><section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24"><div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>Field notes</SectionLabel><h2 className="mt-5 max-w-md font-display text-5xl leading-[.9]">A little more about this Wanderer.</h2></div><dl className="grid border-t border-border sm:grid-cols-2">{details.map(([label, value]) => <div key={label} className="border-b border-border py-6 sm:pr-8"><dt className="font-mono text-[10px] uppercase tracking-[.16em] text-terracotta">{label}</dt><dd className="mt-3 text-lg leading-relaxed text-sage">{value}</dd></div>)}</dl></div></section><nav className="border-y border-border bg-cream px-6 py-8 lg:px-10" aria-label="Wanderer navigation"><div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">{previous ? <Link href={`/members/${memberSlug(previous)}`} className="group max-w-[45%]"><span className="font-mono text-[9px] uppercase tracking-[.15em] text-terracotta">Previous Wanderer</span><span className="mt-2 block font-display text-2xl group-hover:text-terracotta">{previous.name} <Arrow /></span></Link> : <span />}{next ? <Link href={`/members/${memberSlug(next)}`} className="group max-w-[45%] text-right"><span className="font-mono text-[9px] uppercase tracking-[.15em] text-terracotta">Next Wanderer</span><span className="mt-2 block font-display text-2xl group-hover:text-terracotta"><Arrow /> {next.name}</span></Link> : <span />}</div></nav><SiteFooter /></main>;
}