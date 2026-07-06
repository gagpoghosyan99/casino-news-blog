# CasinoPulse Content Model Inventory — P4 Authority Expansion

Audited: 2026-07-06

## Review data source

| Layer | Path | Role |
|-------|------|------|
| Casino directory | `src/data/casinos.ts` | `allCasinos` — slug, blogSlug, rating, type |
| Blog posts | `src/data/blogs.ts` | Auto-generates posts from casinos + `pillarReviewOverrides` |
| Pillar overrides | `src/data/pillar-reviews.ts` | Full pillar content via `profiles[]` → `buildPillarReviewEn()` |
| P4 expansion | `src/data/pillar-reviews-p4-profiles.ts` | New pillar profiles merged into `profiles[]` |

## Blog route implementation

| File | Behavior |
|------|----------|
| `src/app/blogs/[slug]/page.tsx` | SSG all blog slugs; metadata via `buildPageMetadata`; Review schema if `isPillarReviewSlug` |
| `src/components/BlogContent.tsx` | Renders markdown body; parses `[text](/path)` links; affiliate `/go/*` CTAs |

## Pillar review detection

```text
src/data/pillar-reviews.ts → PILLAR_REVIEW_SLUGS / isPillarReviewSlug(slug)
```

Only slugs in `profiles[]` receive pillar overrides and Review schema gating.

## Review schema gating

```text
src/app/blogs/[slug]/page.tsx
  isPillar = isPillarReviewSlug(slug)
  reviewJsonLd = isCasinoReview && casino && isPillar ? reviewSchema(...) : null
```

Checklist reviews (non-pillar) never emit Review schema.

## Sitemap generation

```text
src/lib/seo/sitemap-config.ts → buildFullSitemap()
  - buildStaticSitemapRoutes()
  - buildProgrammaticSitemapRoutes() ← getAllRegistryRoutes()
  - buildBlogSitemapRoutes() ← blogPosts indexable
  - buildNewsSitemapRoutes()
```

## Internal linking components

| Component | Links |
|-----------|-------|
| `BlogContent.tsx` | Inline markdown links in review body |
| `ProgrammaticPageLayout.tsx` | relatedLinks footer cluster |
| `CasinoDirectory.tsx` | RESOURCE_LINKS + SSR guide sections |
| `Footer.tsx` / `InternalSeoGuidesSection.tsx` | `internal-seo-links.ts` |
| `buildPillarReviewEn()` | Regional Payment & Comparison Resources block |

## Payment guide data source

```text
src/data/programmatic/payment-pages.ts → paymentPages[]
Route: src/app/payment/[slug]/page.tsx
```

## Crypto guide data source

```text
src/data/programmatic/crypto-pages.ts → cryptoPages[]
Route: src/app/crypto/[slug]/page.tsx
```

## Country hub data source

```text
src/data/programmatic/hub-pages.ts → hubPages[]
Routes: src/app/{slug}/page.tsx (static per hub)
Registry: src/lib/seo/route-registry.ts → hubRoutes()
```

## Schema helpers

```text
src/lib/seo/schema.ts — reviewSchema, breadcrumbSchema, faqPageSchema
src/lib/seo/programmatic-page-schema.ts — buildProgrammaticPageJsonLd()
```

## Prebuild validation

```text
scripts/seo/validate-generated-routes.ts
scripts/seo/validate-internal-discovery.ts
scripts/seo/validate-brand-entity.ts
```
