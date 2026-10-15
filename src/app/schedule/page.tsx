import type { Metadata } from "next";
import { WeekCalendar } from "@/components/WeekCalendar";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Weekly Schedule",
  description: "Adobo Guild's weekly event calendar with automatic timezone conversion. View Guild Wars, Showdowns, Breaking Army, and daily gatherings in your local time.",
};

export default function SchedulePage() {
  return (
    <main className="bg-paper text-forest">
      <SiteHeader />
      <WeekCalendar />
      <SiteFooter />
    </main>
  );
}