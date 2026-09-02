"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [["Home", "/"], ["Members", "/members"], ["Activities", "/activities"], ["Videos", "/videos"], ["Rules", "/rules"]];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 text-paper lg:px-10">
      <Link href="/" className="relative h-12 w-12 shrink-0" aria-label="Adobo Guild home">
        <Image src="/images/branding/adobo-logo.png" alt="Adobo Guild" fill sizes="48px" className="object-contain" priority unoptimized />
      </Link>
      <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[.16em] text-paper/75 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} className="transition-colors hover:text-gold">{label}</Link>)}
      </nav>
      <div className="hidden md:block"><Link href="mailto:hello@adobo.gg" className="border border-gold bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-forest transition-colors hover:bg-transparent hover:text-gold">Join us</Link></div>
      <button type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="font-mono text-[10px] uppercase tracking-[.16em] md:hidden">
        {open ? "Close" : "Menu"}
      </button>
      {open && <nav id="mobile-navigation" className="absolute right-6 top-[76px] flex min-w-52 flex-col gap-5 border border-border bg-paper p-6 text-forest shadow-xl md:hidden" aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="font-mono text-[10px] uppercase tracking-[.16em] hover:text-terracotta">{label}</Link>)}
        <Link href="mailto:hello@adobo.gg" onClick={() => setOpen(false)} className="border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[.16em] text-terracotta">Join us</Link>
      </nav>}
    </header>
  );
}

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`font-mono text-[10px] uppercase tracking-[.18em] ${light ? "text-gold" : "text-terracotta"}`}><span className="mr-3 inline-block h-px w-8 align-middle bg-current" />{children}</p>;
}

export function Arrow() { return <span aria-hidden="true" className="inline-block text-xl leading-none transition-transform group-hover:translate-x-1">→</span>; }

export function SiteFooter() {
  return <footer className="bg-forest px-6 py-10 text-paper lg:px-10"><div className="mx-auto grid max-w-[1440px] gap-10 border-b border-paper/20 pb-10 md:grid-cols-[1fr_auto_auto] md:items-end"><div><Image src="/images/branding/adobo-logo.png" alt="Adobo Guild" width={52} height={52} unoptimized className="mb-5 object-contain" /><p className="font-display text-2xl">Adobo Guild</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-paper/60">Where Winds Meet · Different Wanderers. One table.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[.14em] text-paper/70" aria-label="Footer navigation">{links.map(([label, href]) => <Link key={href} href={href} className="hover:text-gold">{label}</Link>)}</nav><Link href="mailto:hello@adobo.gg" className="font-mono text-[10px] uppercase tracking-[.14em] text-gold hover:text-paper">Come wander with us →</Link></div><div className="mx-auto flex max-w-[1440px] justify-between pt-5 font-mono text-[9px] uppercase tracking-[.14em] text-paper/45"><span>Peace-first. Fun-obsessed.</span><span>© {new Date().getFullYear()} Adobo Guild</span></div></footer>;
}