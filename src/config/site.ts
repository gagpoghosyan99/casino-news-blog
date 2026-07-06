export const siteConfig = {
  name: "CasinoPulse",
  codename: "CasinoPulse",
  tagline: "Casino Reviews, Crypto Guides & Safety Resources for South Asia",
  description:
    "Independent casino reviews, crypto casino guides, payment methods, blacklist reports, and responsible gambling resources for South Asian players.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://casinopuls.site",
  locale: "en",
  regions: ["BD", "IN", "PK", "LK", "GLOBAL"] as const,
  legal: {
    minAge: 18,
    affiliateDisclosure: true,
  },
} as const;

export type SiteRegion = (typeof siteConfig.regions)[number];
