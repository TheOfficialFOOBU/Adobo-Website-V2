import Link from "next/link";
import { Arrow, SectionLabel, SiteFooter, SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <main className="bg-paper text-forest"><div className="relative bg-forest"><SiteHeader /><section className="mx-auto grid max-w-[1440px] gap-10 px-6 pb-20 pt-40 text-center text-paper lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-52"><div className="lg:col-start-2"><SectionLabel light>Lost on the path</SectionLabel><h1 className="mt-6 font-display text-[clamp(4rem,9vw,8rem)] leading-[.84] tracking-[-.07em]">404</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">The wind blew this page off the trail. No need to worry &mdash; there&apos;s always a way back.</p><Link href="/" className="group mt-10 inline-flex items-center gap-4 border-b border-forest pb-3 font-mono text-[10px] uppercase tracking-[.14em]">Return to camp <Arrow /></Link></div></section></div><SiteFooter /></main>;
}