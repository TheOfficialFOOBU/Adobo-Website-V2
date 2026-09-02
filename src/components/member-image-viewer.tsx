"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Member } from "@/lib/content";

export function MemberImageViewer({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return <>
    <div className="relative aspect-[3/4] overflow-hidden bg-sage">
      <Image src={member.image} alt={`${member.name}, Adobo ${member.position}`} fill sizes="(max-width: 639px) calc((100vw - 3rem) * 2.37), (max-width: 1023px) calc((100vw - 4.25rem) * 2.37), min(1031px, calc((100vw - 5rem) / 3 * 2.37))" quality={90} className="object-cover transition duration-700 group-hover:scale-105" />
      <button type="button" className="absolute inset-0 cursor-zoom-in" aria-label={`View complete image of ${member.name}`} onClick={() => setOpen(true)} />
    </div>
    {open && <div role="dialog" aria-modal="true" aria-label={`Complete image of ${member.name}`} className="fixed inset-0 z-50 grid place-items-center bg-forest/95 p-4 sm:p-8" onClick={() => setOpen(false)}>
      <div className="relative h-[calc(100vh-2rem)] w-[92vw] sm:h-[calc(100vh-4rem)]" onClick={event => event.stopPropagation()}>
        <Image src={member.image} alt={`${member.name}, complete portrait`} fill sizes="92vw" quality={90} unoptimized className="object-contain" />
        <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label="Close image viewer" className="absolute right-2 top-2 grid size-11 place-items-center border border-paper/70 bg-forest/80 font-mono text-xl text-paper transition-colors hover:bg-terracotta">×</button>
      </div>
    </div>}
  </>;
}