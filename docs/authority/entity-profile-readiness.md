# Entity Profile Readiness

Updated: 2026-07-07

**Policy:** Do **not** add `sameAs` schema until real, maintained profiles exist and are live.

## Recommended profiles (maintain-only)

### LinkedIn Company Page
| Field | Recommendation |
|-------|----------------|
| **Purpose** | Editorial brand credibility, team updates, methodology posts |
| **Bio** | CasinoPulse is an editorial casino review and payments guide site for South Asian readers. We publish structured reviews, payment hubs, and responsible gambling resources — not an operator. |
| **Canonical URL** | https://casinopuls.site |
| **Logo** | `/og-default.png` or brand mark from site assets |
| **Posting cadence** | 1–2 posts/month (methodology, payment guide launches) |
| **Add sameAs later?** | Yes, when page is live and maintained |

### X (Twitter) Profile
| Field | Recommendation |
|-------|----------------|
| **Purpose** | Short updates on guide refreshes, RG reminders |
| **Bio** | Editorial casino reviews & South Asia payment guides. Not an operator. Responsible gambling: casinopuls.site/responsible-gambling |
| **Canonical URL** | https://casinopuls.site |
| **Logo** | Same as site favicon/apple-touch icon |
| **Posting cadence** | 2–4 posts/month max; quality over volume |
| **Add sameAs later?** | Yes, when active |

### Medium Publication
| Field | Recommendation |
|-------|----------------|
| **Purpose** | Long-form republishing of payment/crypto educational excerpts |
| **Bio** | CasinoPulse Editorial — independent reviews and payment guides for South Asian players. |
| **Canonical URL** | https://casinopuls.site |
| **Logo** | Site OG image |
| **Posting cadence** | 1 article/month (canonical links back to site) |
| **Add sameAs later?** | Optional — only if publication is actively maintained |

### GitHub Organization / Profile Reference
| Field | Recommendation |
|-------|----------------|
| **Purpose** | Optional — open-source audit scripts or llms.txt reference repo |
| **Bio** | CasinoPulse editorial tooling and SEO audit scripts (if published) |
| **Canonical URL** | https://casinopuls.site |
| **Logo** | N/A unless org created |
| **Posting cadence** | As needed for public scripts only |
| **Add sameAs later?** | Only if public org exists |

### YouTube Channel
| Field | Recommendation |
|-------|----------------|
| **Purpose** | **Defer** unless video content is planned |
| **Bio** | N/A until video strategy exists |
| **Canonical URL** | https://casinopuls.site |
| **Logo** | N/A |
| **Posting cadence** | Do not create until editorial video workflow exists |
| **Add sameAs later?** | No — skip until video plan approved |

## Schema status

| Item | Status |
|------|--------|
| Organization schema (logo, contactPoint) | **Live** (P5) |
| sameAs social URLs | **Not added** — no verified live profiles |
| Entity trust cross-links on site | **Live** |

## Next steps (manual)

1. Decide which profiles will be actively maintained (recommend LinkedIn + X only)
2. Create profiles with consistent naming: **CasinoPulse**
3. Link to https://casinopuls.site in each bio
4. After 30 days of maintenance, add `sameAs` array to entity schema in `src/lib/seo/schema.ts`

## Do not

- Invent profile URLs in schema
- Auto-generate social profiles without owner approval
- Link to inactive or placeholder accounts
