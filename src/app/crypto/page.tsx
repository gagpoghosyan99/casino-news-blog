import type { Metadata } from "next";
import Link from "next/link";
import CryptoCasinoGuide from "@/components/landing/CryptoCasinoGuide";
import CryptoGuideSections from "@/components/crypto/CryptoGuideSections";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Crypto Casino Guides",
  description:
    "Bitcoin, Ethereum, USDT, and Solana casino guides for South Asian players — deposits, withdrawals, networks, and trusted crypto operators.",
  path: "/crypto",
});

export default function CryptoHubPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Crypto Fintech"
        title="Crypto Casino & Payment Intelligence"
        description="Learn how to deposit and withdraw with Bitcoin, Ethereum, USDT, and Solana — including network checks, fee awareness, and trusted crypto casino guides for South Asia."
        badges={["BTC", "ETH", "USDT", "SOL"]}
        tone="cyan"
        actions={
          <>
            <Link href="/crypto/bitcoin-casino" className="zb-btn-cyan zb-shine">
              Bitcoin Casino Guide
            </Link>
            <Link href="/casinos" className="zb-btn-gold zb-shine">
              Trusted Casinos
            </Link>
          </>
        }
      />
      <CryptoGuideSections />
      <CryptoCasinoGuide
        hideHeader
        showAssetGrid
        ctaHref="/casinos"
        ctaLabel="Explore Trusted Crypto Casinos"
      />
      <div className="mx-auto max-w-7xl px-4 pb-16 text-center sm:px-6 lg:px-8">
        <Link href="/bonuses" className="zb-btn-gold inline-flex">
          View crypto-friendly bonuses →
        </Link>
      </div>
    </PageShell>
  );
}
