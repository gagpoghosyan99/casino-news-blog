import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import CompanyPartnersClient from "@/components/partners/CompanyPartnersClient";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { businessFaq } from "@/data/partners/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Company Partners | Affiliate, Advertising & Business Deals",
  description:
    "Partner with ZeoneBet as a company: affiliate campaigns, advertising, casino listings, sponsored content and custom proposals.",
  path: "/partners/company",
});

export default function CompanyPartnersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Partners", url: `${siteConfig.url}/partners` },
    { name: "Company Partners", url: `${siteConfig.url}/partners/company` },
  ]);
  const webpage = webPageSchema({
    name: "ZeoneBet Company Partners",
    description: "Business partnership models for operators, agencies, media and brands.",
    url: `${siteConfig.url}/partners/company`,
  });
  const faq = faqPageSchema(businessFaq);

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <CompanyPartnersClient />
    </PageShell>
  );
}
