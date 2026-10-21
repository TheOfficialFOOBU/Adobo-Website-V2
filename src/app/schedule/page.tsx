import type { Metadata } from "next";
import { WeekCalendar } from "@/components/WeekCalendar";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { GUILD_TIMEZONE } from "@/lib/schedule";
import { getTargetWeekFrame } from "@/lib/timezone";

export const metadata: Metadata = {
  title: "Weekly Schedule",
  description: "Adobo Guild's weekly event calendar with automatic timezone conversion. View Guild Wars, Showdowns, Breaking Army, and daily gatherings in your local time.",
};

export const revalidate = 3600;

export default function SchedulePage() {
  const initialFrame = getTargetWeekFrame(GUILD_TIMEZONE);
  return (
    <main className="bg-paper text-forest">
      <SiteHeader />
      <WeekCalendar initialFrame={initialFrame} initialTimezone={GUILD_TIMEZONE} />
      <SiteFooter />
    </main>
  );
}
