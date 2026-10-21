"use client";

import { cn } from "@/lib/utils";
import { EventCard } from "./EventCard";
import type { EventOccurrence } from "@/lib/timezone";
import { formatDate, formatWeekdayName } from "@/lib/timezone";

interface DayColumnProps {
  date: string;
  occurrences: EventOccurrence[];
  isToday: boolean;
  index?: number;
}

export function DayColumn({
  date,
  occurrences,
  isToday,
  index = 0,
}: DayColumnProps) {
  const weekdayName = formatWeekdayName(date, true);
  const dateStr = formatDate(date);

  return (
    <article
      aria-current={isToday ? "date" : undefined}
      className={cn(
        "schedule-enter min-w-0 bg-paper p-5 lg:p-6",
        isToday && "bg-cream/60"
      )}
      style={{ animationDelay: `${Math.min(index * 45, 270)}ms` }}
    >
      <header>
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[.14em] text-terracotta">{weekdayName}</p>
          {isToday && (
            <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-terracotta">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
              Today
            </p>
          )}
        </div>
        <h3 className="mt-1.5 font-display text-[26px] leading-none tracking-[-.02em] text-forest">
          <time dateTime={date}>
            {dateStr}
          </time>
        </h3>
      </header>
      <div
        className={cn("mb-1 mt-4 h-px", isToday ? "bg-terracotta/60" : "bg-border")}
        aria-hidden="true"
      />
      <div className="divide-y divide-border/70">
        {occurrences.length === 0 ? (
          <p className="py-6 font-mono text-[10px] uppercase tracking-[.14em] text-sage">No scheduled events</p>
        ) : (
          occurrences.map((occ) => (
            <EventCard key={occ.id} occurrence={occ} />
          ))
        )}
      </div>
    </article>
  );
}
