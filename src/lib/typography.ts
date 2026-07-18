/**
 * ZEONEBET typography tokens — loaded via next/font in `src/app/layout.tsx`.
 *
 * CSS variables:
 * - `--font-inter`     → body / UI (Inter)
 * - `--font-display`   → headings H1–H6 (Cinzel)
 * - `--font-numeric`   → jackpots, odds, prices, stats (Space Grotesk)
 *
 * Tailwind:
 * - `font-sans`    → Inter
 * - `font-display` → Cinzel
 * - `font-numeric` → Space Grotesk (+ tabular nums via `.font-numeric` / `.font-notice`)
 */
export const typography = {
  body: "font-sans",
  heading: "font-display",
  numeric: "font-numeric",
} as const;
