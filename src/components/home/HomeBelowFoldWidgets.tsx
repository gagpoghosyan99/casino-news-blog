"use client";

import dynamic from "next/dynamic";

const JackpotWinnersFeed = dynamic(() => import("@/components/home/JackpotWinnersFeed"), {
  loading: () => <section className="bg-navy-900 py-20" aria-hidden />,
  ssr: false,
});

const TrendingNewsSection = dynamic(() => import("@/components/home/TrendingNewsSection"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
  ssr: false,
});

const HomeBlogPreview = dynamic(() => import("@/components/home/HomeBlogPreview"), {
  loading: () => <section className="bg-navy-900 py-16" aria-hidden />,
  ssr: false,
});

const TopCasinosWidget = dynamic(() => import("@/components/home/TopCasinosWidget"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
  ssr: false,
});

const BlacklistedCasinosSection = dynamic(
  () => import("@/components/home/BlacklistedCasinosSection"),
  { loading: () => <section className="bg-navy-900 py-16" aria-hidden />, ssr: false }
);

const BonusTracker = dynamic(() => import("@/components/home/BonusTracker"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
  ssr: false,
});

export default function HomeBelowFoldWidgets() {
  return (
    <>
      <JackpotWinnersFeed />
      <TrendingNewsSection />
      <HomeBlogPreview />
      <TopCasinosWidget />
      <BlacklistedCasinosSection />
      <BonusTracker />
    </>
  );
}
