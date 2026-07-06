"use client";

import LegalPage from "@/components/LegalPage";
import { useLocale } from "@/context/LocaleContext";
import { ABOUT_PATH, EDITORIAL_POLICY_PATH, RESPONSIBLE_GAMBLING_PATH, BLACKLIST_PATH, responsibleGamblingPage } from "@/data/legal";
import { HOW_WE_REVIEW_PATH } from "@/data/how-we-review";
import { hubDiscoveryLinks } from "@/data/entity-trust-links";

export default function ResponsibleGamblingPageClient() {
  const { locale } = useLocale();

  return (
    <LegalPage
      document={responsibleGamblingPage[locale]}
      relatedLinks={[
        { href: ABOUT_PATH, label: "About CasinoPulse" },
        { href: HOW_WE_REVIEW_PATH, label: "How We Review Online Casinos" },
        { href: EDITORIAL_POLICY_PATH, label: "Editorial Policy" },
        { href: "/editorial-team", label: "Editorial Team" },
        { href: BLACKLIST_PATH, label: "Casino Blacklist" },
        { href: "/contact", label: "Contact" },
        ...hubDiscoveryLinks.slice(0, 4).map((link) => ({ href: link.href, label: link.label })),
      ]}
    />
  );
}
