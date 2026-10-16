"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Activity } from "@/lib/content";

const SOURCE_WIDTH = 1600;
const SOURCE_HEIGHT = 900;

// Intrinsic dimensions of the gallery sources. Known from the shipped assets
// so tiles keep each photo's natural aspect ratio with no cropping.
// Unknown sources fall back to 16:9.
const SOURCE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/events/Pogi-1600.webp": { width: 1600, height: 900 },
  "/images/events/AiyariaAura-1600.webp": { width: 1600, height: 670 },
  "/images/events/SchalxFoobu-1600.webp": { width: 1600, height: 670 },
  "/images/events/GPic-1600.webp": { width: 1600, height: 670 },
  "/images/events/Guild Picture-1600.webp": { width: 1600, height: 900 },
  "/images/events/GuildPic-1600.webp": { width: 1600, height: 900 },
  "/images/events/AstroAura-1600.webp": { width: 1600, height: 670 },
  "/images/events/Myxy-1600.webp": { width: 1600, height: 670 },
  "/images/events/NikLei-1600.webp": { width: 1600, height: 670 },
  "/images/events/SanjiXHue-1600.webp": { width: 1600, height: 670 },
  "/images/events/SchalXFOOBUhART-1600.webp": { width: 1600, height: 670 },
  "/images/events/GPIC2-1600.webp": { width: 1600, height: 900 },
  "/images/events/Gpic3-1600.webp": { width: 1600, height: 900 },
  "/images/events/Hybridaura-1600.webp": { width: 1600, height: 670 },
  "/images/events/1.JPG-1600.webp": { width: 1600, height: 900 },
  "/images/events/Rozo LB.png": { width: 1803, height: 843 },
  "/images/events/rozo-lb2-v2.png": { width: 1919, height: 876 },
  "/images/events/Cali Mid.png": { width: 705, height: 342 },
};

function dimensionsFor(src: string) {
  return SOURCE_DIMENSIONS[src] ?? { width: SOURCE_WIDTH, height: SOURCE_HEIGHT };
}

export function ActivityGallery({ activities }: { activities: Activity[] }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (direction: 1 | -1) => {
      setActive(current =>
        current === null ? current : (current + direction + activities.length) % activities.length
      );
    },
    [activities.length]
  );

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, close, step]);

  const current = active === null ? null : activities[active];

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2">
        {activities.map((activity, index) => (
          <figure key={activity.image} className="mb-5 break-inside-avoid overflow-hidden bg-celadon/40">
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View larger image: ${activity.title}`}
              className="group block w-full cursor-zoom-in"
            >
              <Image
                src={activity.image}
                alt={activity.title}
                width={dimensionsFor(activity.image).width}
                height={dimensionsFor(activity.image).height}
                sizes="(max-width: 639px) 100vw, 50vw"
                priority={index === 0}
                className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
              />
            </button>
          </figure>
        ))}
      </div>
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${current.title}`}
          className="fixed inset-0 z-50 grid place-items-center bg-forest/95 p-4 sm:p-8"
          onClick={close}
        >
          <div
            className="relative h-[calc(100vh-2rem)] w-[92vw] sm:h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={current.image}
              src={current.image}
              alt={`${current.title}, complete view`}
              fill
              sizes="92vw"
              quality={90}
              unoptimized
              className="object-contain"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              className="absolute right-2 top-2 grid size-11 place-items-center border border-paper/70 bg-forest/80 font-mono text-xl text-paper transition-colors hover:bg-terracotta"
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-paper/70 bg-forest/80 text-paper transition-colors hover:bg-terracotta"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-paper/70 bg-forest/80 text-paper transition-colors hover:bg-terracotta"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
