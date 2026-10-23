import Image from "next/image";
import { Play } from "lucide-react";
import type { Activity, Video } from "@/lib/content";
import { ImageViewer } from "@/components/image-viewer";

export function ActivityCard({ activity, large = false }: { activity: Activity; large?: boolean }) {
  return (
    <article className={`group relative min-h-[330px] overflow-hidden bg-celadon/40 ${large ? "md:min-h-[520px]" : ""}`}>
      <Image
        src={activity.image}
        alt={activity.title}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-paper lg:p-8">
        <p className="font-mono text-[9px] uppercase tracking-[.17em] text-gold">{activity.label}</p>
        <h3 className="mt-2 font-display text-4xl">{activity.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/75">{activity.description}</p>
      </div>
      <ImageViewer src={activity.image} alt={activity.title} />
    </article>
  );
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="group">
      <div className="relative aspect-video overflow-hidden bg-celadon/40">
        {video.thumbnail && (
          <Image
            src={video.thumbnail}
            alt={`${video.title} video thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-paper/80 bg-forest/60 text-paper transition-colors duration-300 group-hover:border-gold group-hover:text-gold" aria-hidden="true">
          <Play size={14} fill="currentColor" />
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl text-paper">{video.title}</h3>
    </article>
  );
}