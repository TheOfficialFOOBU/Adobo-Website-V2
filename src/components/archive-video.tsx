"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { Video } from "@/lib/content";

/**
 * A video entry that keeps its source proportions: the frame is sized from the
 * clip's own ratio and the player uses object-contain, so ultrawide footage is
 * never cropped to a uniform shape. The poster doubles as a large, keyboard
 * accessible play control; native controls take over once playback begins.
 */
export function ArchiveVideo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <article className="flex flex-col">
      <div
        className="relative overflow-hidden border border-paper/10 bg-forest-deep"
        style={{ aspectRatio: video.ratio ?? "16 / 9" }}
      >
        {playing ? (
          <video
            className="h-full w-full object-contain"
            controls
            autoPlay={!reducedMotion}
            playsInline
            preload="metadata"
            poster={video.thumbnail}
            aria-label={video.title}
          >
            <source src={video.source} type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="group/play absolute inset-0 block h-full w-full cursor-pointer"
          >
            {video.thumbnail && (
              <Image
                src={video.thumbnail}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            <span
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent"
              aria-hidden="true"
            />
            <span className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full border border-paper/80 bg-forest/60 text-paper transition-colors duration-300 group-hover/play:border-gold group-hover/play:text-gold">
              <Play size={16} fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <h2 className="mt-5 font-display text-3xl">{video.title}</h2>
    </article>
  );
}
