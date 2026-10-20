"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/site-header";
import { SkywardBondPortrait } from "@/components/skyward-bond/portrait";
import {
  SKYWARD_BOND_DIFFICULTY_LABELS,
  SKYWARD_BOND_MAX_FLOOR,
  SKYWARD_BOND_MIN_FLOOR,
  sortSkywardBondAchievements,
  type ResolvedSkywardBondAchievement,
  type SkywardBondClear,
  type SkywardBondDifficulty,
} from "@/lib/skyward-bond";

const SKYWARD_BOND_DIFFICULTY_TABS = ["abyss", "hard", "normal"] as const;
const SKYWARD_BOND_DEFAULT_DIFFICULTY: SkywardBondDifficulty = "abyss";

function recordCountLabel(count: number): string {
  return `${count} ${count === 1 ? "record" : "records"}`;
}

function clearLabel(clear: SkywardBondClear | undefined): string {
  if (!clear) return "No clear recorded";
  return `Floor ${clear.floor} · ${SKYWARD_BOND_DIFFICULTY_LABELS[clear.difficulty]}`;
}

function DifficultyBadge({ achievement }: { achievement: ResolvedSkywardBondAchievement }) {
  return (
    <span className="border border-[#C99A52]/35 bg-[#C99A52]/10 px-2 py-1 font-mono text-[9px] tracking-[.16em] text-[#E8C98A]">
      {achievement.difficultyLabel}
    </span>
  );
}

function AchievementCard({
  achievement,
  headingLevel = "h4",
}: {
  achievement: ResolvedSkywardBondAchievement;
  headingLevel?: "h4" | "h5";
}) {
  const Heading = headingLevel;
  const name = achievement.member ? (
    <Link href={`/members/${achievement.slug}`} className="transition-colors hover:text-[#C99A52]">
      {achievement.name}
    </Link>
  ) : (
    achievement.name
  );
  const floor = achievement.highestFloor ?? 0;

  return (
    <article className="flex flex-col border border-[#C99A52]/20 bg-[#090A0B]/70 p-5 backdrop-blur-sm">
      <SkywardBondPortrait name={achievement.name} portrait={achievement.portrait} />
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <DifficultyBadge achievement={achievement} />
        </div>

        <Heading className="mt-4 font-display text-2xl leading-tight">{name}</Heading>

        <dl className="mt-5 grid gap-4 border-t border-[#C99A52]/15 pt-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[.16em] text-[#A8A6A0]">
              Highest Floor &amp; Difficulty
            </dt>
            <dd className="mt-1 font-display text-xl leading-tight text-[#E9DCC6]">
              {clearLabel(achievement.overallHighest)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[.16em] text-[#A8A6A0]">
              Last Floor &amp; Difficulty
            </dt>
            <dd className="mt-1 font-display text-xl leading-tight text-[#E9DCC6]">
              {clearLabel(achievement.latestClear)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 border-t border-[#C99A52]/15 pt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-mono text-[9px] tracking-[.16em] text-[#A8A6A0]">
              {achievement.difficultyLabel} progress
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[.14em] text-[#E9DCC6]">
              Floor {floor} / {SKYWARD_BOND_MAX_FLOOR}
            </p>
          </div>
          <div
            role="progressbar"
            aria-label={`${achievement.name}, ${achievement.difficultyLabel} floor progress`}
            aria-valuemin={SKYWARD_BOND_MIN_FLOOR}
            aria-valuemax={SKYWARD_BOND_MAX_FLOOR}
            aria-valuenow={floor}
            className="mt-3 h-1.5 overflow-hidden bg-[#C99A52]/15"
          >
            <div
              className="h-full bg-[#C99A52]"
              style={{ width: `${(floor / SKYWARD_BOND_MAX_FLOOR) * 100}%` }}
            />
          </div>
        </div>

        {achievement.note && <p className="mt-4 text-sm italic leading-relaxed text-[#E9DCC6]/80">“{achievement.note}”</p>}
      </div>
    </article>
  );
}

function EmptyDifficulty({ difficulty }: { difficulty: SkywardBondDifficulty }) {
  const label = SKYWARD_BOND_DIFFICULTY_LABELS[difficulty];

  return (
    <div className="border border-[#C99A52]/20 bg-[#090A0B]/60 px-6 py-10 text-center backdrop-blur-sm sm:px-10">
      <p className="font-mono text-[10px] uppercase tracking-[.24em] text-[#C99A52]">The {label} ledger is open</p>
      <p className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
        No {label} clears have been recorded yet.
      </p>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#A8A6A0]">
        Recorded {label} floors will appear here as they are added to the ledger.
      </p>
    </div>
  );
}

function RecordedLedger({ records }: { records: ResolvedSkywardBondAchievement[] }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<SkywardBondDifficulty>(
    SKYWARD_BOND_DEFAULT_DIFFICULTY,
  );

  const selectDifficulty = (difficulty: SkywardBondDifficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleDifficultyKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % SKYWARD_BOND_DIFFICULTY_TABS.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + SKYWARD_BOND_DIFFICULTY_TABS.length) %
        SKYWARD_BOND_DIFFICULTY_TABS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = SKYWARD_BOND_DIFFICULTY_TABS.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextDifficulty = SKYWARD_BOND_DIFFICULTY_TABS[nextIndex];
    selectDifficulty(nextDifficulty);
    window.requestAnimationFrame(() => {
      document.getElementById(`skyward-bond-${nextDifficulty}-tab`)?.focus();
    });
  };

  return (
    <div className="mt-8">
      <noscript>
        <style>{`
          #skyward-bond-gallery [role="tablist"] { display: none; }
          #skyward-bond-gallery [role="tabpanel"] { display: block !important; }
        `}</style>
      </noscript>
      <div
        role="tablist"
        aria-label="Achievement difficulty"
        aria-orientation="horizontal"
        className="flex flex-wrap items-center gap-x-7 gap-y-2 border-b border-[#C99A52]/20"
      >
        {SKYWARD_BOND_DIFFICULTY_TABS.map((difficulty, index) => {
          const selected = difficulty === selectedDifficulty;
          const count = records.filter(record => record.difficulty === difficulty).length;

          return (
            <button
              key={difficulty}
              id={`skyward-bond-${difficulty}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`skyward-bond-${difficulty}-panel`}
              aria-label={`${SKYWARD_BOND_DIFFICULTY_LABELS[difficulty]}, ${recordCountLabel(count)}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectDifficulty(difficulty)}
              onKeyDown={event => handleDifficultyKeyDown(event, index)}
              className={`-mb-px flex items-baseline gap-2 border-b-2 px-0.5 pb-3 pt-1 font-mono text-[10px] uppercase tracking-[.18em] transition-colors focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#C99A52]/60 ${
                selected
                  ? "border-[#C99A52] text-[#E8C98A]"
                  : "border-transparent text-[#A8A6A0] hover:border-[#C99A52]/40 hover:text-[#E9DCC6]"
              }`}
            >
              {SKYWARD_BOND_DIFFICULTY_LABELS[difficulty]}
              <span
                aria-hidden="true"
                className={`text-[9px] tracking-[.12em] ${
                  selected ? "text-[#C99A52]" : "text-[#A8A6A0]/70"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {SKYWARD_BOND_DIFFICULTY_TABS.map(difficulty => {
        const group = records.filter(record => record.difficulty === difficulty);

        return (
          <div
            key={difficulty}
            id={`skyward-bond-${difficulty}-panel`}
            role="tabpanel"
            aria-labelledby={`skyward-bond-${difficulty}-tab`}
            tabIndex={0}
            className={`mt-8 focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-[#C99A52]/50 ${
              difficulty === selectedDifficulty ? "" : "hidden"
            }`}
          >
            {group.length === 0 ? (
              <EmptyDifficulty difficulty={difficulty} />
            ) : (
              <section aria-labelledby={`skyward-bond-${difficulty}-heading`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#C99A52]/20 pb-3">
                  <h4
                    id={`skyward-bond-${difficulty}-heading`}
                    className="font-display text-2xl text-[#E9DCC6]"
                  >
                    {SKYWARD_BOND_DIFFICULTY_LABELS[difficulty]}
                  </h4>
                  <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#A8A6A0]">
                    {recordCountLabel(group.length)}
                  </span>
                </div>
                <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {group.map(record => (
                    <li key={record.id}>
                      <AchievementCard achievement={record} headingLevel="h5" />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SkywardBondGallery({
  achievements,
  embedded = false,
}: {
  achievements: ResolvedSkywardBondAchievement[];
  embedded?: boolean;
}) {
  const records = sortSkywardBondAchievements(achievements);
  const accepted = records.filter(record => record.errors.length === 0);
  const invalid = records.filter(record => record.errors.length > 0);

  return (
    <section
      id="skyward-bond-gallery"
      aria-labelledby="skyward-bond-ledger-heading"
      className={`relative overflow-hidden text-[#E9DCC6] ${embedded ? "" : "bg-[#090A0B]"}`}
    >
      {!embedded && (
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/skyward-bond/banquet-hall.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090A0B] via-[#090A0B]/80 to-[#090A0B]" />
        </div>
      )}

      <div
        className={
          embedded
            ? "relative mx-auto max-w-[1440px] px-5 pb-20 pt-24 sm:px-6 lg:px-10 lg:pb-28 lg:pt-32"
            : "relative mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32"
        }
      >
        <Reveal>
          <SectionLabel light>Skyward Bond · Achievement Ledger</SectionLabel>
          <h2
            id="skyward-bond-ledger-heading"
            tabIndex={-1}
            className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,5.5vw,4.6rem)] leading-[.95] tracking-[-.03em] focus:outline-none"
          >
            Earned at the table, <span className="italic text-[#C99A52]">written in the hall.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#A8A6A0]">
            Floors across Normal, Hard, and Abyss from Adobo&apos;s Skyward Bond climb. Each record holds a
            Wanderer&apos;s progress in that difficulty, with their highest and latest achievements kept separate.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          <section aria-labelledby="skyward-bond-recorded-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#C99A52]/25 pb-4">
              <h3 id="skyward-bond-recorded-heading" className="font-display text-3xl text-[#E9DCC6]">
                Recorded clears
              </h3>
              <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#A8A6A0]">
                {recordCountLabel(accepted.length)}
              </p>
            </div>
            <RecordedLedger records={accepted} />
          </section>

          {invalid.length > 0 && (
            <aside
              aria-labelledby="skyward-bond-invalid-heading"
              className="border border-[#B7654B]/40 bg-[#1A0F0C]/70 p-6 sm:p-8"
            >
              <p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#E7B8A7]">Ledger notice</p>
              <h3 id="skyward-bond-invalid-heading" className="mt-3 font-display text-2xl text-[#E9DCC6]">
                Some entries were withheld.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A8A6A0]">
                These records failed floor validation and are not shown as clears.
              </p>
              <ul className="mt-6 space-y-5">
                {invalid.map((record, index) => (
                  <li key={`${record.id}-${index}`} className="border-t border-[#B7654B]/25 pt-4">
                    <p className="font-display text-lg text-[#E9DCC6]">
                      {record.name}{" "}
                      <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#A8A6A0]">
                        {record.difficultyLabel}
                      </span>
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 font-mono text-[10px] leading-relaxed text-[#E7B8A7]">
                      {record.errors.map((error, errorIndex) => (
                        <li key={`${record.id}-${errorIndex}`}>{error}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
