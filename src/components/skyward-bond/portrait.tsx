"use client";

import Image from "next/image";
import { useState } from "react";

const PORTRAIT_SIZES =
  "(max-width: 639px) 240vw, (max-width: 1023px) 120vw, (max-width: 1279px) 800px, 900px";

export function SkywardBondPortrait({ name, portrait }: { name: string; portrait?: string }) {
  const [failedPortrait, setFailedPortrait] = useState<string | null>(null);
  const initial = Array.from(name.trim())[0] ?? "?";

  if (portrait && failedPortrait !== portrait) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden border border-[#C99A52]/20 bg-[#121313]">
        <Image
          src={portrait}
          alt={`${name}, Adobo Wanderer`}
          fill
          sizes={PORTRAIT_SIZES}
          quality={90}
          className="object-cover"
          onError={() => setFailedPortrait(portrait)}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative grid aspect-[3/4] place-items-center overflow-hidden border border-[#C99A52]/20 bg-[#121313]"
    >
      <span className="absolute inset-4 border border-[#C99A52]/10" />
      <span className="font-display text-5xl text-[#C99A52]/70">{initial}</span>
    </div>
  );
}
