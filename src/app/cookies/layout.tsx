import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLdScripts } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy for CasinoPulse — how we use cookies and similar technologies.",
  path: "/cookies",
});

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  const pageUrl = `${siteConfig.url}/cookies`;
  const legalUrl = `${siteConfig.url}/terms`;
  const jsonLd = [
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Legal", url: legalUrl },
      { name: "Cookie Policy", url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLd} />
      {children}
    </>
  );
}
