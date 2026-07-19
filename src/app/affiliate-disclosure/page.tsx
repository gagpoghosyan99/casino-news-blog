import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How ZeoneBet discloses affiliate relationships, sponsored content, and commercial partnerships.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <PageShell>
      <PageHero
        kicker="Transparency"
        title="Affiliate Disclosure"
        description="ZeoneBet may receive compensation from selected operators when you follow tracked links. This page explains how those relationships work."
        badges={["18+ only", "Sponsored content labeled", "Editorial independence"]}
        showcase={false}
        actions={
          <>
            <Link href="/partners" className="zb-btn-gold zb-shine">
              Partners hub
            </Link>
            <Link href="/responsible-gambling" className="zb-btn-cyan">
              Responsible gambling
            </Link>
          </>
        }
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 text-sm leading-relaxed text-slate-300 sm:px-6 lg:px-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Affiliate relationships</h2>
          <p className="mt-3">
            Some outbound casino links on ZeoneBet are affiliate or tracked links. If you register,
            deposit, or complete another qualifying action with an operator after using such a link,
            ZeoneBet may receive a commission or other compensation. This does not increase the price you
            pay for using the operator&apos;s service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Sponsored content</h2>
          <p className="mt-3">
            Paid or sponsored articles, interviews, and placements are labeled as sponsored. Sponsorship may
            influence visibility or distribution, but does not purchase a guaranteed positive rating.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Editorial independence</h2>
          <p className="mt-3">
            Commercial partners cannot directly buy editorial conclusions. Casino submissions are subject
            to quality and compliance review. Read our{" "}
            <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
              review methodology
            </Link>{" "}
            and{" "}
            <Link href="/editorial-policy" className="text-gold-400 hover:text-gold-300">
              editorial policy
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Offers and terms</h2>
          <p className="mt-3">
            Bonuses, eligibility, wagering, and rewards are controlled by third-party operators and may
            change. Always verify the operator&apos;s live terms before registering or depositing. 18+ only.
            Gamble responsibly.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white">Questions</h2>
          <p className="mt-3">
            Partnership inquiries:{" "}
            <Link href="/partners/company#contact" className="text-gold-400 hover:text-gold-300">
              Partners contact form
            </Link>
            . Editorial corrections:{" "}
            <Link href="/contact" className="text-gold-400 hover:text-gold-300">
              Contact
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
