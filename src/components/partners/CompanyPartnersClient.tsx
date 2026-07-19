"use client";

import { useCallback, useEffect, useState } from "react";
import PartnersStickyNav from "@/components/partners/PartnersStickyNav";
import {
  BusinessBenefits,
  BusinessPartnerTypes,
  PartnershipModels,
  PartnershipProcess,
} from "@/components/partners/BusinessSections";
import BusinessInquiryForm, {
  OpportunitySubmission,
} from "@/components/partners/BusinessInquiryForm";
import { MediaKitSection } from "@/components/partners/PlayerSections";
import PartnersFAQ, { PartnersFinalCTA } from "@/components/partners/PartnersFAQ";
import { companyPartnersNav } from "@/data/partners/content";
import type { PartnerInquiryType } from "@/types/partners";

export default function CompanyPartnersClient() {
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
    const hash = window.location.hash.slice(1);
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  return (
    <>
      <PartnersStickyNav items={companyPartnersNav} path="company" />
      <BusinessPartnerTypes onInquire={inquire} />
      <BusinessBenefits />
      <PartnershipModels onCustom={() => inquire("Custom proposal")} />
      <PartnershipProcess />
      <MediaKitSection onRequest={() => inquire("Media Kit")} />
      <OpportunitySubmission onSelect={inquire} />
      <BusinessInquiryForm presetType={presetType} />
      <PartnersFAQ audience="business" />
      <PartnersFinalCTA variant="company" />
    </>
  );
}
