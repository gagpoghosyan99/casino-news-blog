import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import PartnersPageClient from "@/components/partners/PartnersPageClient";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { businessFaq, playerFaq } from "@/data/partners/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Partners | Affiliate, Advertising and Player Opportunities",
  description:
    "Partner with ZeoneBet through affiliate campaigns, casino listings, sponsored content, advertising, media collaborations and player referral opportunities.",
  path: "/partners",
});

export default function PartnersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Partners", url: `${siteConfig.url}/partners` },
  ]);
  const webpage = webPageSchema({
    name: "ZeoneBet Partners",
    description:
      "Affiliate, advertising, sponsored content, casino listing, and player referral opportunities.",
    url: `${siteConfig.url}/partners`,
  });
  const faq = faqPageSchema([...businessFaq, ...playerFaq]);

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
      <PartnersPageClient />
    </PageShell>
  );
}
