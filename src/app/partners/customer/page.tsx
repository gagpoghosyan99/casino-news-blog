import type { Metadata } from "next";
import PageShell from "@/components/ui/PageShell";
import CustomerPartnersClient from "@/components/partners/CustomerPartnersClient";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import { playerFaq } from "@/data/partners/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Customer Partners | Player Offers & Referral Benefits",
  description:
    "Explore ZeoneBet customer partner benefits: reviewed casinos, tracked offers, referral opportunities and clearer promotion details.",
  path: "/partners/customer",
});

export default function CustomerPartnersPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Partners", url: `${siteConfig.url}/partners` },
    { name: "Customer Partners", url: `${siteConfig.url}/partners/customer` },
  ]);
  const webpage = webPageSchema({
    name: "ZeoneBet Customer Partners",
    description: "Player benefits, offers and referral opportunities on ZeoneBet.",
    url: `${siteConfig.url}/partners/customer`,
  });
  const faq = faqPageSchema(playerFaq);

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
      <CustomerPartnersClient />
    </PageShell>
  );
}
