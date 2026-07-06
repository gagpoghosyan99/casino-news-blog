import dynamic from "next/dynamic";
import HomeAuthoritySection from "@/components/home/HomeAuthoritySection";
import InternalSeoGuidesSection from "@/components/home/InternalSeoGuidesSection";
import PremiumHero from "@/components/home/PremiumHero";
import TrustPillars from "@/components/home/TrustPillars";
import TrendingNewsSection from "@/components/home/TrendingNewsSection";
import HomeBlogPreview from "@/components/home/HomeBlogPreview";
import TopCasinosWidget from "@/components/home/TopCasinosWidget";
import BlacklistedCasinosSection from "@/components/home/BlacklistedCasinosSection";
import ResponsibleGamblingSection from "@/components/home/ResponsibleGamblingSection";

const JackpotWinnersFeed = dynamic(() => import("@/components/home/JackpotWinnersFeed"), {
  loading: () => <section className="bg-navy-900 py-20" aria-hidden />,
});

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
