import Link from "next/link";
import type { Metadata } from "next";
import BlacklistCard from "@/components/blacklist/BlacklistCard";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import { blacklistedCasinos } from "@/data/blacklist";
import {
  BLACKLIST_PATH,
  RESPONSIBLE_GAMBLING_PATH,
  blacklistMeta,
} from "@/data/legal";
import { HOW_WE_REVIEW_PATH } from "@/data/how-we-review";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: blacklistMeta.title,
  description: blacklistMeta.description,
  path: BLACKLIST_PATH,
});

const EDITORIAL_DISCLAIMER =
  "ZEONEBET editorial risk assessments are based on publicly visible player reports, operator terms, and our review framework. They are not legal findings, regulator orders, or proof of misconduct.";

const CORRECTIONS_NOTICE =
  "If you represent an operator or believe an item is outdated, contact ZEONEBET with verifiable sources for review.";

export default function BlacklistPage() {
  const pageUrl = `${siteConfig.url}${BLACKLIST_PATH}`;

  const jsonLd = [
    webPageSchema({
      name: blacklistMeta.title,
      description: blacklistMeta.description,
      url: pageUrl,
    }),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Casino Blacklist", url: pageUrl },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageShell>
        <PageHero
          kicker="Risk Intelligence"
          title="Casino Blacklist — Editorial Risk Assessments"
          description="Editorial risk assessments for operators with frequently reported concerns. Not legal findings — verify terms and use our methodology before depositing."
          badges={["Editorial only", "Not legal findings", "18+ only"]}
          tone="gold"
          actions={
            <>
              <Link href={HOW_WE_REVIEW_PATH} className="zb-btn-gold zb-shine">
                Review methodology
              </Link>
              <Link href="/compare" className="zb-btn-cyan">
                Compare safer options
              </Link>
            </>
          }
        />

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <PremiumTiltCard tone="amber">
            <p className="text-sm leading-relaxed text-slate-300">{EDITORIAL_DISCLAIMER}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{CORRECTIONS_NOTICE}</p>
            <p className="mt-3 text-sm">
              <Link href="/contact" className="font-medium text-gold-400 hover:text-gold-300">
                Contact ZEONEBET for corrections →
              </Link>
            </p>
          </PremiumTiltCard>

          <p className="mt-8 text-lg leading-relaxed text-slate-300">
            This page lists editorial risk assessments for online casinos with frequently reported
            concerns and risk indicators. Players should review operator terms carefully and use our{" "}
            <Link href={HOW_WE_REVIEW_PATH} className="text-gold-400 hover:text-gold-300">
              review methodology
            </Link>{" "}
            before depositing. 18+ only —{" "}
            <Link href={RESPONSIBLE_GAMBLING_PATH} className="text-emerald-400 hover:text-emerald-300">
              responsible gambling resources
            </Link>
            .
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {blacklistedCasinos.map((casino) => (
              <BlacklistCard key={casino.id} casino={casino} showEditorialNote />
            ))}
          </div>

          <div className="mt-12 space-y-5">
            <PremiumTiltCard tone="danger">
              <h2 className="font-display text-xl font-semibold text-white">Editorial caution</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                ZEONEBET editorial risk assessments summarise reported concerns and risk indicators
                from public player feedback and our review process. We do not state unverified
                accusations as facts.{" "}
                <Link href="/contact" className="text-gold-400 hover:text-gold-300">
                  Request a correction
                </Link>
                .
              </p>
            </PremiumTiltCard>

            <PremiumTiltCard>
              <h2 className="font-display text-xl font-semibold text-white">
                How blacklist entries are chosen
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Listings reflect recurring editorial risk indicators — not court rulings. Compare
                alternatives on{" "}
                <Link href="/compare" className="text-gold-400 hover:text-gold-300">
                  Compare Casinos
                </Link>
                .
              </p>
            </PremiumTiltCard>

            <PremiumTiltCard tone="cyan">
              <h2 className="font-display text-xl font-semibold text-white">Editorial resources</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {[
                  { href: "/how-we-review", label: "How We Review" },
                  { href: "/responsible-gambling", label: "Responsible Gambling" },
                  { href: "/compare", label: "Compare Casinos" },
                  { href: "/casinos", label: "Casino Directory" },
                  { href: "/india-casino-payments", label: "India Payments" },
                  { href: "/crypto/bitcoin-casino", label: "Bitcoin Guide" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gold-300 hover:border-gold-400/40"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </PremiumTiltCard>
          </div>
        </div>
      </PageShell>
    </>
  );
}
