"use client";

import Link from "next/link";
import { useState } from "react";
import { rules } from "@/lib/content";
import { Arrow, SectionLabel } from "@/components/site-header";

export function RulesPreview() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="border-y border-border bg-cream px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12"><div className="lg:col-span-4"><SectionLabel>Guild rules</SectionLabel><h2 className="mt-4 font-display text-5xl leading-[.9] tracking-[-.05em] sm:text-6xl">Keep the table warm.</h2><p className="mt-8 max-w-sm leading-relaxed text-sage">A shared understanding for every Wanderer. Read the complete rules at your own pace.</p><Link href="/rules" className="group mt-8 inline-flex items-center gap-4 border-b border-forest pb-3 font-mono text-[10px] uppercase tracking-[.14em] transition-colors hover:text-terracotta">View All Rules <Arrow /></Link></div><div className="lg:col-span-7 lg:col-start-6">{rules.map(([title, answer], index) => <div key={title} className="border-t border-border last:border-b"><button type="button" className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>{title}<span className="font-body text-2xl text-terracotta" aria-hidden="true">{open === index ? "−" : "+"}</span></button>{open === index && <p className="answer-in max-w-xl whitespace-pre-line pb-7 pr-8 leading-relaxed text-sage">{answer}</p>}</div>)}</div></div></section>;
}
