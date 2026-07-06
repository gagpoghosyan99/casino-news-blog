"use client";

import LegalPage from "@/components/LegalPage";
import { useLocale } from "@/context/LocaleContext";
import {
  ABOUT_PATH,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_TEAM_PATH,
  RESPONSIBLE_GAMBLING_PATH,
  BLACKLIST_PATH,
  editorialTeamPage,
} from "@/data/legal";
import { HOW_WE_REVIEW_PATH } from "@/data/how-we-review";
import { hubDiscoveryLinks } from "@/data/entity-trust-links";

export default function EditorialTeamClient() {
  const { locale } = useLocale();

  return (
    <LegalPage
      document={editorialTeamPage[locale]}
      relatedLinks={[
        { href: "/author/casinopulse-editorial-team", label: "Author profile" },
        { href: ABOUT_PATH, label: "About CasinoPulse" },
        { href: HOW_WE_REVIEW_PATH, label: "How We Review" },
        { href: EDITORIAL_POLICY_PATH, label: "Editorial Policy" },
        { href: RESPONSIBLE_GAMBLING_PATH, label: "Responsible Gambling" },
        { href: BLACKLIST_PATH, label: "Casino Blacklist" },
        { href: "/contact", label: "Contact" },
        ...hubDiscoveryLinks.map((link) => ({ href: link.href, label: link.label })),
      ]}
    />
  );
}
