import InternalSeoGuidesSection from "@/components/home/InternalSeoGuidesSection";
import LandingHero from "@/components/landing/LandingHero";
import TrustIndicators from "@/components/landing/TrustIndicators";
import CasinoRankingTable from "@/components/landing/CasinoRankingTable";
import JackpotWinners from "@/components/landing/JackpotWinners";
import CasinoNews from "@/components/landing/CasinoNews";
import BonusPromotions from "@/components/landing/BonusPromotions";
import CryptoCasinoGuide from "@/components/landing/CryptoCasinoGuide";
import BlacklistSection from "@/components/landing/BlacklistSection";
import LandingResponsibleGambling from "@/components/landing/LandingResponsibleGambling";

export default function HomePage() {
  return (
    <div className="zb-page-bg">
      <LandingHero />
      <TrustIndicators />
      <CasinoRankingTable />
      <JackpotWinners />
      <CasinoNews />
      <BonusPromotions />
      <CryptoCasinoGuide />
      <BlacklistSection />
      <InternalSeoGuidesSection />
      <LandingResponsibleGambling />
    </div>
  );
}
