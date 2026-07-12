import type { Metadata } from "next";
import Link from "next/link";
import CryptoCasinoGuide from "@/components/landing/CryptoCasinoGuide";
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
            <Link href="/crypto/bitcoin-casino" className="zb-btn-cyan">
              Bitcoin Casino Guide
            </Link>
            <Link href="/casinos" className="zb-btn-gold">
              Trusted Casinos
            </Link>
          </>
        }
      />
      <CryptoCasinoGuide hideHeader />
    </PageShell>
  );
}
