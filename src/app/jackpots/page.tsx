import type { Metadata } from "next";
import Link from "next/link";
import JackpotWinners from "@/components/landing/JackpotWinners";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { GLOBAL_JACKPOT_TOTAL } from "@/data/landing-home";

export const metadata: Metadata = buildPageMetadata({
  title: "Live Jackpot Winners",
  description:
    "Track recent jackpot winner reports across trusted casinos. ZEONEBET highlights win amounts, countries, and operator context for South Asia and global players.",
  path: "/jackpots",
});

export default function JackpotsPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Live Winners Feed"
        title="Jackpot Winners & Global Prize Reports"
        description={`Follow verified-style winner narratives from Stake, BC.Game, Roobet, and more. Live global jackpot tracker sits near $${GLOBAL_JACKPOT_TOTAL.toLocaleString()} — amounts are illustrative intelligence signals, not personal guarantees.`}
        badges={["Winner reports", "Global coverage", "Play responsibly"]}
        tone="gold"
        actions={
          <>
            <Link href="/casinos" className="zb-btn-gold">
              Play at Trusted Casinos
            </Link>
            <Link href="/bonuses" className="zb-btn-cyan">
              View Bonuses
            </Link>
          </>
        }
      />
      <JackpotWinners hideHeader />
    </PageShell>
  );
}
