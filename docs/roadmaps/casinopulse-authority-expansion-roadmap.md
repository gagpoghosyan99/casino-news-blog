# CasinoPulse Authority Expansion Roadmap

Prioritized content plan — **no mass low-quality generation**. Each URL must meet pillar depth, internal linking, and schema gating before indexation.

---

## Priority A — Expand thin reviews to pillar (10 pages)

| URL | Target keyword | Search intent | Parent hub | Internal links needed | Schema | Min words | Index |
|-----|----------------|---------------|------------|----------------------|--------|-----------|-------|
| `/blogs/review-draftkings-casino` | DraftKings casino review | Brand + safety research | `/casinos`, `/compare` | 5 reviews, UPI/crypto guides, India hub | Review (after pillar) | 1,500 | index |
| `/blogs/review-fanduel-casino` | FanDuel casino review | Brand comparison | `/casinos`, `/compare` | 5 reviews, payment guides, methodology | Review | 1,500 | index |
| `/blogs/review-bitcasino` | Bitcasino review crypto | Crypto casino evaluation | `/crypto/bitcoin-casino` | 5 crypto reviews, USDT/BTC guides | Review | 1,500 | index |
| `/blogs/review-sportsbet-io` | Sportsbet.io review | Crypto sportsbook+casino | `/compare` | 5 reviews, crypto trio, country hubs | Review | 1,500 | index |
| `/blogs/review-duelbits` | Duelbits review | Gamified crypto casino | `/crypto/usdt-casino` | 5 reviews, compare, RG link | Review | 1,500 | index |
| `/blogs/review-gamdom` | Gamdom review | Crypto originals focus | `/compare` | 5 reviews, crypto guides, India hub | Review | 1,500 | index |
| `/blogs/review-tg-casino` | TG Casino review | Telegram casino angle | `/compare` | 5 reviews, caution cross-links | Review | 1,400 | index |
| `/blogs/review-fortunejack` | FortuneJack review | Established crypto brand | `/crypto/bitcoin-casino` | 5 reviews, payment hubs, compare | Review | 1,500 | index |
| `/blogs/review-ignition-casino` | Ignition casino review | Offshore fiat+crypto | `/india-casino-payments` | 5 reviews, IMPS/UPI context | Review | 1,500 | index |
| `/blogs/review-thunderpick` | Thunderpick review | Esports/crypto crossover | `/compare` | 5 reviews, crypto guides, methodology | Review | 1,400 | index |

**Gate:** Add to `pillar-reviews.ts` profiles only after content meets FAQ + trust block + internal matrix.

---

## Priority B — Crypto/payment guides (7 pages)

| URL | Target keyword | Search intent | Parent hub | Internal links needed | Schema | Min words | Index |
|-----|----------------|---------------|------------|----------------------|--------|-----------|-------|
| `/crypto/tron-casino` | TRON casino deposits | Chain-specific how-to | `/crypto/usdt-casino` | BTC/USDT guides, 3 reviews | WebPage + FAQ | 900 | index |
| `/crypto/solana-casino` | Solana casino guide | SOL network safety | `/crypto/bitcoin-casino` | USDT, ETH guides, compare | WebPage + FAQ | 900 | index |
| `/crypto/litecoin-casino` | Litecoin casino LTC | LTC deposit guide | `/crypto/bitcoin-casino` | BTC, USDT, Stake review | WebPage | 800 | index |
| `/crypto/dogecoin-casino` | Dogecoin casino | Meme coin deposits | `/crypto/bitcoin-casino` | USDT, compare, RG | WebPage | 800 | index |
| `/crypto/polygon-casino` | Polygon MATIC casino | L2 deposit guide | `/crypto/ethereum-casino` | ETH, USDT guides | WebPage | 800 | index |
| `/payment/usdt-trc20-casino` | USDT TRC20 casino | Network-specific stablecoin | `/crypto/usdt-casino` | ERC20 sibling, 3 reviews | WebPage + FAQ | 900 | index |
| `/payment/usdt-erc20-casino` | USDT ERC20 casino | Gas fee context | `/crypto/usdt-casino` | TRC20 sibling, ETH guide | WebPage + FAQ | 900 | index |

**Gate:** Register in programmatic route registry; add to sitemap only when `contentQuality: "expanded"`.

---

## Priority C — Country payment hubs (4 pages)

| URL | Target keyword | Search intent | Parent hub | Internal links needed | Schema | Min words | Index |
|-----|----------------|---------------|------------|----------------------|--------|-----------|-------|
| `/sri-lanka-casino-payments` | Sri Lanka casino payments | Regional payment overview | `/blogs` | India hub, crypto guides, 5 reviews | WebPage + FAQ | 1,000 | index |
| `/nepal-casino-payments` | Nepal casino payments | Wallet/bank context | `/india-casino-payments` | UPI/IMPS parallels, compare | WebPage + FAQ | 1,000 | index |
| `/philippines-casino-payments` | Philippines casino payments | GCash/e-wallet context | `/compare` | Crypto guides, 5 reviews | WebPage + FAQ | 1,000 | index |
| `/nigeria-casino-payments` | Nigeria casino payments | Naira/crypto context | `/crypto/bitcoin-casino` | USDT, compare, RG | WebPage + FAQ | 1,000 | index |

**Gate:** Mirror hub-pages pattern (intro, 8+ sections, FAQ, relatedLinks cluster).

---

## Execution rules

1. **One cluster at a time** — finish internal links before publishing.
2. **No index until expanded** — checklist pages stay `noindex` or omit Review schema.
3. **Reuse programmatic layout** — do not invent new URL patterns.
4. **Refresh `lastReviewed`** on material payment changes.
5. **Do not add `/go/*` to sitemap, breadcrumbs, or schema ItemList.**

---

## Success metrics (90 days)

- Pillar count: 20 → 30
- Programmatic URLs: 72 → 90+
- Internal link matrix: 100% pillar pass
- GSC indexed pages aligned with sitemap count (± brief news excluded)
