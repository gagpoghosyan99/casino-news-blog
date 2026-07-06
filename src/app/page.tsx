import HomeAuthoritySection from "@/components/home/HomeAuthoritySection";
import HomeBelowFoldWidgets from "@/components/home/HomeBelowFoldWidgets";
import InternalSeoGuidesSection from "@/components/home/InternalSeoGuidesSection";
import PremiumHeroShell from "@/components/home/PremiumHeroShell";
import TrustPillars from "@/components/home/TrustPillars";
import ResponsibleGamblingSection from "@/components/home/ResponsibleGamblingSection";

export default function HomePage() {
  return (
    <>
      <PremiumHeroShell />
      <TrustPillars />
      <InternalSeoGuidesSection />
      <HomeAuthoritySection />
      <HomeBelowFoldWidgets />
      <ResponsibleGamblingSection />
    </>
  );
}
