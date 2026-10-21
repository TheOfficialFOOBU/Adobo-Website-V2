"use client";

import Image from "next/image";
import { useState } from "react";
import { portraitSrc, skywardPortraitSizes } from "@/lib/portraits";

export function SkywardBondPortrait({
  name,
  portrait,
  previewPosition,
}: {
  name: string;
  portrait?: string;
  previewPosition?: string;
}) {
  const [failedPortrait, setFailedPortrait] = useState<string | null>(null);
  const initial = Array.from(name.trim())[0] ?? "?";

  if (portrait && failedPortrait !== portrait) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden border border-[#C99A52]/20 bg-[#121313]">
        <Image
          src={portraitSrc(portrait)}
          alt={`${name}, Adobo Wanderer`}
          fill
          sizes={skywardPortraitSizes(portrait)}
          quality={90}
          className="object-cover"
          style={previewPosition ? { objectPosition: previewPosition } : undefined}
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
