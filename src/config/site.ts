export const siteConfig = {
  name: "ZeoneBet",
  codename: "ZeoneBet",
  tagline: "Casino Reviews, Crypto Guides & Safety Resources for South Asia",
  description:
    "Independent casino reviews, crypto casino guides, payment methods, blacklist reports, and responsible gambling resources for South Asian players.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeonebet.com",
  locale: "en",
  regions: ["BD", "IN", "PK", "LK", "GLOBAL"] as const,
  legal: {
    minAge: 18,
    affiliateDisclosure: true,
  },
} as const;

export type SiteRegion = (typeof siteConfig.regions)[number];
