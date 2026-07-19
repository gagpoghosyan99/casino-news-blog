"use client";

import { useEffect } from "react";
import PartnersBackLink from "@/components/partners/PartnersBackLink";
import {
  EditorialIndependence,
  PartnerDashboardPreview,
  PlayerBenefits,
  PlayerJourney,
  PlayerOffersSection,
  ReferralProgram,
} from "@/components/partners/PlayerSections";
import PartnersFAQ, { PartnersFinalCTA } from "@/components/partners/PartnersFAQ";

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
      <PartnersBackLink label="Customer path" />
      <PlayerBenefits />
      <PlayerJourney />
      <PlayerOffersSection />
      <ReferralProgram />
      <EditorialIndependence />
      <PartnerDashboardPreview />
      <PartnersFAQ audience="player" />
      <PartnersFinalCTA variant="customer" />
    </>
  );
}
