import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLdScripts } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact CasinoPulse",
  description:
    "Contact CasinoPulse for editorial corrections, partnership inquiries, or general questions about our casino reviews and South Asia guides.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const pageUrl = `${siteConfig.url}/contact`;
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Contact", url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLd} />
      {children}
    </>
  );
}
