import Image from "next/image";

/**
 * Transparent steam composite (steam-mist.png: 32bpp ARGB with alpha). Two
 * mirrored passes drift at different speeds so the loop never reads as a single
 * repeating plate. Purely decorative: empty alt, aria-hidden.
 */
export function SteamOverlay({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Image
          src="/images/skyward-bond/steam-mist.png"
          alt=""
          fill
          sizes="(min-width: 1536px) 1536px, 100vw"
          className="skyward-steam object-cover object-bottom"
        />
      </div>
      <div className="absolute inset-0 -scale-x-100">
        <Image
          src="/images/skyward-bond/steam-mist.png"
          alt=""
          fill
          sizes="(min-width: 1536px) 1536px, 100vw"
          className="skyward-steam skyward-steam-alt object-cover object-bottom opacity-70"
        />
      </div>
    </div>
  );
}
