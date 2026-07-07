# CASINOPULSE P11 — Real Outreach, GSC, Indexing & Backlink Tracking

**Sprint:** CASINOPULSE_P11_REAL_OUTREACH_SENDS_GSC_INDEXING_AND_FIRST_BACKLINK_TRACKING  
**Date:** 2026-07-07  
**Baseline commit (start):** `e05f554`  
**P11 commit:** `21f9992`

---

## Executive verdict

**PARTIAL — infrastructure and tracking complete; authority signals NOT yet achieved.**

P11 required at least one real-world outcome (outreach sent, GSC baseline, report indexed, or verified backlink). **None verified.** All operational docs, audit suite, build, deploy, and live validation completed. Success criteria remain **blocked on owner actions** (manual email dispatch, GSC login/export, URL Inspection request).

---

## Commit hash

`21f9992` — feat(seo): execute outreach and authority tracking

---

## Build result

**PASS** (2026-07-07)

- Homepage First Load JS: **108 kB** (within 106–108 kB target)
- Report route: `/reports/south-asia-casino-payments-2026` — 106 kB First Load JS

---

## PM2 status

**online** — `casino-news-blog` restarted and saved after build.

---

## Report URL

https://casinopuls.site/reports/south-asia-casino-payments-2026

| Check | Result |
|-------|--------|
| HTTP | 200 |
| Canonical | Present (self-referencing) |
| Sitemap | Included (1 entry) |
| robots | index, follow |

---

## Indexed status

| Source | Result |
|--------|--------|
| Google `site:` (report URL) | **No results** (2026-07-07) |
| Google `site:` (whole domain) | **No results** (2026-07-07) |
| GSC URL Inspection | **UNKNOWN** (owner login required) |
| **Indexed?** | **No** (external check); GSC **UNKNOWN** |

---

## GSC baseline status

**UNKNOWN** — no owner export during P11.

See: [gsc-baseline-report-p11.md](../../authority/gsc-baseline-report-p11.md), [gsc-weekly-monitor.csv](../../authority/gsc-weekly-monitor.csv), [authority-scoreboard.md](../../authority/authority-scoreboard.md).

---

## Outreach prepared

**10** targets in P11 priority order (READY_TO_SEND):

1. GamCare  
2. Responsible Gambling Council  
3. Gambling Therapy  
4. Finextra  
5. YourStory Fintech  
6. CoinGape  
7. Decrypt  
8. iGaming Business  
9. CoinTelegraph  
10. BeInCrypto  

Docs: [p11-outreach-execution.md](../../authority/p11-outreach-execution.md), [outreach-send-queue.csv](../../authority/outreach-send-queue.csv)

---

## Outreach sent

**0** — no SMTP/mailbox on server; emails not dispatched. Statuses not fabricated.

---

## Replies received

**0**

---

## Backlinks verified

**0** — see [p11-backlink-verification.md](../../authority/p11-backlink-verification.md)

---

## Authority dashboard

See [p11-authority-dashboard.md](../../authority/p11-authority-dashboard.md)

| Metric | Value |
|--------|-------|
| Prospects | 32 |
| Prepared | 10 |
| Sent | 0 |
| Replies | 0 |
| Live links | 0 |
| Referring domains | UNKNOWN |

---

## Audit suite result

All scripts run 2026-07-07 against live site:

| Audit | Result |
|-------|--------|
| Title lengths | **0 failures** |
| Meta descriptions | **0 missing**, 0 too long |
| H1 | **0 missing** |
| Word count | **0 thin pages** |
| Review schema gating | **33/33** pillar pages; 0 unexpected; 0 missing on pillar |
| Schema types | PASS |
| Affiliate /go links | PASS (noindex, redirect policy) |
| Authority internal links | PASS |
| Entity schema | **ENTITY_SCHEMA_PASS** |

---

## Live validation result

See [live-validation.txt](./live-validation.txt) (2026-07-07T11:14:23Z)

| URL | Expected | Actual |
|-----|----------|--------|
| Homepage | 200 | **200** |
| WWW | 301 → non-www | **301** |
| Report page | 200 | **200** |
| /compare | 200 | **200** |
| /india-casino-payments | 200 | **200** |
| /go/stake | 307 + noindex | **307** + `x-robots-tag: noindex, nofollow` |
| /llms.txt | 200 | **200** |

Note: Brief 502 immediately after PM2 restart (cold start); resolved within ~15s.

---

## Remaining blockers

1. **Owner:** Send Priority 1–3 outreach (GamCare, RGC, Gambling Therapy) from personal mailbox  
2. **Owner:** GSC login → URL Inspection → Request indexing for report URL  
3. **Owner:** GSC Performance + Coverage export → replace UNKNOWN metrics  
4. **Owner:** Ahrefs/Semrush or GSC Links → first referring domain baseline  
5. **Push:** SSH publickey denied — commits remain server-local  

---

## Recommended P12

**CASINOPULSE_P12_FIRST_OUTREACH_DISPATCH_AND_GSC_INDEX_REQUEST**

1. Owner confirms ≥3 outreach sends (update tracker to SENT with dates)  
2. GSC URL Inspection requested + screenshot/export logged  
3. Weekly GSC monitor row populated (first non-UNKNOWN baseline)  
4. Re-check `site:` report URL at Day 7  
5. Follow-up calendar Day 7 triggers for any SENT targets  
6. Optional: Bing Webmaster Tools URL submit as secondary index signal  

---

## P11 success criteria checklist

| Criterion | Met? |
|-----------|------|
| Outreach actually sent | **No** |
| GSC baseline captured | **No** |
| Report page indexed | **No** |
| First verified backlink | **No** |

**Documentation alone is NOT success** — P11 authority execution remains open for P12.
