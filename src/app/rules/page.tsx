import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { rules } from "@/lib/content";

export const metadata: Metadata = { title: "Rules", description: "The welcoming principles that guide Adobo Guild." };

export default function RulesPage() {
  return <main className="bg-paper text-forest">
    <div className="relative bg-forest"><SiteHeader /><PageIntro label="A shared understanding" title="The Adobo Rule">Peace-first. Fun-obsessed. We are here to enjoy Where Winds Meet together, make room for different paths, and keep the table welcoming for everyone.</PageIntro></div>
    <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-28">{rules.map(([heading, body]) => { const [number, ...titleParts] = heading.split(". "); return <article key={heading} className="grid gap-5 border-t border-border py-10 md:grid-cols-[100px_1fr_1.5fr] md:items-start"><span className="font-mono text-[10px] text-terracotta">{number}</span><h2 className="font-display text-4xl">{titleParts.join(". ")}</h2><p className="max-w-lg whitespace-pre-line leading-relaxed text-sage">{body}</p></article>; })}</section>
    <section className="border-y border-border bg-cream px-6 py-20 lg:px-10"><div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[1fr_2fr] md:items-start"><div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-terracotta">How we handle issues</p><h2 className="mt-4 font-display text-5xl leading-[.9]">Fairly and reasonably.</h2></div><div><p className="max-w-xl leading-relaxed text-sage">We believe in handling issues fairly and reasonably. Depending on the situation, violations may result in:</p><p className="mt-8 font-display text-3xl text-terracotta sm:text-4xl">Reminder → Warning → Temporary Restriction → Removal</p><p className="mt-8 max-w-xl leading-relaxed text-sage">Serious offenses may result in immediate removal from the guild without prior warning.</p><p className="mt-5 max-w-xl leading-relaxed text-sage">We don&apos;t enjoy enforcing rules, but protecting the community and the people in it will always come first.</p></div></div></section>
    <section className="bg-gold px-6 py-24 text-center lg:px-10 lg:py-32"><div className="mx-auto max-w-4xl"><p className="font-display text-4xl leading-tight sm:text-6xl">Don&apos;t be toxic. Don&apos;t bring unnecessary drama. Don&apos;t ruin the fun.</p><p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-forest/80">We&apos;re here to play at our own pace, laugh at our losses, laugh harder at our wins, and create good memories together.</p><p className="mt-8 font-display text-3xl text-forest sm:text-4xl">Welcome to Adobo. Play your way. Have fun. Respect each other.</p></div></section>
    <SiteFooter />
  </main>;
}
