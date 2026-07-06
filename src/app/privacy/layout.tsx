import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLdScripts } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for CasinoPulse — how we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  const pageUrl = `${siteConfig.url}/privacy`;
  const legalUrl = `${siteConfig.url}/terms`;
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Legal", url: legalUrl },
      { name: "Privacy Policy", url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLd} />
      {children}
    </>
  );
}
