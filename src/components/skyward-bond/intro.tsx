"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent as ReactAnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { SiteHeader } from "@/components/site-header";
import { SteamOverlay } from "@/components/skyward-bond/steam-overlay";

type SceneStage = "simmer" | "serving" | "invitation" | "approach" | "doors" | "hall";

const SIMMER_MS = 2000;
const SERVING_MS = 2000;
const APPROACH_MS = 700;
const DOOR_OPEN_MS = 2150;
const DOOR_FADE_MS = 700;
const REVEAL_MS = APPROACH_MS + DOOR_OPEN_MS;

/**
 * Skyward Bond cinematic: kitchen simmer (0-2s) -> finished serving (2-4s) ->
 * invitation (4-6s) -> full-screen doors -> the achievement ledger on request.
 * Scene state is explicit; timers are cleaned up; image loading never gates the
 * sequence, so a slow or failed image cannot strand the visitor. The ledger is
 * server-rendered and remains reachable by normal scrolling without JavaScript.
 */
export function SkywardBondIntro({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<SceneStage>("simmer");
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focusLedger, setFocusLedger] = useState(false);
  const [gatesRetired, setGatesRetired] = useState(false);
  const timersRef = useRef<number[]>([]);
  const enteringRef = useRef(false);
  const completedRef = useRef(false);
  const ledgerRef = useRef<HTMLDivElement | null>(null);

  const entered = stage === "hall";
  const hallVisible = stage === "approach" || stage === "doors" || entered;
  const gatesVisible = stage === "approach" || stage === "doors" || (entered && !gatesRetired);
  const gatesOpen = stage === "doors" || entered;
  const gatesDeparting = entered && !gatesRetired;
  const lockScroll = stage === "approach" || stage === "doors";
  const showingSimmer = stage === "simmer";
  const showingServing = stage === "serving" || stage === "invitation";
  const showingInvitation = stage === "invitation";
  const invitationInteractive = showingInvitation && !entered;
  const showingSkip = showingSimmer || showingServing;

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const bootId = window.setTimeout(() => {
      setMounted(true);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReducedMotion(prefersReduced);
      if (prefersReduced) {
        setStage("invitation");
        return;
      }
      timersRef.current = [
        window.setTimeout(() => setStage(current => (current === "simmer" ? "serving" : current)), SIMMER_MS),
        window.setTimeout(
          () => setStage(current => (current === "simmer" || current === "serving" ? "invitation" : current)),
          SIMMER_MS + SERVING_MS,
        ),
      ];
    }, 0);
    timersRef.current.push(bootId);
    return clearTimers;
  }, [clearTimers]);

  useEffect(() => {
    if (!focusLedger || stage !== "hall") return;
    const focusId = window.setTimeout(() => {
      ledgerRef.current?.querySelector<HTMLElement>("#skyward-bond-ledger-heading")?.focus({ preventScroll: true });
      setFocusLedger(false);
    }, 350);
    return () => window.clearTimeout(focusId);
  }, [focusLedger, stage]);

  useEffect(() => {
    if (!mounted || reducedMotion || !lockScroll) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const wasInert = body.hasAttribute("inert");
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    body.setAttribute("inert", "");
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      if (!wasInert) body.removeAttribute("inert");
    };
  }, [lockScroll, mounted, reducedMotion]);

  const finishEntrance = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setStage("hall");
    setFocusLedger(true);
    const retireId = window.setTimeout(() => setGatesRetired(true), DOOR_FADE_MS);
    timersRef.current.push(retireId);
  }, []);

  const handleDoorAnimationEnd = useCallback(
    (event: ReactAnimationEvent<HTMLDivElement>) => {
      if (event.animationName === "skyward-door-left-open") finishEntrance();
    },
    [finishEntrance],
  );

  const skipIntro = useCallback(() => {
    if (enteringRef.current) return;
    clearTimers();
    setStage(current => (current === "hall" ? current : "invitation"));
  }, [clearTimers]);

  const enterFeast = useCallback(() => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    clearTimers();
    const prefersReduced =
      reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setStage("hall");
      setFocusLedger(true);
      setGatesRetired(true);
      return;
    }
    setStage("approach");
    timersRef.current.push(
      window.setTimeout(() => setStage(current => (current === "approach" ? "doors" : current)), APPROACH_MS),
      window.setTimeout(finishEntrance, REVEAL_MS + 1000),
    );
  }, [clearTimers, finishEntrance, reducedMotion]);


  return (
    <>
      <div data-skyward-scene data-stage={stage}>
        <section
        aria-label="Skyward Bond cinematic introduction"
        className="relative min-h-svh overflow-hidden bg-[#090A0B] text-[#E9DCC6]"
      >
        {/* Stage 1 environment: the wuxia kitchen (Asset 03). */}
        <div
          aria-hidden="true"
          className={`skyward-layer absolute inset-0 transition-opacity duration-[1200ms] ease-out ${showingSimmer ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src="/images/skyward-bond/wuxia-kitchen.png"
            alt=""
            fill
            preload
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="skyward-push object-cover object-center"
          />
        </div>

        {/* Stage 1 focal point: the simmering pot (Asset 01), feathered into the kitchen.
            On small screens the box is kept square so the feather mask tracks the artwork. */}
        <div
          aria-hidden="true"
          className={`skyward-layer absolute inset-x-0 top-[12%] bottom-[-3%] transition-opacity duration-[1200ms] ease-out max-sm:bottom-auto max-sm:top-1/2 max-sm:aspect-square max-sm:-translate-y-1/2 ${showingSimmer ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src="/images/skyward-bond/simmering-pot.png"
            alt=""
            fill
            preload
            sizes="(max-width: 640px) 100vw, 1200px"
            className="skyward-push-slow skyward-pot-mask object-contain"
          />
        </div>

        {/* Stage 2: the finished serving (Asset 02). Mounted from the start so it is
            ready when the stage begins; the settle animation starts with the stage. */}
        <div
          aria-hidden="true"
          className={`skyward-layer absolute inset-0 transition-opacity duration-[1100ms] ease-out ${showingServing ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src="/images/skyward-bond/adobo-serving.png"
            alt=""
            fill
            sizes="(min-width: 1536px) 1536px, 100vw"
            className={`object-cover object-center ${showingServing ? "skyward-settle" : ""}`}
          />
        </div>

        {/* The banquet hall (Asset 05), staged behind the doors from the start so
            it is decoded and painted before the entrance begins. */}
        <div
          aria-hidden="true"
          className={`skyward-layer absolute inset-0 transition-opacity duration-[1300ms] ease-out ${hallVisible ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src="/images/skyward-bond/banquet-hall.png"
            alt=""
            fill
            preload
            sizes="(min-width: 1536px) 1536px, 100vw"
            className="skyward-hall-push object-cover object-center"
          />
        </div>

        {/* Transparent steam (Asset 04); continues through serving, remains as faint mist in the hall. */}
        <SteamOverlay
          className={`skyward-steam-layer transition-opacity duration-[1400ms] ease-out ${
            hallVisible ? "opacity-[0.16]" : showingInvitation ? "opacity-40" : "opacity-90"
          }`}
        />

        {/* Ambient warm lighting variation. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_68%_32%,rgba(217,137,67,0.22),transparent_70%)] transition-opacity duration-1000 ${
            entered ? "opacity-0" : "skyward-ambient opacity-70"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_60%,rgba(201,154,82,0.18),transparent_72%)] transition-opacity duration-1000 ${
            hallVisible ? "skyward-ambient-soft opacity-40" : "opacity-0"
          }`}
        />

        {/* Cinematic edge vignette, shared by all stages. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${hallVisible ? "opacity-40" : "opacity-100"}`}
          style={{ background: "radial-gradient(115% 95% at 50% 42%, transparent 38%, rgba(9, 10, 11, 0.85) 100%)" }}
        />

        {/* Invitation legibility scrim. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0B]/95 via-[#090A0B]/45 to-[#090A0B]/10 transition-opacity duration-[1200ms] ${
            showingInvitation ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hall emphasis scrim once the doors begin to open. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-[#090A0B]/60 via-transparent to-[#090A0B]/70 transition-opacity duration-[1400ms] ${
            hallVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <SiteHeader />

        {/* Invitation, stages 1-3. */}
        <div className="relative grid min-h-svh place-items-center px-6 pb-28 pt-32">
          <div
            inert={mounted && !invitationInteractive}
            className={`skyward-invite col-start-1 row-start-1 w-full transition-opacity duration-700 ${
              showingInvitation ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="skyward-copy-halo mx-auto max-w-3xl text-center">
              <p
                className={`skyward-invite-text skyward-label-shadow font-mono text-[11px] uppercase tracking-[.24em] text-[#E8C98A] ${
                  showingInvitation ? "skyward-invite-in" : "opacity-0"
                }`}
              >
                The Skyward Bond
              </p>
              <h1
                className={`skyward-invite-text skyward-headline-shadow mt-8 font-display text-[clamp(2.9rem,7.5vw,5.6rem)] leading-[1.08] tracking-[-.02em] ${
                  showingInvitation ? "skyward-invite-in" : "opacity-0"
                }`}
                style={showingInvitation ? { animationDelay: "140ms" } : undefined}
              >
                Served Hot.
                <span className="block italic text-[#C99A52]">Earned Together.</span>
              </h1>
              <div
                className={`skyward-cta mt-12 ${showingInvitation ? "skyward-invite-in" : "opacity-0"}`}
                style={showingInvitation ? { animationDelay: "300ms" } : undefined}
              >
                <button
                  type="button"
                  onClick={enterFeast}
                  className="pressable border border-[#C99A52]/80 bg-[#090A0B]/80 px-10 py-5 font-display text-sm uppercase tracking-[.26em] text-[#E9DCC6] shadow-[0_10px_30px_rgba(9,10,11,0.35)] transition-colors duration-300 hover:border-[#C99A52] hover:bg-[#C99A52]/15 hover:text-[#F3E8D4]"
                >
                  Enter the Feast
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The existing Skyward Bond achievement ledger, revealed through the
            opening doors. It has its own scroll region so the hall stays a single
            cinematic frame; reaching the end chains to the footer naturally. */}
        <div
          ref={ledgerRef}
          data-open={gatesOpen ? "true" : "false"}
          inert={mounted && !entered}
          className="skyward-ledger absolute inset-0 z-20"
        >
          <div
            role="region"
            aria-labelledby="skyward-bond-ledger-heading"
            tabIndex={0}
            className="skyward-ledger-scroll h-full overflow-y-auto focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-[#C99A52]/50"
          >
            {children}
          </div>
        </div>

        {/* Skip control, bottom of the scene, until the invitation arrives. */}
        <button
          type="button"
          onClick={skipIntro}
          inert={mounted && !showingSkip}
          className={`skyward-skip skyward-label-shadow absolute inset-x-0 bottom-7 z-20 mx-auto w-fit font-mono text-[11px] uppercase tracking-[.2em] text-[#E9DCC6]/90 underline-offset-8 transition-all duration-500 hover:text-[#E9DCC6] hover:underline ${
            showingSkip ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Skip Intro
        </button>
      </section>

      {/* No-JavaScript fallback: hide the scene layers and doors, show the
          invitation text, and let the achievement ledger flow normally. */}
      <noscript>
        <style>{`
          [data-skyward-scene] .skyward-layer,
          [data-skyward-scene] .skyward-steam-layer,
          [data-skyward-scene] .skyward-gates { display: none !important; }
          [data-skyward-scene] .skyward-invite { opacity: 1 !important; pointer-events: auto !important; }
          [data-skyward-scene] .skyward-invite-text { opacity: 1 !important; }
          [data-skyward-scene] .skyward-cta,
          [data-skyward-scene] .skyward-skip { display: none !important; }
          [data-skyward-scene] .skyward-ledger { position: relative !important; inset: auto !important; opacity: 1 !important; visibility: visible !important; }
          [data-skyward-scene] .skyward-ledger::before { display: none !important; }
          [data-skyward-scene] .skyward-ledger-scroll { height: auto !important; overflow: visible !important; }
        `}</style>
      </noscript>
      </div>

      {mounted &&
        !reducedMotion &&
        !gatesRetired &&
        createPortal(
          <div
            aria-hidden="true"
            className={`skyward-gates ${gatesVisible ? "is-visible" : ""} ${gatesOpen ? "is-open" : ""} ${gatesDeparting ? "is-departing" : ""}`}
            style={{ "--skyward-door-duration": `${DOOR_OPEN_MS}ms` } as CSSProperties}
          >
            <div className="skyward-gate-stage">
              <div className="skyward-gate">
                <div className="skyward-gate-light" />
                <div className="skyward-gate-leaf skyward-gate-leaf-left" onAnimationEnd={handleDoorAnimationEnd}>
                  <div className="skyward-door-face">
                    <span className="skyward-door-bezel" />
                    <span className="skyward-door-panel skyward-door-panel-upper">
                      <span className="skyward-door-lattice" />
                    </span>
                    <span className="skyward-door-rail" />
                    <span className="skyward-door-panel skyward-door-panel-lower">
                      <span className="skyward-door-medallion" />
                    </span>
                    <span className="skyward-door-hinge skyward-door-hinge-top" />
                    <span className="skyward-door-hinge skyward-door-hinge-bottom" />
                    <span className="skyward-door-handle" />
                  </div>
                </div>
                <div className="skyward-gate-leaf skyward-gate-leaf-right">
                  <div className="skyward-door-face">
                    <span className="skyward-door-bezel" />
                    <span className="skyward-door-panel skyward-door-panel-upper">
                      <span className="skyward-door-lattice" />
                    </span>
                    <span className="skyward-door-rail" />
                    <span className="skyward-door-panel skyward-door-panel-lower">
                      <span className="skyward-door-medallion" />
                    </span>
                    <span className="skyward-door-hinge skyward-door-hinge-top" />
                    <span className="skyward-door-hinge skyward-door-hinge-bottom" />
                    <span className="skyward-door-handle" />
                  </div>
                </div>
                <div className="skyward-gate-seam" />
                <div className="skyward-gate-frame" />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
