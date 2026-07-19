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
    <>
      <PartnersStickyNav items={customerPartnersNav} path="customer" />
      <PlayerBenefits />
      <PlayerJourney />
      <PlayerOffersSection />
      <ReferralProgram />
      <EditorialIndependence />
      <PartnerDashboardPreview />
      <PartnersFAQ audience="player" />
      <PartnersFinalCTA variant="customer" />
      <div className="h-8 md:hidden" aria-hidden />
    </>
  );
}
