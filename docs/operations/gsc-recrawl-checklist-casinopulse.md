# GSC Recrawl Checklist — CasinoPulse

Use after deploying SEO hardening commits (`563c570`, `a1a7672`, and subsequent fixes).

## 1. Submit sitemap (again)

- URL: `https://casinopuls.site/sitemap.xml`
- GSC → **Sitemaps** → submit `sitemap.xml`
- Confirm: **72** indexable URLs, no `/go/*`, no `www.`, no query strings

## 2. URL Inspection — request indexing

Inspect each URL below. If status is valid and canonical is `https://casinopuls.site/...`, click **Request indexing**.

| URL | Purpose |
|-----|---------|
| `https://casinopuls.site/` | Homepage authority |
| `https://casinopuls.site/blogs` | Reviews hub |
| `https://casinopuls.site/casinos` | Directory |
| `https://casinopuls.site/compare` | Comparison hub |
| `https://casinopuls.site/blogs/review-stake` | Pillar review |
| `https://casinopuls.site/blogs/review-bc-game` | Pillar review |
| `https://casinopuls.site/blogs/review-roobet` | Pillar review |
| `https://casinopuls.site/blogs/review-rollbit` | Pillar review |
| `https://casinopuls.site/blogs/review-pin-up-casino` | Pillar review |
| `https://casinopuls.site/blogs/avoid-vave` | Caution pillar |
| `https://casinopuls.site/blogs/avoid-mostbet` | Caution pillar |
| `https://casinopuls.site/payment/jazzcash` | Pakistan payment |
| `https://casinopuls.site/payment/easypaisa` | Pakistan payment |
| `https://casinopuls.site/pakistan-casino-payments` | Country hub |
| `https://casinopuls.site/sitemap.xml` | Sitemap discovery |

## 3. Validate fixed GSC issues

In **Page indexing** and **Core Web Vitals**, confirm:

- [ ] No spike in “Duplicate without user-selected canonical” for www URLs
- [ ] `/go/*` not appearing as indexed (should be excluded via `noindex` + not in sitemap)
- [ ] Brief news articles (`news-2`…`news-9`) remain excluded (`noindex`)
- [ ] Canonical tags point to non-www HTTPS

## 4. Timing expectations

- **3–7 days:** Google recrawls priority URLs after indexing requests
- **7–14 days:** Semrush/GSC warning counts may lag behind live fixes
- **Do not panic** if indexed page counts fluctuate during recrawl — focus on URL Inspection canonical and coverage status

## 5. Do not

- Remove `/go/*` noindex/nofollow policy
- Add www URLs to sitemap
- Force-index brief news or daily blog stubs
- Request indexing for affiliate redirect URLs

## 6. Monitoring cadence

| Day | Action |
|-----|--------|
| Day 0 | Submit sitemap, request indexing for table URLs |
| Day 3 | Re-check 5 priority URLs in URL Inspection |
| Day 7 | Review GSC coverage + Semrush delta |
| Day 14 | Close sprint if warnings are acceptable false positives only |
