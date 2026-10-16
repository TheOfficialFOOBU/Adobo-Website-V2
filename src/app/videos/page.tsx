import type { Metadata } from "next";
import { videos } from "@/lib/content";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Videos", description: "Field notes and memorable moments from Adobo Guild." };

export default function VideosPage() {
  return <main className="bg-forest text-paper"><div className="relative"><SiteHeader /><PageIntro label="MOMENTS IN MOTION" title="Our journey, remembered.">A small moving archive of the moments that happen between quests: the detours, the jokes, and the reasons we keep coming back.</PageIntro></div><section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24"><div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{videos.map(video => <article key={video.title} className="group"><div className="relative overflow-hidden bg-sage" style={{ aspectRatio: video.ratio ?? "16 / 9" }}><video controls preload="metadata" poster={video.thumbnail} className="h-full w-full object-cover" aria-label={video.title}><source src={video.source} type="video/mp4" /></video></div><h2 className="mt-6 font-display text-3xl">{video.title}</h2></article>)}</div></section><SiteFooter /></main>;
}
