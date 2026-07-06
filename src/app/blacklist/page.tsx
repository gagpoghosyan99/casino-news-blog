import Link from "next/link";
import type { Metadata } from "next";
import BlacklistCard from "@/components/blacklist/BlacklistCard";
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
  "CasinoPulse editorial risk assessments are based on publicly visible player reports, operator terms, and our review framework. They are not legal findings, regulator orders, or proof of misconduct.";

const CORRECTIONS_NOTICE =
  "If you represent an operator or believe an item is outdated, contact CasinoPulse with verifiable sources for review.";

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

      <div className="min-h-screen bg-navy-950">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-6 flex flex-wrap gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-gold-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-400">Casino Blacklist</span>
          </nav>

          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Casino Blacklist — Editorial Risk Assessments
          </h1>

          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <p className="text-sm leading-relaxed text-slate-300">{EDITORIAL_DISCLAIMER}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{CORRECTIONS_NOTICE}</p>
            <p className="mt-3 text-sm">
              <Link href="/contact" className="font-medium text-gold-400 hover:text-gold-300">
                Contact CasinoPulse for corrections →
              </Link>
            </p>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            This page lists CasinoPulse editorial risk assessments for online casinos with
            frequently reported concerns and risk indicators. These are not legal findings,
            regulator orders, or verified accusations of fraud. Players should review operator
            terms carefully and use our{" "}
            <Link href={HOW_WE_REVIEW_PATH} className="text-gold-400 hover:text-gold-300">
              review methodology
            </Link>{" "}
            before depositing.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            18+ only. Gambling involves risk. See our{" "}
            <Link href={RESPONSIBLE_GAMBLING_PATH} className="text-emerald-400 hover:text-emerald-300">
              responsible gambling resources
            </Link>
            .
          </p>

          <p className="mt-6 text-xs text-slate-600">{CORRECTIONS_NOTICE}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {blacklistedCasinos.map((casino) => (
              <BlacklistCard key={casino.id} casino={casino} showEditorialNote />
            ))}
          </div>

          <section className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-xl font-semibold text-white">Editorial caution</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              CasinoPulse editorial risk assessments summarise reported concerns and risk
              indicators from public player feedback and our review process. We do not state
              unverified accusations as facts. Listings reflect editorial judgment at review time
              and may change when new evidence is provided.{" "}
              <Link href="/contact" className="text-gold-400 hover:text-gold-300">
                Request a correction
              </Link>
              .
            </p>
          </section>

          <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-xl font-semibold text-white">
              How CasinoPulse Blacklist Entries Are Chosen
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Listings reflect recurring editorial risk indicators — not court rulings or regulator
              orders. We weigh publicly visible complaint themes, bonus transparency, withdrawal
              process clarity, licensing footer readability, and alignment with our{" "}
              <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
                review methodology
              </Link>
              . Operators can request corrections via{" "}
              <Link href="/contact" className="text-gold-400 hover:text-gold-300">
                Contact
              </Link>{" "}
              with verifiable evidence. Blacklist placement does not buy removal — commercial
              relationships do not override editorial risk notes.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-400">
              <li>High-search brands with elevated complaint velocity may receive caution reviews or blacklist notes.</li>
              <li>We do not state unverified fraud accusations as established facts.</li>
              <li>Players should exercise caution and compare alternatives on{" "}
                <Link href="/compare" className="text-gold-400 hover:text-gold-300">
                  Compare Casinos
                </Link>
                .
              </li>
              <li>For payment context see{" "}
                <Link href="/bangladesh-casino-payments" className="text-gold-400 hover:text-gold-300">
                  Bangladesh payments
                </Link>
                ,{" "}
                <Link href="/india-casino-payments" className="text-gold-400 hover:text-gold-300">
                  India payments
                </Link>
                , and{" "}
                <Link href="/crypto/usdt-trc20-casino" className="text-gold-400 hover:text-gold-300">
                  USDT TRC-20 guide
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-xl font-semibold text-white">Editorial resources</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              CasinoPulse is an editorial review site — not a regulator or operator. Use these pages
              for methodology, transparency, and player safety context before choosing where to play.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <Link href="/about" className="text-gold-400 hover:text-gold-300">
                  About CasinoPulse
                </Link>
              </li>
              <li>
                <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
                  How We Review
                </Link>
              </li>
              <li>
                <Link href="/editorial-team" className="text-gold-400 hover:text-gold-300">
                  Editorial Team
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-gold-400 hover:text-gold-300">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
                  Responsible Gambling
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gold-400 hover:text-gold-300">
                  Compare Casinos
                </Link>
              </li>
              <li>
                <Link href="/india-casino-payments" className="text-gold-400 hover:text-gold-300">
                  India Payments Hub
                </Link>
              </li>
              <li>
                <Link href="/crypto/bitcoin-casino" className="text-gold-400 hover:text-gold-300">
                  Bitcoin Guide
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
