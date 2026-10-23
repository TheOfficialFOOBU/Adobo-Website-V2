import { cva } from "class-variance-authority";

/**
 * Shared call-to-action styling. Tones describe the surface the control sits
 * on, not the action itself, so the same hierarchy travels across the site:
 * one filled primary action and one quiet secondary action per view.
 */
export const actionButton = cva(
  "pressable inline-flex items-center justify-center gap-3 font-mono uppercase tracking-[.14em] transition-colors",
  {
    variants: {
      tone: {
        primary: "bg-gold text-forest hover:bg-paper",
        inverse: "bg-forest text-paper hover:bg-terracotta",
        secondary: "border border-paper/35 text-paper/85 hover:border-gold hover:text-gold",
        skyward:
          "border border-[#C99A52]/80 bg-[#090A0B]/80 text-[#E9DCC6] shadow-[0_10px_30px_rgba(9,10,11,0.35)] hover:border-[#C99A52] hover:bg-[#C99A52]/15 hover:text-[#F3E8D4]",
      },
      size: {
        compact: "px-5 py-3 text-[10px]",
        default: "px-6 py-4 text-[10px]",
        wide: "px-8 py-4 text-[10px]",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "default",
    },
  },
);
