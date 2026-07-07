# CASINOPULSE_P10_AUTHORITY_ASSET_PUBLICATION_AND_REAL_OUTREACH_EXECUTION

Date: 2026-07-07  
Verdict: **PASS** — Real linkable asset published; outreach prepared with report as primary URL

---

## Executive verdict

P10 delivered a **live, citation-worthy authority report** at `/reports/south-asia-casino-payments-2026`, wired internal links from homepage and authority hubs, updated Wave 1 outreach to point at the report, and preserved technical SEO/performance. No outreach was sent from the server; GSC/backlink data remain **UNKNOWN**.

---

## Deployment

| Item | Result |
|------|--------|
| **Commit** | (pending commit) |
| **Build** | PASS |
| **PM2** | `casino-news-blog` online |
| **Push** | Expected fail — SSH publickey denied |

---

## Report page

| Field | Value |
|-------|-------|
| **URL** | https://casinopuls.site/reports/south-asia-casino-payments-2026 |
| **Status** | **200** live |
| **First Load JS** | ~106 kB (201 B route) |
| **Schema** | Article + WebPage + Breadcrumb + FAQ (no Review schema) |
| **Sitemap** | Included via route registry (priority 0.88) |
| **Meta description** | 135 chars |

### Sections published

Executive summary · Methodology · India · Bangladesh · Pakistan · Sri Lanka · Nepal · Crypto/stablecoins · Comparison table · Risk/compliance · Country summary · FAQ · Update policy · Related links

---

## Internal links added

| Page | Link |
|------|------|
| Homepage (`HomeAuthoritySection`) | Report link + body citation |
| `internalSeoLinks` / guides grid | Report card |
| `/compare` hub | Methodology section |
| `/india-casino-payments` | UPI overview |
| `/bangladesh-casino-payments` | Overview |
| `/crypto/usdt-trc20-casino` | TRC-20 table section |
| `/blacklist` | Editorial resources |

---

## Outreach

| Metric | Count |
|--------|-------|
| Ready to send | **10** |
| Actually sent | **0** |
| Responses | **0** |
| Live backlinks | **0** |

Primary asset URL updated in send queue and tracker for Wave 1 targets.  
Docs: `p10-outreach-angles.md`, `p10-wave1-send-log.md`

---

## GSC / backlink data

| Data | Status |
|------|--------|
| GSC metrics | **UNKNOWN** — no owner export |
| Backlink baseline | **UNKNOWN** — no tool access |

Docs: `gsc-baseline-report-p10.md`, `backlink-baseline-p10.md`

---

## Audit suite

| Check | Result |
|-------|--------|
| Title failures | 0 |
| Meta failures (>160 / missing) | 0 |
| Thin indexable pages | 0 |
| Review schema pillars | 33/33 |
| Unexpected Review schema | 0 (report has Article, not Review) |
| Entity schema | PASS |
| `/go/*` policy | Preserved |

---

## Performance

| Metric | Value |
|--------|-------|
| Homepage First Load JS | **108 kB** (no regression) |
| Report page | Server-rendered static; minimal JS |

---

## Live validation

See [live-validation.txt](./live-validation.txt)

- Homepage, report, hubs, compare: **200**
- WWW: **301**
- `/go/stake`: **307** + noindex,nofollow
- llms.txt: **200**
- Sitemap includes report (single entry)

---

## Remaining manual actions

1. **Send Wave 1 outreach** — 10 targets; mark SENT only after actual dispatch
2. **GSC login** — capture first real Performance/Coverage export
3. **Ahrefs/Semrush** — first referring domain baseline
4. **GSC URL Inspection** — request indexing for report page
5. **Git push** — configure SSH key

---

## Recommended P11 sprint

1. Execute sends (GamCare + RGC first) with report URL
2. Log SENT/REPLIED/LINK_LIVE in tracker
3. GSC week-1 real data → replace UNKNOWN rows
4. Wave 2 outreach (Gambling Therapy, CoinGape, iGaming Business)
5. Monitor report page indexing and first external citations
6. Optional PDF export of report for email attachments
