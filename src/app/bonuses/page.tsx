import type { Metadata } from "next";
import Link from "next/link";
import BonusPromotions from "@/components/landing/BonusPromotions";
import BonusesGuideSections from "@/components/bonuses/BonusesGuideSections";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Casino Bonuses & Promotions",
  description:
    "Explore limited-time casino bonuses, welcome offers, and crypto promotions reviewed by ZEONEBET. Always verify wagering terms on the operator site.",
  path: "/bonuses",
});

export default function BonusesPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Limited-Time Offers"
        title="Casino Bonuses & Exclusive Promotions"
        description="Compare welcome packages, crypto cashback, and limited-time offers from trusted operators. ZEONEBET highlights urgency and terms — always confirm final wagering rules on the casino site before claiming."
        badges={["Verify terms", "Wagering applies", "18+ only"]}
        tone="gold"
        actions={
          <>
            <Link href="/casinos" className="zb-btn-gold zb-shine">
              Explore Trusted Casinos
            </Link>
            <Link href="/how-we-review" className="zb-btn-cyan">
              How we review offers
            </Link>
          </>
        }
      />
      <BonusesGuideSections />
      <BonusPromotions hideHeader limit={6} />
      <div className="mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6 lg:px-8">
        <Link href="/casinos" className="zb-btn-cyan inline-flex">
          Browse all casino rankings →
        </Link>
      </div>
    </PageShell>
  );
}
