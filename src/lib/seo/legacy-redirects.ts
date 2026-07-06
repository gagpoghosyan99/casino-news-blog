/** Slugs with avoid-* canonical blog URLs (legacy review-* paths redirect here). */
export const LEGACY_AVOID_CASINO_SLUGS = [
  "1xbet",
  "melbet",
  "mostbet",
  "parimatch",
  "22bet",
  "betwinner",
  "vave",
  "wild-casino",
  "bovada",
] as const;

export function buildLegacyBlogRedirects() {
  const redirects: { source: string; destination: string; permanent: boolean }[] = [
    {
      source: "/blogs/review-pokerstars",
      destination: "/blogs/review-pokerstars-casino",
      permanent: true,
    },
  ];

  for (const slug of LEGACY_AVOID_CASINO_SLUGS) {
    redirects.push({
      source: `/blogs/review-${slug}`,
      destination: `/blogs/avoid-${slug}`,
      permanent: true,
    });
  }

  return redirects;
}
