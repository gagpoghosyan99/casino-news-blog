import type { NextConfig } from "next";

/** Legacy review-* URLs that now canonicalize to avoid-* caution reviews. */
const legacyAvoidRedirects = [
  "1xbet",
  "melbet",
  "mostbet",
  "parimatch",
  "22bet",
  "betwinner",
  "vave",
  "wild-casino",
  "bovada",
];

function buildLegacyBlogRedirects() {
  const redirects: { source: string; destination: string; permanent: boolean }[] = [
    {
      source: "/blogs/review-pokerstars",
      destination: "/blogs/review-pokerstars-casino",
      permanent: true,
    },
  ];

  for (const slug of legacyAvoidRedirects) {
    redirects.push({
      source: `/blogs/review-${slug}`,
      destination: `/blogs/avoid-${slug}`,
      permanent: true,
    });
  }

  return redirects;
}

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return buildLegacyBlogRedirects();
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
