"use client";

import Image from "next/image";
import { ImageViewer } from "@/components/image-viewer";
import type { Member } from "@/lib/content";

export function MemberImageViewer({ member }: { member: Member }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-celadon/40">
      <Image
        src={member.image}
        alt={`${member.name}, Adobo ${member.position}`}
        fill
        sizes="(max-width: 639px) calc((100vw - 3rem) * 2.37), (max-width: 1023px) calc((100vw - 4.25rem) * 2.37), min(1031px, calc((100vw - 5rem) / 3 * 2.37))"
        quality={90}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <ImageViewer src={member.image} alt={`${member.name}, complete portrait`} />
    </div>
  );
}