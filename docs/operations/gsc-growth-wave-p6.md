# GSC Growth Wave — P6

Updated: 2026-07-07

Property: `https://casinopuls.site` (non-www canonical)

## Tier 1 — Request indexing first

| URL | Priority | Notes |
|-----|----------|-------|
| `/` | Critical | Homepage — verify meta 145 chars, llms.txt linked internally |
| `/casinos` | Critical | Directory hub |
| `/compare` | High | Comparison hub |
| `/blacklist` | High | Risk assessments |
| `/how-we-review` | High | Methodology / E-E-A-T |
| `/editorial-team` | High | Entity trust |
| `/about` | Medium | Entity trust |
| `/llms.txt` | Medium | New P5 asset — URL inspection |

**Action:** URL Inspection → Request indexing → monitor within 7 days.

## Tier 2 — Pillar reviews + authority clusters

### 33 pillar reviews (29 existing + 4 P6)

New P6 pillars — request indexing after deploy:

- `/blogs/review-betus`
- `/blogs/review-fanduel-casino`
- `/blogs/review-jackbit`
- `/blogs/review-shuffle`

All pillar reviews (`/blogs/review-*` and caution pillars `/blogs/avoid-*` with Review schema): batch inspect 5–10 per day to avoid quota limits.

### Crypto guides (10)

`/crypto/bitcoin-casino` through `/crypto/usdt-erc20-casino`

### Country hubs (7)

India, Bangladesh, Pakistan, Sri Lanka, Nepal, Philippines, Nigeria payment hubs.

## Tier 3 — Payment guides

`/payment/upi`, `/payment/phonepe`, `/payment/imps`, `/payment/paytm`, `/payment/bkash`, `/payment/nagad`, `/payment/jazzcash`, `/payment/easypaisa`

## Checklist pages (P6 — no Review schema)

Request indexing after content upgrade:

- `/blogs/avoid-7bit-casino`
- `/blogs/avoid-casino-extreme`
- `/blogs/avoid-fairspin`
- `/blogs/avoid-megapari`
- `/blogs/avoid-mystake`
- `/blogs/avoid-nitrobetting`
- `/blogs/avoid-rabona`

## Recrawl sequence

1. Submit sitemap (`/sitemap.xml`) — confirm 83+ URLs
2. Tier 1 manual inspection (day 1)
3. Tier 2 pillars + hubs (days 2–5)
4. Tier 3 payments + checklist pages (days 6–10)
5. Re-check Coverage report for "Discovered — currently not indexed"

## Monitoring schedule

| Frequency | Check |
|-----------|-------|
| Daily (week 1) | Indexing status on Tier 1 + 4 new pillars |
| Weekly | Impressions/clicks on payment hubs and top reviews |
| Bi-weekly | Rich result reports (Review, FAQ, Breadcrumb) |
| Monthly | Referring domains vs link-building roadmap |

## Do not request indexing

- `/go/*` affiliate redirects
- `/news/*` noindex briefs
- Query-string URLs

## Success signals

- Tier 1 URLs indexed within 7 days
- New pillar reviews appearing for brand queries
- FAQ/Breadcrumb rich results stable (no errors spike)
- Impression growth on country hub queries
