"use client";

import { useState, useEffect, useCallback, useMemo, type CSSProperties } from "react";
import {
  getTargetWeekFrame,
  getWeekStartDates,
  generateWeekOccurrences,
  groupOccurrencesByDay,
  getWeekLabel,
  detectBrowserTimezone,
  type WeekFrame,
} from "@/lib/timezone";
import { DayColumn } from "./DayColumn";
import { WeekNavigation } from "./WeekNavigation";
import { FlexibleActivities } from "./FlexibleActivities";

interface WeekCalendarProps {
  /** Server-prerendered guild week (Manila), used for the hydration pass. */
  initialFrame: WeekFrame;
  /** Timezone used to prerender the initial frame; hydrates identical. */
  initialTimezone: string;
}

export function WeekCalendar({ initialFrame, initialTimezone }: WeekCalendarProps) {
  const [frame, setFrame] = useState<WeekFrame>(initialFrame);
  const [targetTimezone, setTargetTimezone] = useState<string>(initialTimezone);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const detected = detectBrowserTimezone();
      setTargetTimezone(detected);
      setFrame(getTargetWeekFrame(detected));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const weekDays = useMemo(() => getWeekStartDates(frame.weekStartDate), [frame.weekStartDate]);
  const occurrences = useMemo(() => generateWeekOccurrences(frame.weekStartDate, targetTimezone), [frame.weekStartDate, targetTimezone]);
  const groupedOccurrences = useMemo(() => groupOccurrencesByDay(occurrences), [occurrences]);
  const weekLabel = getWeekLabel(frame.weekStartDate);
  const isTodayWeek = weekDays.includes(frame.todayDate);

  const shiftWeek = useCallback((weeks: number) => {
    setFrame(current => {
      const [year, month, day] = current.weekStartDate.split("-").map(Number);
      const mondayUTC = new Date(Date.UTC(year, month - 1, day, 12));
      mondayUTC.setUTCDate(mondayUTC.getUTCDate() + weeks * 7);
      return {
        weekStartDate: mondayUTC.toISOString().slice(0, 10),
        todayDate: current.todayDate,
      };
    });
  }, []);

  const handlePreviousWeek = useCallback(() => {
    setDirection(-1);
    shiftWeek(-1);
  }, [shiftWeek]);

  const handleNextWeek = useCallback(() => {
    setDirection(1);
    shiftWeek(1);
  }, [shiftWeek]);

  const handleToday = useCallback(() => {
    setDirection(0);
    setFrame(getTargetWeekFrame(targetTimezone));
  }, [targetTimezone]);

  return (
    <>
      <div className="relative bg-forest">
        <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-28 lg:px-10 lg:pb-16 lg:pt-36">
          <div className="schedule-enter max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-paper">
              Guild Events
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[.9] tracking-[-.04em] text-paper">
              Guild Schedule
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-paper/80">
              A quiet ledger of gatherings, trials, and wars — kept in Manila time, shown in yours.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[.14em] text-gold">
              Time Zone: {targetTimezone} · Official schedule UTC+8
            </p>
          </div>

          <div className="schedule-enter mt-10" style={{ animationDelay: "100ms" }}>
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
            key={frame.weekStartDate}
            className="schedule-week grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-7"
            style={{ "--schedule-shift": direction === 0 ? "0px" : direction > 0 ? "10px" : "-10px" } as CSSProperties}
          >
            {weekDays.map((day, index) => {
              const dayOccurrences = groupedOccurrences[index] || [];
              const dayIsToday = day === frame.todayDate;

              return (
                <DayColumn
                  key={day}
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
