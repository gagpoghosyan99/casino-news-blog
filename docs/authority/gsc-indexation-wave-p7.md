# GSC Indexation Wave P7

Updated: 2026-07-07

## Objective

Accelerate discovery and indexing of canonical URLs via Google Search Console — **without claiming indexing until manually verified**.

## Package files

- URL list: [gsc-url-submission-list-p7.csv](./gsc-url-submission-list-p7.csv) (63 URLs)
- Scoreboard: [authority-scoreboard.md](./authority-scoreboard.md)

## Priority tiers

| Tier | URLs | Action |
|------|------|--------|
| **1** | Homepage, /casinos, /compare, /blacklist, /how-we-review, /editorial-team | Inspect + Request indexing first |
| **2** | All 33 pillar reviews (`/blogs/review-*`) | Inspect top 10 by business value; batch monitor |
| **3** | Crypto guides + country payment hubs | Sitemap reliance + spot inspect |
| **4** | Payment method guides | Sitemap reliance + monthly inspect sample |

## Manual GSC workflow

### Step 1 — Sitemap
1. Open [Google Search Console](https://search.google.com/search-console) → property `casinopuls.site`
2. **Sitemaps** → submit `https://casinopuls.site/sitemap.xml`
3. Confirm "Success" status (already submitted in prior sprints — re-submit after P7 deploy)

### Step 2 — Tier 1 inspection
For each Tier 1 URL:
1. **URL Inspection** → enter URL
2. Confirm "URL is on Google" or note "Discovered — not indexed"
3. If eligible: **Request indexing**
4. Record `Submitted Date` in CSV (manual)

### Step 3 — Tier 2 pillar sample
Inspect **10 highest-value** pillar reviews (Stake, BC.Game, Roobet, Bet365, 1xBet, Melbet, Parimatch, Mostbet, 22Bet, Betway — adjust by traffic priority):

1. URL Inspection
2. Request indexing if not indexed
3. Check **Rich results** tab for Review schema

### Step 4 — Weekly monitoring (ongoing)

| Check | Frequency | Record in |
|-------|-----------|-----------|
| Coverage report | Weekly | authority-scoreboard.md |
| Review rich results | Weekly | gsc-url-submission-list-p7.csv Rich Result column |
| Indexed page count | Weekly | authority-scoreboard.md |
| Manual actions | Weekly | authority-scoreboard.md |

### Step 5 — Record indexed dates
When URL Inspection shows **Indexed**, enter date in CSV `Indexed Date` column. Do not estimate.

## Current status (honest baseline)

| Field | Value |
|-------|-------|
| GSC export available on server | **No** |
| Indexed pages | **UNKNOWN** |
| Rich result status | **UNKNOWN** (verify per URL in GSC) |
| Sitemap URL count (canonical) | 83 |

## Notes

- `/go/*` must remain **noindex** — do not request indexing
- News articles may be noindex per policy — exclude from manual requests
- Checklist reviews (7 pages) have **no Review schema** — do not expect review rich results
