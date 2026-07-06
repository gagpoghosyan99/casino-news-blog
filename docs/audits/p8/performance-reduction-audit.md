# Performance Reduction Audit (P8)

Date: 2026-07-07  
Goal: Homepage First Load JS **below 230 kB**  
Result: **108 kB — PASS**

## Before (P7 baseline)

| Metric | Value |
|--------|-------|
| Homepage route size | 83.6 kB |
| First Load JS `/` | **246 kB** |
| Shared JS | 102 kB |
| `.next` directory | ~316M |
| Largest page chunk | `app/page-*.js` ~292K |

## After (P8)

| Metric | Value |
|--------|-------|
| Homepage route size | **1.54 kB** |
| First Load JS `/` | **108 kB** |
| Shared JS | **103 kB** |
| `.next` directory | ~317M |
| Homepage page chunk | Minimal shell; widgets in async chunks |

## Delta

| Metric | Change |
|--------|--------|
| First Load JS | **−138 kB (−56%)** |
| Homepage route | **−82 kB (−98%)** |

## Changes implemented

### 1. Server-rendered hero (`PremiumHeroShell.tsx`)
- Replaced client `PremiumHero` (framer-motion + locale hooks) with server component
- H1, intro copy, primary CTAs, stats — **SSR preserved for SEO**
- `JackpotTicker` deferred via `HeroJackpotTicker` client wrapper (`ssr: false`)

### 2. Server-rendered trust + RG sections
- `TrustPillars` — removed `"use client"` and framer-motion
- `ResponsibleGamblingSection` — removed client hooks; static English SSR

### 3. Client widget isolation (`HomeBelowFoldWidgets.tsx`)
- All below-fold widgets in dedicated `"use client"` bundle
- `ssr: false` on: JackpotWinnersFeed, TrendingNewsSection, HomeBlogPreview, TopCasinosWidget, BlacklistedCasinosSection, BonusTracker
- Removes framer-motion and widget data from initial page JS

### 4. Homepage structure (SSR order preserved)
1. PremiumHeroShell (SSR — H1 + CTAs)
2. TrustPillars (SSR)
3. InternalSeoGuidesSection (SSR — SEO internal links)
4. HomeAuthoritySection (SSR — authority links)
5. HomeBelowFoldWidgets (client, deferred)
6. ResponsibleGamblingSection (SSR)

## SEO content preserved

- H1 and hero intro: **SSR in HTML**
- InternalSeoGuidesSection + HomeAuthoritySection: **SSR, not lazy-loaded**
- Primary internal links (`/casinos`, `/compare`, payment hubs): **in initial HTML**
- Google Analytics: **unchanged** (`afterInteractive` in layout)

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| Below-fold widgets not in initial HTML | Low | SEO-critical links in SSR sections above widgets |
| Hero locale switching client-only | Low | English SSR for crawlers; locale UI elsewhere |
| Empty placeholder before widget hydration | Low | aria-hidden loading shells |

## Widget investigation summary

| Component | Issue | Fix |
|-----------|-------|-----|
| PremiumHero | framer-motion + locale on critical path | Server hero shell |
| TrustPillars | Client + framer-motion | Server component |
| TopCasinosWidget | framer-motion in deferred chunk | `ssr: false` in client wrapper |
| TrendingNewsSection | Same | `ssr: false` |
| HomeBlogPreview | Same | `ssr: false` |
| BlacklistedCasinosSection | Same | `ssr: false` |

## Verdict

**PASS** — Target <230 kB achieved at **108 kB** without removing SEO content or analytics.
