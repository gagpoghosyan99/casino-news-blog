/**
 * ZEONEBET typography tokens — loaded via next/font in `src/app/layout.tsx`.
 *
 * CSS variables:
 * - `--font-inter`     → body / UI (Source Sans 3 — calm reading face)
 * - `--font-display`   → major display titles (Cinzel)
 * - `--font-numeric`   → jackpots, odds, prices, stats (Space Grotesk)
 *
 * Tailwind:
 * - `font-sans`    → Source Sans 3
 * - `font-display` → Cinzel
 * - `font-numeric` → Space Grotesk (+ tabular nums via `.font-numeric` / `.font-notice`)
 */
export const typography = {
  body: "font-sans",
  heading: "font-display",
  numeric: "font-numeric",
} as const;
