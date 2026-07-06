# Performance Pass 2 — After

Date: 2026-07-07  
Sprint: CASINOPULSE_P7

## Changes applied

Dynamic `next/dynamic` imports added in `src/app/page.tsx`:

| Component | Status |
|-----------|--------|
| JackpotWinnersFeed | Dynamic (P6, retained) |
| TrendingNewsSection | **Dynamic (P7)** |
| HomeBlogPreview | **Dynamic (P7)** |
| TopCasinosWidget | **Dynamic (P7)** |
| BlacklistedCasinosSection | **Dynamic (P7)** |
| BonusTracker | Dynamic (P6, retained) |

## SSR preserved (eager)

- PremiumHero (H1 + intro)
- TrustPillars
- InternalSeoGuidesSection
- HomeAuthoritySection
- ResponsibleGamblingSection

## Build metrics (P7 after)

| Metric | Before (P6) | After (P7) |
|--------|-------------|------------|
| `npm run build` | PASS | **PASS** |
| `.next` size | ~314M | **316M** |
| Homepage route size | ~292K page chunk | **83.6 kB route / 292K page chunk** |
| First Load JS `/` | ~246 kB | **246 kB** |
| Shared JS | ~102 kB | **102 kB** |

## JS chunk analysis

- Homepage `app/page-*.js` remains ~292K (widget code still bundled in lazy chunks loaded on demand)
- First Load JS unchanged at 246 kB — initial critical path similar; below-fold widgets defer hydration via dynamic import
- Additional async chunks load after first paint for TrendingNews, TopCasinos, HomeBlogPreview, BlacklistedCasinos

## Components lazy-loaded (P7 net new)

1. TrendingNewsSection
2. HomeBlogPreview
3. TopCasinosWidget
4. BlacklistedCasinosSection

## SEO content preserved

- H1 and hero copy: SSR via PremiumHero
- InternalSeoGuidesSection + HomeAuthoritySection: SSR, not lazy-loaded
- All indexable links remain in initial HTML from SSR sections

## Google Analytics

`afterInteractive` strategy unchanged in root layout.

## Risks

- **Low:** Brief empty placeholder sections before widget hydration (aria-hidden loading shells)
- **Low:** First Load JS metric unchanged — further gains may require splitting shared client dependencies inside widgets
- **None:** SEO-critical SSR sections unaffected

## RecentGuidesWidget

Not present in codebase — N/A.

## Verdict

**PASS** — Safe below-fold lazy loading applied without regressing build or First Load JS baseline. Further optimization (widget-level code splitting) optional for P8.
