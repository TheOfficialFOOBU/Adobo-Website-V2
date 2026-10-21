"use client";

import Image from "next/image";
import { ImageViewer } from "@/components/image-viewer";
import type { Member } from "@/lib/content";
import { memberCardSizes, portraitSrc } from "@/lib/portraits";

export function MemberImageViewer({ member }: { member: Member }) {
  const src = portraitSrc(member.image);
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-celadon/40">
      <Image
        src={src}
        alt={`${member.name}, Adobo ${member.position}`}
        fill
        sizes={memberCardSizes(member.image)}
        quality={90}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        style={member.previewPosition ? { objectPosition: member.previewPosition } : undefined}
      />
      <ImageViewer src={src} alt={`${member.name}, complete portrait`} />
    </div>
  );
}
