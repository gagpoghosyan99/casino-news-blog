import dynamic from "next/dynamic";
import HomeAuthoritySection from "@/components/home/HomeAuthoritySection";
import InternalSeoGuidesSection from "@/components/home/InternalSeoGuidesSection";
import PremiumHero from "@/components/home/PremiumHero";
import TrustPillars from "@/components/home/TrustPillars";
import ResponsibleGamblingSection from "@/components/home/ResponsibleGamblingSection";

const JackpotWinnersFeed = dynamic(() => import("@/components/home/JackpotWinnersFeed"), {
  loading: () => <section className="bg-navy-900 py-20" aria-hidden />,
});

const TrendingNewsSection = dynamic(() => import("@/components/home/TrendingNewsSection"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
});

const HomeBlogPreview = dynamic(() => import("@/components/home/HomeBlogPreview"), {
  loading: () => <section className="bg-navy-900 py-16" aria-hidden />,
});

const TopCasinosWidget = dynamic(() => import("@/components/home/TopCasinosWidget"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
});

const BlacklistedCasinosSection = dynamic(
  () => import("@/components/home/BlacklistedCasinosSection"),
  { loading: () => <section className="bg-navy-900 py-16" aria-hidden /> }
);

const BonusTracker = dynamic(() => import("@/components/home/BonusTracker"), {
  loading: () => <section className="bg-navy-950 py-16" aria-hidden />,
});

export default function HomePage() {
  return (
    <>
      <PremiumHero />
      <TrustPillars />
      <JackpotWinnersFeed />
      <TrendingNewsSection />
      <InternalSeoGuidesSection />
      <HomeAuthoritySection />
      <HomeBlogPreview />
      <TopCasinosWidget />
      <BlacklistedCasinosSection />
      <BonusTracker />
      <ResponsibleGamblingSection />
    </>
  );
}
