"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface WeekNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  isTodayWeek: boolean;
  weekLabel: string;
}

const buttonClass =
  "group flex items-center gap-2 rounded-sm border border-paper/25 bg-transparent px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.14em] text-paper transition-colors duration-200 hover:border-paper/60 hover:bg-paper/10";

export function WeekNavigation({
  onPrevious,
  onNext,
  onToday,
  isTodayWeek,
  weekLabel,
}: WeekNavigationProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={onPrevious}
          className={buttonClass}
          aria-label="Previous week"
        >
          <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          onClick={onToday}
          disabled={isTodayWeek}
          className={cn(
            buttonClass,
            isTodayWeek && "cursor-default border-transparent text-paper/40 hover:border-transparent hover:bg-transparent"
          )}
          aria-label="Current week"
        >
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Today</span>
        </button>
        <button
          onClick={onNext}
          className={buttonClass}
          aria-label="Next week"
        >
          <span>Next</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
      <div className="md:text-right">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-paper/60">Week of</p>
        <p className="mt-1 font-display text-xl leading-tight text-paper">{weekLabel}</p>
      </div>
    </div>
  );
}
