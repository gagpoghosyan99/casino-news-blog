import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import PartnersGate from "@/components/partners/PartnersGate";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Partners | Choose Company or Customer Path",
  description:
    "Choose your ZeoneBet partnership path: Company Partners for businesses, or Customer Partners for player offers and referrals.",
  path: "/partners",
});

export default function PartnersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Partners", url: `${siteConfig.url}/partners` },
  ]);
  const webpage = webPageSchema({
    name: "ZeoneBet Partners",
    description: "Choose Company Partners or Customer Partners to explore the right opportunity.",
    url: `${siteConfig.url}/partners`,
  });

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
      <PartnersGate />
    </PageShell>
  );
}
