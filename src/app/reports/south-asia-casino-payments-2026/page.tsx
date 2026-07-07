import type { Metadata } from "next";
import ProgrammaticPageLayout from "@/components/programmatic/ProgrammaticPageLayout";
import {
  REPORT_PATH,
  southAsiaCasinoPaymentsReport2026,
} from "@/data/reports/south-asia-casino-payments-2026";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildProgrammaticPageJsonLd } from "@/lib/seo/programmatic-page-schema";
import { articleSchema } from "@/lib/seo/schema";

const page = southAsiaCasinoPaymentsReport2026;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: REPORT_PATH,
  });
}

export default function SouthAsiaCasinoPaymentsReportPage() {
  const pageUrl = `${siteConfig.url}${REPORT_PATH}`;
  const jsonLd = buildProgrammaticPageJsonLd(page, pageUrl, [
    { name: "Home", url: siteConfig.url },
    { name: "Reports", url: `${siteConfig.url}/reports/south-asia-casino-payments-2026` },
    { name: page.h1, url: pageUrl },
  ]);

  const articleJsonLd = {
    ...articleSchema({
      title: page.title,
      description: page.metaDescription,
      url: pageUrl,
      datePublished: page.datePublished ?? "2026-07-07",
      author: siteConfig.name,
    }),
    "@type": "Article" as const,
    ...(page.dateModified ? { dateModified: page.dateModified } : {}),
  };

  return (
    <>
      {jsonLd.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ProgrammaticPageLayout
        page={page}
        kicker="Authority Report · 2026"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "South Asia Payment Report 2026", href: REPORT_PATH },
        ]}
      />
    </>
  );
}
