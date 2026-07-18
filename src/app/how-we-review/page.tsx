import Link from "next/link";
import type { Metadata } from "next";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import {
  editorialIndependence,
  howWeReviewFaqs,
  howWeReviewHero,
  howWeReviewMeta,
  HOW_WE_REVIEW_PATH,
  paymentMethodsReviewed,
  paymentReviewFactors,
  responsibleGamblingPoints,
  reviewProcessSteps,
  scoringCategories,
  updatePolicy,
} from "@/data/how-we-review";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqPageSchema,
  webPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildPageMetadata({
  title: howWeReviewMeta.title,
  description: howWeReviewMeta.description,
  path: HOW_WE_REVIEW_PATH,
});

export default function HowWeReviewPage() {
  const pageUrl = `${siteConfig.url}${HOW_WE_REVIEW_PATH}`;

  const jsonLd = [
    webPageSchema({
      name: howWeReviewMeta.title,
      description: howWeReviewMeta.description,
      url: pageUrl,
    }),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: howWeReviewHero.title, url: pageUrl },
    ]),
    faqPageSchema([...howWeReviewFaqs]),
  ];

  return (
    <>
      {jsonLd.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <PageShell>
        <PageHero
          kicker="Editorial Standards"
          title={howWeReviewHero.title}
          description={howWeReviewHero.subtitle}
          badges={["Independent scores", "Published weights", "18+ only"]}
          tone="gold"
          actions={
            <>
              <Link href="/blogs" className="zb-btn-gold zb-shine">
                Browse reviews
              </Link>
              <Link href="/compare" className="zb-btn-cyan">
                Compare casinos
              </Link>
            </>
          }
        />

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Process</p>
            <h2 className="mt-2 zb-headline text-2xl">Our Review Process</h2>
            <ol className="mt-6 space-y-4">
              {reviewProcessSteps.map((step, i) => (
                <li key={step.step}>
                  <PremiumTiltCard delay={i * 0.05}>
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 font-numeric text-sm font-bold text-gold-400 ring-1 ring-gold-400/40">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </PremiumTiltCard>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <h2 className="zb-headline text-2xl">Scoring Categories</h2>
            <p className="mt-3 text-sm text-slate-400">
              Every ZEONEBET review uses the weighted model below. Weights total 100%.
            </p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-gold-400/25 bg-black/40 backdrop-blur-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-gold-500/10 text-xs uppercase tracking-wide text-gold-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold text-right">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringCategories.map((category) => (
                    <tr key={category.name} className="border-t border-white/10">
                      <td className="px-5 py-3 text-slate-300">{category.name}</td>
                      <td className="px-5 py-3 text-right font-semibold text-white">
                        {category.weight}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gold-500/30 bg-gold-500/5">
                    <td className="px-5 py-3 font-semibold text-white">Total</td>
                    <td className="px-5 py-3 text-right font-bold text-gold-400">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="zb-headline text-2xl">Payment Review Methodology</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              South Asian players rely on a mix of local wallets, bank rails, and crypto. We review
              whether operators support these methods honestly and whether payouts work in practice.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {paymentMethodsReviewed.map((method) => (
                <Link
                  key={method.name}
                  href={method.href}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-gold-500/40 hover:text-gold-300"
                >
                  {method.name}
                </Link>
              ))}
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-sm text-slate-400">
              {paymentReviewFactors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="zb-headline text-2xl">Responsible Gambling</h2>
            <div className="mt-6">
              <PremiumTiltCard tone="cyan">
                <ul className="list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-300">
                  {responsibleGamblingPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  ZEONEBET promotes informed play. Never gamble more than you can afford to lose. 18+
                  only.
                </p>
              </PremiumTiltCard>
            </div>
          </section>

          <section className="mt-14 space-y-5">
            <PremiumTiltCard>
              <h2 className="font-display text-xl font-semibold text-white">Editorial Independence</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{editorialIndependence}</p>
            </PremiumTiltCard>
            <PremiumTiltCard tone="cyan">
              <h2 className="font-display text-xl font-semibold text-white">Update Policy</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{updatePolicy}</p>
            </PremiumTiltCard>
          </section>

          <section className="mt-14">
            <h2 className="zb-headline text-2xl">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {howWeReviewFaqs.map((faq, i) => (
                <PremiumTiltCard key={faq.question} delay={i * 0.04}>
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
                </PremiumTiltCard>
              ))}
            </div>
          </section>

          <div className="mt-12 rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/8 p-6 text-center">
            <p className="text-sm text-slate-400">
              Read our latest expert reviews or compare casinos using the same scoring framework.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/blogs" className="zb-btn-gold text-sm">
                Browse Reviews
              </Link>
              <Link href="/compare" className="zb-btn-cyan text-sm">
                Compare Casinos
              </Link>
              <Link href="/casinos" className="zb-btn-ghost text-sm">
                Casino Directory
              </Link>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
