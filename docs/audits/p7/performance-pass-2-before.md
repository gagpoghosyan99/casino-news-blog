# Performance Pass 2 — Before

Date: 2026-07-07  
Sprint: CASINOPULSE_P7  
Baseline commit: `6aa5ebc` (pre-P7 perf changes)

## Scope

Homepage client widgets audited:

| Component | P6 state | P7 target |
|-----------|----------|-----------|
| TrendingNewsSection | Eager import | Dynamic below-fold |
| TopCasinosWidget | Eager import | Dynamic below-fold |
| RecentGuidesWidget | **Not in codebase** | N/A |
| JackpotWinnersFeed | Dynamic (P6) | Keep dynamic |
| BonusTracker | Dynamic (P6) | Keep dynamic |
| HomeBlogPreview | Eager import | Dynamic below-fold |
| BlacklistedCasinosSection | Eager import | Dynamic below-fold |

## SSR preserved (not lazy-loaded)

- `PremiumHero` — H1 and primary intro
- `TrustPillars` — above-fold trust signals
- `InternalSeoGuidesSection` — SEO internal links
- `HomeAuthoritySection` — authority copy and links
- `ResponsibleGamblingSection` — RG content

## Build metrics (P6 baseline)

| Metric | Value |
|--------|-------|
| `npm run build` | PASS |
| `.next` directory size | ~314M |
| Homepage route chunk | `app/page-*.js` ~292K (largest page chunk) |
| First Load JS `/` (P6 build output) | ~246 kB |
| Shared JS | ~102 kB |

## Largest static JS chunks (P6 tail -25)

Captured pre-P7 from `.next/static` — top entries included homepage `app/page-*.js` (~292K) among largest route bundles.

## Client widget bundle impact

P6 already split JackpotWinnersFeed + BonusTracker. Remaining eager widgets (TrendingNews, TopCasinos, HomeBlogPreview, BlacklistedCasinos) contributed to homepage First Load JS.

## Google Analytics

`afterInteractive` loading preserved in root layout — not modified in P7 perf pass.

## Notes

RecentGuidesWidget referenced in sprint spec does not exist in repository; audit covers actual homepage components only.
