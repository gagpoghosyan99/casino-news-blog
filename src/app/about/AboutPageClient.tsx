"use client";

import LegalPage from "@/components/LegalPage";
import { useLocale } from "@/context/LocaleContext";
import { aboutPage } from "@/data/legal";
import { fullEntityTrustLinks } from "@/data/entity-trust-links";

export default function AboutPageClient() {
  const { locale } = useLocale();

  return (
    <LegalPage
      document={aboutPage[locale]}
      kicker="About ZEONEBET"
      relatedLinks={fullEntityTrustLinks.map((link) => ({ href: link.href, label: link.label }))}
    />
  );
}
