# Core Web Vitals Readiness

Updated: 2026-07-07  
Sprint: **CASINOPULSE_P9**

## Metrics overview

| Metric | What it measures | Good threshold |
|--------|------------------|----------------|
| **LCP** (Largest Contentful Paint) | Main content load speed | ≤ 2.5s |
| **INP** (Interaction to Next Paint) | Responsiveness | ≤ 200ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤ 0.1 |

## Current status (honest)

| Source | Available | Homepage result |
|--------|-----------|-----------------|
| CrUX field data (GSC) | **No** — requires GSC CWV report | **UNKNOWN** |
| GSC Core Web Vitals | **No** — owner login required | **UNKNOWN** |
| PageSpeed Insights API | Not configured on server | **UNKNOWN** |
| Lab test (manual PSI) | Owner action | **UNKNOWN** |

**Do not optimize blindly.** Baseline field data requires GSC or PageSpeed Insights manual run.

## Known technical state (verified P8)

| Item | Status | CWV relevance |
|------|--------|---------------|
| Homepage First Load JS | **108 kB** | Positive for LCP/INP |
| Hero H1 + intro | SSR in HTML | Positive for LCP (content in initial response) |
| Below-fold widgets | Client deferred (`ssr: false`) | Reduces initial JS; may delay interaction on scroll |
| framer-motion | Removed from above-fold hero | Positive for INP on hero |
| Images | Review OG/logo assets for lazy load | Monitor LCP element |
| Google Analytics | `afterInteractive` | Should not block LCP |

## Known risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Client widgets hydrate on scroll | INP on widget interaction | Already deferred; monitor |
| JackpotTicker client-only | Minor CLS if ticker loads late | `ssr: false` on ticker wrapper |
| Third-party fonts | LCP delay if render-blocking | Check `next/font` usage in layout |
| Large hero background effects | LCP if text not the LCP element | SSR text present; verify in PSI |
| No field data yet | Cannot confirm real-user CWV | Establish GSC CWV baseline |

## Monitoring cadence (recommended)

| Frequency | Action | Tool |
|-----------|--------|------|
| Weekly | GSC → Experience → Core Web Vitals | GSC |
| Monthly | PageSpeed Insights lab test on `/`, `/compare`, `/india-casino-payments` | PSI web UI |
| After deploy | Compare First Load JS in build output | `npm run build` |
| Quarterly | Review deferred widget impact | Playwright + PSI |

## Owner first capture checklist

1. GSC → **Experience** → **Core Web Vitals** → Mobile + Desktop
2. Record URLs flagged Poor / Needs improvement
3. [PageSpeed Insights](https://pagespeed.web.dev/) → test `https://casinopuls.site/`
4. Record LCP, INP, CLS from lab report
5. Append to [gsc-weekly-monitor.csv](./gsc-weekly-monitor.csv) Notes column

## URLs to monitor (priority)

1. `/` — homepage
2. `/compare` — commercial hub
3. `/india-casino-payments` — country authority
4. `/blogs/review-stake` — top pillar review

## P9 verdict

**Readiness: PREPARED** — monitoring framework documented; **field CWV data UNKNOWN** until GSC/PSI capture.

No blind optimization applied this sprint.
