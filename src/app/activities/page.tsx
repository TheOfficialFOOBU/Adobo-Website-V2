import type { Metadata } from "next";
import { activities } from "@/lib/content";
import { ActivityCard } from "@/components/media-card";
import { PageIntro } from "@/components/page-intro";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Activities", description: "Ways Adobo Wanderers explore, gather, and play together." };

export default function ActivitiesPage() {
  return <main className="bg-paper text-forest"><div className="relative bg-forest"><SiteHeader /><PageIntro label="Field notes / 02" title="Ways we wander">There is no single correct pace. These are the shared adventures, gatherings, and gentle competitive moments already captured in Adobo’s world.</PageIntro></div><section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24"><div className="grid gap-5 md:grid-cols-2">{activities.map((activity, index) => <ActivityCard key={activity.title} activity={activity} large={index === 0} />)}</div></section><section className="border-y border-border bg-terracotta px-6 py-20 text-center text-paper lg:px-10"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-gold">The Adobo pace</p><p className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">Show up for the adventure. Stay for the story it becomes.</p></section><SiteFooter /></main>;
}
