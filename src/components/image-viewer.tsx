"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageViewerProps {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  sizes?: string;
}

export function ImageViewer({ src, alt, sizes = "92vw" }: ImageViewerProps) {
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

  return (
    <>
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-in"
        aria-label={`View complete image: ${alt}`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Complete image: ${alt}`}
          className="fixed inset-0 z-50 grid place-items-center bg-forest/95 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative h-[calc(100vh-2rem)] w-[92vw] sm:h-[calc(100vh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={`${alt}, complete view`}
              fill
              sizes={sizes}
              quality={90}
              unoptimized
              className="object-contain"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close image viewer"
              className="absolute right-2 top-2 grid size-11 place-items-center border border-paper/70 bg-forest/80 font-mono text-xl text-paper transition-colors hover:bg-terracotta"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}