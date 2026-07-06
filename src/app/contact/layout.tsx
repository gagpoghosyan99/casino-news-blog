import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { JsonLdScripts } from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact CasinoPulse for editorial corrections, partnership inquiries, or general questions about our casino reviews and South Asia guides.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const pageUrl = `${siteConfig.url}/contact`;
  const contactDescription =
    "Contact CasinoPulse for editorial corrections, partnership inquiries, or general questions about our casino reviews and South Asia guides.";
  const jsonLd = [
    webPageSchema({
      name: "Contact CasinoPulse",
      description: contactDescription,
      url: pageUrl,
    }),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Contact", url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLdScripts schemas={jsonLd} />
      <div className="mx-auto max-w-xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-slate-500">
          Reach CasinoPulse for editorial corrections, outdated payment references, partnership
          inquiries, or general questions about our casino reviews and South Asia guides. Correction
          requests are reviewed separately from affiliate or advertising questions.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          We do not provide personalised gambling advice, process player deposits, or reset operator
          passwords. For payment disputes with a casino, contact that operator&apos;s support team
          directly and keep transaction references. For responsible gambling help, visit our{" "}
          <a href="/responsible-gambling" className="font-medium text-gold-400 hover:text-gold-300">
            responsible gambling page
          </a>
          . Learn how we review casinos on our{" "}
          <a href="/how-we-review" className="font-medium text-gold-400 hover:text-gold-300">
            methodology page
          </a>{" "}
          or read{" "}
          <a href="/about" className="font-medium text-gold-400 hover:text-gold-300">
            about CasinoPulse
          </a>
          .
        </p>
      </div>
      {children}
    </>
  );
}
