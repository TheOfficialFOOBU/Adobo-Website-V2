import type { Metadata } from "next";
import { videos } from "@/lib/content";
import { ArchiveVideo } from "@/components/archive-video";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Videos", description: "Field notes and memorable moments from Adobo Guild." };

export default function VideosPage() {
  return <main className="bg-forest text-paper"><div className="relative"><SiteHeader /><PageIntro label="MOMENTS IN MOTION" title="Our journey, remembered.">A small moving archive of the moments that happen between quests: the detours, the jokes, and the reasons we keep coming back.</PageIntro></div><section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24"><div className="grid items-start gap-x-8 gap-y-14 md:grid-cols-2">{videos.map(video => <ArchiveVideo key={video.title} video={video} />)}</div></section><SiteFooter /></main>;
}
