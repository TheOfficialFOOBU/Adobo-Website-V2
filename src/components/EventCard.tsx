"use client";

import { Clock, Users, Sword, Flame, Shield, Trophy } from "lucide-react";
import type { EventOccurrence } from "@/lib/timezone";
import { formatTime } from "@/lib/timezone";

const categoryIconComponents: Record<EventOccurrence["category"], React.ReactNode> = {
  "guild-party": <Users className="h-3.5 w-3.5" aria-hidden="true" />,
  showdown: <Sword className="h-3.5 w-3.5" aria-hidden="true" />,
  "breaking-army": <Flame className="h-3.5 w-3.5" aria-hidden="true" />,
  "guild-war": <Shield className="h-3.5 w-3.5" aria-hidden="true" />,
  "ranked-guild-war": <Trophy className="h-3.5 w-3.5" aria-hidden="true" />,
};

export function EventCard({
  occurrence,
}: {
  occurrence: EventOccurrence;
}) {
  const start = new Date(occurrence.startTime);
  const end = occurrence.endTime ? new Date(occurrence.endTime) : null;
  const CategoryIcon = categoryIconComponents[occurrence.category];

  return (
    <article className="group min-w-0 py-3.5 transition-transform duration-200 hover:-translate-y-px">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-border text-terracotta transition-colors duration-200 group-hover:border-terracotta/50"
          aria-hidden="true"
        >
          {CategoryIcon}
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="break-words font-display text-[15px] leading-snug text-forest">
            {occurrence.name}
            {occurrence.isFlexible && (
              <span className="ml-2 inline-block rounded-full border border-forest/25 px-2 py-px align-middle font-mono text-[9px] uppercase tracking-[.1em] text-forest">
                Flexible
              </span>
            )}
          </h4>
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[.08em] text-forest">
            <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
            <time dateTime={start.toISOString()}>{formatTimeRange(start, end)}</time>
          </p>
          {occurrence.notes && (
            <p className="mt-1.5 break-words text-[13px] leading-relaxed text-sage">{occurrence.notes}</p>
          )}
        </div>
      </div>
    </article>
  );
}

function formatTimeRange(start: Date, end: Date | null): string {
  const startStr = formatTime(start);
  if (end) {
    const endStr = formatTime(end);
    return `${startStr} - ${endStr}`;
  }
  return startStr;
}
