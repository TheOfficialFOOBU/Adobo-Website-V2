"use client";

import { Sparkles, Shield, Users, Sword } from "lucide-react";
import { flexibleActivities } from "@/lib/schedule";
import { SectionLabel } from "@/components/site-header";

const activityIcons = {
  "sword-trial": <Sword className="h-5 w-5" aria-hidden="true" />,
  "normal-heros-realm": <Sparkles className="h-5 w-5" aria-hidden="true" />,
  "guild-heros-realm": <Shield className="h-5 w-5" aria-hidden="true" />,
};

export function FlexibleActivities() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mb-12 text-center">
        <SectionLabel>Beyond the schedule</SectionLabel>
        <h2 className="mt-4 font-display text-5xl tracking-[-.05em]">Flexible Activities</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage">
          Not everything follows a fixed schedule. Gather your fellow Wanderers and organize a run whenever enough members are available.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {flexibleActivities.map((activity) => (
          <article
            key={activity.id}
            className="group relative rounded-xl border border-border bg-paper/50 p-6 transition-all hover:border-terracotta/50 hover:bg-gold/5"
          >
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-forest/5 p-3 text-forest">
              {activityIcons[activity.id as keyof typeof activityIcons] || <Users className="h-5 w-5" aria-hidden="true" />}
            </div>
            <h3 className="font-display text-2xl text-forest">{activity.name}</h3>
            <p className="mt-3 leading-relaxed text-sage">{activity.description}</p>
            {activity.minMembers && (
              <p className="mt-4 flex items-center gap-2 text-sm font-mono uppercase tracking-[.1em] text-terracotta">
                <Users className="h-4 w-4" aria-hidden="true" />
                Minimum {activity.minMembers} members
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-cream p-8 text-center">
        <p className="font-display text-3xl leading-tight text-forest sm:text-4xl">
          Different paths. Same table.
        </p>
        <p className="mt-4 max-w-xl mx-auto leading-relaxed text-sage">
          Some weeks are busy. Some are quiet. The door is always open, and there&apos;s always room for one more story.
        </p>
      </div>
    </section>
  );
}