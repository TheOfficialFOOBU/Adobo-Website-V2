"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Transition delay in ms, used for gentle staggering. */
  delay?: number;
  as?: "div" | "p" | "span" | "li";
}

/**
 * One-shot scroll reveal. Content renders fully visible and is only hidden
 * by JavaScript after mount when it is off-screen, so nothing ever depends
 * on animation to be seen. Honors prefers-reduced-motion by staying visible.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        } else {
          setArmed(true);
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={`reveal ${armed && !visible ? "reveal-pre" : ""} ${className}`}
      style={{ transitionDelay: delay > 0 ? `${delay}ms` : undefined } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
