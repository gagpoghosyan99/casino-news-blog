# CasinoPulse Homepage Performance Audit
Audited: 2026-07-06T22:02:21.718Z
Base URL: https://casinopuls.site
## Live homepage
- HTTP status: 200
- HTML size: 126.9 KB
- External script tags: 12
- Inline script blocks: 28
- Stylesheets: 1
- Inline style blocks: 0
- Image tags in HTML: 10
- Google Analytics (gtag): yes (afterInteractive)
### Script sources
- /_next/static/chunks/4bd1b696-f785427dddbba9fb.js
- /_next/static/chunks/1255-b28ea36bf0cdbd65.js
- /_next/static/chunks/main-app-2d7585aca8ec7640.js
- /_next/static/chunks/2619-3c9e02e22d10480a.js
- /_next/static/chunks/7553-e42ae7ab40fac0ec.js
- /_next/static/chunks/app/layout-486c9610c6af57a2.js
- /_next/static/chunks/9228-8559a10356e71fc1.js
- /_next/static/chunks/1752-67f84a8fbcdde7c4.js
- /_next/static/chunks/3970-5a6d37442f1d8424.js
- /_next/static/chunks/app/page-5a70616012c87378.js
- /_next/static/chunks/polyfills-42372ed130431b0a.js
- /_next/static/chunks/webpack-9fd9461f40a9c182.js
## Build artifacts
- .next total size: 304M
- Client component files (sample): 40
### Largest JS chunks (top 20)
| File | Size |
|------|------|
| .next/static/chunks/app/page-5a70616012c87378.js | 225.2 KB |
| .next/static/chunks/framework-4731550a751206fc.js | 185.3 KB |
| .next/static/chunks/1255-b28ea36bf0cdbd65.js | 169.3 KB |
| .next/static/chunks/4bd1b696-f785427dddbba9fb.js | 169.0 KB |
| .next/static/chunks/main-2a080a83f4907be6.js | 125.4 KB |
| .next/static/chunks/9228-8559a10356e71fc1.js | 119.4 KB |
| .next/static/chunks/polyfills-42372ed130431b0a.js | 110.0 KB |
| .next/static/chunks/3970-5a6d37442f1d8424.js | 34.3 KB |
| .next/static/chunks/app/layout-486c9610c6af57a2.js | 21.0 KB |
| .next/static/chunks/7553-e42ae7ab40fac0ec.js | 20.4 KB |
| .next/static/chunks/app/news/page-976b69ad2d7b353e.js | 20.2 KB |
| .next/static/chunks/1752-67f84a8fbcdde7c4.js | 18.8 KB |
| .next/static/chunks/2619-3c9e02e22d10480a.js | 8.3 KB |
| .next/static/chunks/app/blogs/[slug]/page-ed83de211b692709.js | 4.0 KB |
| .next/static/chunks/app/editorial-team/page-748a81e7588550de.js | 3.7 KB |
| .next/static/chunks/app/responsible-gambling/page-f4581575cc128d9d.js | 3.7 KB |
| .next/static/chunks/app/about/page-586e50a0a5293f26.js | 3.4 KB |
| .next/static/chunks/webpack-9fd9461f40a9c182.js | 3.3 KB |
| .next/static/chunks/app/contact/page-c1d5af13dac6f081.js | 3.0 KB |
| .next/static/chunks/app/blogs/page-25341ae7eebf4a1d.js | 2.7 KB |
## Client component hotspots
- `src/components/Footer.tsx`
- `src/components/CasinoCategoryBanners.tsx`
- `src/components/Header.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/news/NewsHero.tsx`
- `src/components/news/NewsTrustBar.tsx`
- `src/components/news/NewsSidebar.tsx`
- `src/components/news/NewsCard.tsx`
- `src/components/news/NewsCategoryFilter.tsx`
- `src/components/news/NewsArenaHero.tsx`
- `src/components/FeaturedSection.tsx`
- `src/components/Hero.tsx`
- `src/components/LegalPage.tsx`
- `src/components/CasinoCard.tsx`
- `src/components/HomeCasinoPreview.tsx`
- ... and 25 more
## JavaScript error findings
Headless console reproduction was not run in this audit pass. Observations:
- Homepage uses multiple client components (locale, cookie consent, interactive widgets).
- Google Analytics loads via `next/script` with `afterInteractive` — acceptable for measurement.
- No risky bundle surgery performed in P5; focus was audit and documentation.
## Recommendations (non-breaking)
1. Lazy-load below-the-fold homepage widgets (JackpotWinnersFeed, BonusTracker) if LCP regresses.
2. Audit `use client` on LegalPage — required for locale but adds hydration on trust pages.
3. Preconnect to `googletagmanager.com` only if analytics is mandatory.
4. Ensure hero images use explicit width/height and modern formats where added.
5. Re-run Lighthouse after deploy for Core Web Vitals baseline.
## Third-party scripts
- Google Tag Manager / gtag (`G-D9E947T20R`) — loaded afterInteractive in root layout.