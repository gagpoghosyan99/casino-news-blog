"use client";

import { useCallback, useEffect, useState } from "react";
import PartnersStickyNav from "@/components/partners/PartnersStickyNav";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnersAudienceSelector from "@/components/partners/PartnersAudienceSelector";
import {
  BusinessBenefits,
  BusinessPartnerTypes,
  PartnershipModels,
  PartnershipProcess,
} from "@/components/partners/BusinessSections";
import BusinessInquiryForm, {
  OpportunitySubmission,
} from "@/components/partners/BusinessInquiryForm";
import {
  EditorialIndependence,
  MediaKitSection,
  PartnerDashboardPreview,
  PlayerBenefits,
  PlayerJourney,
  PlayerOffersSection,
  ReferralProgram,
} from "@/components/partners/PlayerSections";
import PartnersFAQ, { PartnersFinalCTA } from "@/components/partners/PartnersFAQ";
import type { PartnerInquiryType } from "@/types/partners";

export default function PartnersPageClient() {
  const [presetType, setPresetType] = useState<PartnerInquiryType | "">("");

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const inquire = useCallback(
    (preset: PartnerInquiryType | string) => {
      setPresetType(preset as PartnerInquiryType);
      window.setTimeout(scrollToContact, 50);
    },
    [scrollToContact]
  );

  useEffect(() => {
    if (window.location.hash === "#contact" || window.location.hash === "#submit-opportunity") {
      const id = window.location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <PartnersStickyNav />
      <PartnersHero />
      <PartnersAudienceSelector />
      <BusinessPartnerTypes onInquire={inquire} />
      <BusinessBenefits />
      <PartnershipModels onCustom={() => inquire("Custom proposal")} />
      <PartnershipProcess />
      <MediaKitSection onRequest={() => inquire("Media Kit")} />
      <OpportunitySubmission onSelect={inquire} />
      <BusinessInquiryForm presetType={presetType} />
      <PlayerBenefits />
      <PlayerJourney />
      <PlayerOffersSection />
      <ReferralProgram />
      <EditorialIndependence />
      <PartnerDashboardPreview />
      <PartnersFAQ />
      <PartnersFinalCTA />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#04060d]/95 p-3 backdrop-blur-xl md:hidden">
        <div className="flex gap-2">
          <a href="#for-businesses" className="zb-btn-gold flex-1 !py-2.5 text-center text-xs">
            Company Partners
          </a>
          <a
            href="#for-players"
            className="flex flex-1 items-center justify-center rounded-full border border-gold-400/40 bg-white/5 !py-2.5 text-center text-xs font-semibold text-gold-200"
          >
            Customer Partners
          </a>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
