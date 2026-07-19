"use client";

import { useEffect } from "react";
import PartnersStickyNav from "@/components/partners/PartnersStickyNav";
import {
  EditorialIndependence,
  PartnerDashboardPreview,
  PlayerBenefits,
  PlayerJourney,
  PlayerOffersSection,
  ReferralProgram,
} from "@/components/partners/PlayerSections";
import PartnersFAQ, { PartnersFinalCTA } from "@/components/partners/PartnersFAQ";
import { customerPartnersNav } from "@/data/partners/content";

export default function CustomerPartnersClient() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  return (
    <div className="pt-[88px] md:pt-[132px] lg:pt-[88px]">
      <PartnersStickyNav items={customerPartnersNav} ariaLabel="Customer partner sections" />
      <PlayerBenefits />
      <PlayerJourney />
      <PlayerOffersSection />
      <ReferralProgram />
      <EditorialIndependence />
      <PartnerDashboardPreview />
      <PartnersFAQ audience="player" />
      <PartnersFinalCTA variant="customer" />
    </div>
  );
}
