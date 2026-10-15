"use client";

import { useState, useEffect, useCallback, useMemo, useRef, type CSSProperties } from "react";
import {
  getWeekStart,
  getWeekDays,
  generateWeekOccurrences,
  groupOccurrencesByDay,
  isToday,
  getWeekLabel,
  detectBrowserTimezone,
} from "@/lib/timezone";
import { GUILD_TIMEZONE } from "@/lib/schedule";
import { DayColumn } from "./DayColumn";
import { WeekNavigation } from "./WeekNavigation";
import { FlexibleActivities } from "./FlexibleActivities";

export function WeekCalendar() {
  const [weekStart, setWeekStart] = useState<Date>(() => {
    return getWeekStart(new Date());
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const [targetTimezone, setTargetTimezone] = useState<string>(GUILD_TIMEZONE);
  const [direction, setDirection] = useState(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setWeekStart(getWeekStart(new Date()));
    setTargetTimezone(detectBrowserTimezone());
    setIsInitialized(true);
  }, []);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);
  const occurrences = useMemo(() => generateWeekOccurrences(weekStart, targetTimezone), [weekStart, targetTimezone]);
  const groupedOccurrences = useMemo(() => groupOccurrencesByDay(occurrences), [occurrences]);
  const weekLabel = getWeekLabel(weekStart);
  const isTodayWeek = weekDays.some((day) => isToday(day));

  const handlePreviousWeek = useCallback(() => {
    setDirection(-1);
    setWeekStart((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(prev.getDate() - 7);
      return newStart;
    });
  }, []);

  const handleNextWeek = useCallback(() => {
    setDirection(1);
    setWeekStart((prev) => {
      const newStart = new Date(prev);
      newStart.setDate(prev.getDate() + 7);
      return newStart;
    });
  }, []);

  const handleToday = useCallback(() => {
    setDirection(0);
    setWeekStart(getWeekStart(new Date()));
  }, []);

  if (!isInitialized) {
    return (
      <div className="bg-forest">
        <div className="mx-auto max-w-[1440px] px-6 pb-20 pt-28 text-center lg:px-10 lg:py-32">
          <div className="flex items-center justify-center gap-3 text-paper">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[.14em]">Loading calendar...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-forest">
        <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <div className="schedule-enter max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-paper">
              <span className="mr-3 inline-block h-px w-8 bg-terracotta align-middle" aria-hidden="true" />
              Guild Events
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[.9] tracking-[-.04em] text-paper">
              Guild Schedule
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-paper/80">
              A quiet ledger of gatherings, trials, and wars — kept in Manila time, shown in yours.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[.14em] text-gold">
              Times in {targetTimezone} · Official schedule UTC+8
            </p>
          </div>

          <div className="schedule-enter mt-10 flex items-center gap-4" style={{ animationDelay: "60ms" }} aria-hidden="true">
            <span className="h-px w-12 bg-terracotta" />
            <span className="h-px flex-1 bg-paper/15" />
          </div>

          <div className="schedule-enter mt-8" style={{ animationDelay: "100ms" }}>
            <WeekNavigation
              onPrevious={handlePreviousWeek}
              onNext={handleNextWeek}
              onToday={handleToday}
              isTodayWeek={isTodayWeek}
              weekLabel={weekLabel}
            />
          </div>
        </div>
      </div>

      <section className="bg-paper" aria-label="Weekly events">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
          <div
            key={weekStart.toISOString()}
            className="schedule-week grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-7"
            style={{ "--schedule-shift": direction === 0 ? "0px" : direction > 0 ? "10px" : "-10px" } as CSSProperties}
          >
            {weekDays.map((day, index) => {
              const dayOccurrences = groupedOccurrences[index] || [];
              const dayIsToday = isToday(day);

              return (
                <DayColumn
                  key={day.toISOString().split("T")[0]}
                  date={day}
                  occurrences={dayOccurrences}
                  isToday={dayIsToday}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      <FlexibleActivities />
    </>
  );
}
