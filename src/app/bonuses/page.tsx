import type { Metadata } from "next";
import Link from "next/link";
import BonusPromotions from "@/components/landing/BonusPromotions";
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
            <Link href="/casinos" className="zb-btn-gold">
              Explore Trusted Casinos
            </Link>
            <Link href="/how-we-review" className="zb-btn-ghost">
              How we review offers
            </Link>
          </>
        }
      />
      <BonusPromotions hideHeader />
    </PageShell>
  );
}
