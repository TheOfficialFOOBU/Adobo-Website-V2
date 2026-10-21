import portraitMetadata from "@/app/data/portrait-metadata.json";

export type PortraitMetadata = { width: number; height: number; version: string };

/**
 * Fallback for portraits that are not listed in `portrait-metadata.json`.
 * 16:9 is the shape almost every guild portrait ships in, so it keeps the
 * generated `sizes` on the safe (larger) side instead of under-fetching.
 */
const FALLBACK_PORTRAIT: PortraitMetadata = { width: 1920, height: 1080, version: "" };

const metadata = portraitMetadata as Record<string, PortraitMetadata>;

export function getPortraitMetadata(src: string): PortraitMetadata {
  return metadata[src] ?? FALLBACK_PORTRAIT;
}

/**
 * Cache-busting portrait URL.
 *
 * `/_next/image?url=…&w=…` variants are cached by URL only, so a portrait that
 * is replaced on disk would keep serving the previously generated (older,
 * lower resolution) bitmap. The content hash changes with the file, which
 * invalidates those variants as soon as the portrait is updated.
 */
export function portraitSrc(src: string): string {
  const { version } = getPortraitMetadata(src);
  if (!version) return src;
  return `${src}?v=${version}`;
}

/**
 * A portrait that is cropped with `object-fit: cover` has to be delivered at
 * the size of the *visible* region, not at the size of the element. The
 * browser only reads the element width from `sizes`, so the crop factor has
 * to be folded into the declared size, otherwise the browser picks a bitmap
 * that is far too small and has to upscale it (which is what makes the
 * portraits look soft).
 *
 * @param sourceAspect width / height of the source portrait
 * @param boxAspect width / height of the element the portrait is cropped into
 */
export function coverFactor(sourceAspect: number, boxAspect: number): number {
  return Math.max(1, sourceAspect / boxAspect);
}

export type CoverWidth = {
  /** Media query for this breakpoint, or null for the default entry. */
  media: string | null;
  /** CSS width of the element, written as a calc() operand. */
  width: string;
  /** Optional maximum width of the element. */
  cap?: string;
};

export type CoverLayout = {
  /** width / height of the element the portrait is cropped into. */
  aspect: number;
  widths: CoverWidth[];
};

function round(value: number) {
  return Number(value.toFixed(4));
}

/**
 * Builds the `sizes` attribute for a portrait that is cropped into
 * `layout` with `object-fit: cover`.
 */
export function coverSizes(src: string, layout: CoverLayout): string {
  const { width, height } = getPortraitMetadata(src);
  const factor = round(coverFactor(width / height, layout.aspect));

  return layout.widths
    .map(entry => {
      const scaled = `calc(${entry.width} * ${factor})`;
      const value = entry.cap ? `min(calc(${entry.cap} * ${factor}), ${scaled})` : scaled;
      return entry.media ? `${entry.media} ${value}` : value;
    })
    .join(", ");
}

/**
 * Member cards live in a 3 column grid (2 columns on tablets, 1 on phones)
 * inside a `max-w-[1440px]` container, and the portrait is cropped into a
 * 3:4 box.
 */
export const MEMBER_CARD_LAYOUT: CoverLayout = {
  aspect: 3 / 4,
  widths: [
    { media: "(max-width: 639px)", width: "(100vw - 3rem)" },
    { media: "(max-width: 1023px)", width: "((100vw - 4.25rem) / 2)" },
    { media: null, width: "((100vw - 7.5rem) / 3)", cap: "440px" },
  ],
};

/** Skyward Bond ledger portraits sit in a 4 column grid, cropped into a 3:4 box. */
export const SKYWARD_PORTRAIT_LAYOUT: CoverLayout = {
  aspect: 3 / 4,
  widths: [
    { media: "(max-width: 639px)", width: "(100vw - 5rem)" },
    { media: "(max-width: 1023px)", width: "((100vw - 9.5rem) / 2)" },
    { media: null, width: "((100vw - 18.5rem) / 4)", cap: "300px" },
  ],
};

export function memberCardSizes(src: string) {
  return coverSizes(src, MEMBER_CARD_LAYOUT);
}

export function skywardPortraitSizes(src: string) {
  return coverSizes(src, SKYWARD_PORTRAIT_LAYOUT);
}
