# Browser Console Audit (P7)

Date: 2026-07-07  
Tool: `scripts/audit-browser-console.js` (Playwright)  
Base URL: https://casinopuls.site

## Environment

| Item | Status |
|------|--------|
| Playwright npm package | Installed (devDependency) |
| Chromium system deps | Installed via `npx playwright install-deps chromium` |
| Post-deploy audit | Yes (after `pm2 restart casino-news-blog`) |

## Pages audited

| URL | HTTP | Project errors | Hydration warnings |
|-----|------|----------------|-------------------|
| `/` | 200 | None | None |
| `/casinos` | 200 | None | None |
| `/compare` | 200 | None | None |
| `/blogs/review-stake` | 200 | 1 benign prefetch | None |
| `/blacklist` | 200 | None | None |

## Findings

### Confirmed project errors

**None** on post-deploy audit.

### Benign / not fixed

1. **`/blogs/review-stake` — `net::ERR_ABORTED` on `/casinos?_rsc=...`**
   - Next.js RSC prefetch request aborted during Playwright navigation idle wait
   - Not a user-facing console error; no fix required
   - Verify manually in Chrome DevTools if needed

### Pre-deploy false positives (resolved)

Before PM2 restart, stale homepage chunk hash (`page-998b264535913fa5.js`) returned 400. Resolved after deploy — not a code defect.

## Raw output

See [browser-console-audit.json](./browser-console-audit.json)

## Manual DevTools fallback

If Playwright unavailable on another host:

1. Open Chrome DevTools → Console
2. Visit each URL with extensions disabled
3. Record errors excluding extension noise
4. Check Network tab for failed resources (exclude analytics)

## Verdict

**PASS** — No confirmed application JavaScript errors on audited pages post-deploy.
