"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return <div>{faqs.map(([question, answer], index) => <div key={question} className="border-t border-border last:border-b"><button type="button" className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>{question}<span className="font-body text-2xl text-terracotta" aria-hidden="true">{open === index ? "−" : "+"}</span></button>{open === index && <p className="max-w-xl pb-7 pr-8 leading-relaxed text-sage">{answer}</p>}</div>)}</div>;
}