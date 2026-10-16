"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AdoboLogoProps {
  size: number;
  className?: string;
  priority?: boolean;
  ariaLabel?: string;
}

function getInitialPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AdoboLogo({ size, className = "", priority = false, ariaLabel = "Adobo Guild" }: AdoboLogoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
        <Image
          src="/images/branding/adobo-logo.png"
          alt={ariaLabel}
          fill
          sizes={`${size}px`}
          className="object-contain"
          priority={priority}
          unoptimized
        />
      </div>
    );
  }

  const steamWidth = size * 1.8;
  const steamHeight = size * 2.4;

  return (
    <div className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute bottom-full left-1/2 pointer-events-none"
        aria-hidden="true"
        style={{
          width: steamWidth,
          height: steamHeight,
          transform: "translateX(-50%)",
          transformOrigin: "center bottom",
        }}
      >
        <svg viewBox="0 0 180 240" preserveAspectRatio="none" className="w-full h-full" style={{ overflow: "visible" }}>
          <defs>
            <filter id="steamBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
            <filter id="steamSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.5" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.15 0.35 0.55 0.7 0.8 0.85 0.9" />
              </feComponentTransfer>
            </filter>
          </defs>
          
          <g filter="url(#steamSoft)" fill="none" stroke="#f4f0e7" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
            {/* Wisp 1 - left drifting */}
            <path
              className="steam-wisp steam-wisp-1"
              d="M55,240 Q48,200 52,160 Q60,115 50,70 Q58,40 48,15 Q52,5 46,-5"
              strokeWidth="2.2"
            />
            <path
              className="steam-wisp steam-wisp-1b"
              d="M62,235 Q58,190 64,150 Q56,100 62,55 Q54,25 60,0"
              strokeWidth="1.4"
            />
            
            {/* Wisp 2 - center rising with gentle S */}
            <path
              className="steam-wisp steam-wisp-2"
              d="M90,240 Q92,205 88,165 Q94,125 86,85 Q92,50 88,25 Q86,8 90,-5"
              strokeWidth="1.8"
            />
            <path
              className="steam-wisp steam-wisp-2b"
              d="M85,238 Q82,195 87,155 Q82,110 86,65 Q81,30 85,5"
              strokeWidth="1.2"
            />
            
            {/* Wisp 3 - right drifting */}
            <path
              className="steam-wisp steam-wisp-3"
              d="M125,240 Q130,200 124,160 Q118,120 126,75 Q130,45 122,20 Q126,8 120,-8"
              strokeWidth="2.0"
            />
            <path
              className="steam-wisp steam-wisp-3b"
              d="M118,235 Q112,190 116,145 Q110,100 114,55 Q108,22 112,0"
              strokeWidth="1.3"
            />
            
            {/* Wisp 4 - inner left, shorter */}
            <path
              className="steam-wisp steam-wisp-4"
              d="M75,240 Q70,210 78,175 Q72,140 76,105 Q70,70 75,40 Q72,12 76,0"
              strokeWidth="1.5"
            />
            
            {/* Wisp 5 - inner right, shorter */}
            <path
              className="steam-wisp steam-wisp-5"
              d="M105,240 Q110,205 102,170 Q108,135 104,100 Q110,65 106,35 Q108,10 104,-5"
              strokeWidth="1.4"
            />
            
            {/* Tiny center wisps for density */}
            <path
              className="steam-wisp steam-wisp-6"
              d="M88,235 Q85,200 89,170 Q84,140 88,110 Q83,80 87,55"
              strokeWidth="1.0"
            />
            <path
              className="steam-wisp steam-wisp-7"
              d="M92,235 Q95,198 91,165 Q96,135 93,105 Q97,75 91,50"
              strokeWidth="0.9"
            />
          </g>
        </svg>
      </div>
      <Image
        src="/images/branding/adobo-logo.png"
        alt={ariaLabel}
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority={priority}
        unoptimized
      />
    </div>
  );
}