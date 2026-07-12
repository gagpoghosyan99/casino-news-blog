import type { Metadata } from "next";
import Link from "next/link";
import { Bitcoin, Coins, Wallet, Zap } from "lucide-react";
import PremiumIcon from "@/components/ui/PremiumIcon";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { cryptoAssets, cryptoGuideCards } from "@/data/landing-home";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Crypto Casino Guides",
  description:
    "Bitcoin, Ethereum, USDT, and Solana casino guides for South Asian players — deposits, withdrawals, networks, and trusted crypto operators.",
  path: "/crypto",
});

const guideIcons = [Bitcoin, Zap, Wallet, Coins] as const;

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

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cryptoAssets.map((asset) => (
            <Link key={asset.symbol} href={asset.href} className="group zb-glass-cyan p-5 transition-all hover:shadow-glow-cyan">
              <div className="flex items-center gap-3">
                <PremiumIcon icon={Bitcoin} tone="cyan" size="sm" />
                <div>
                  <p className="font-bold text-white group-hover:text-cyan-300">{asset.symbol}</p>
                  <p className="text-sm text-slate-500">{asset.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {cryptoGuideCards.map((card, i) => (
            <Link key={card.title} href={card.href} className="group zb-glass flex gap-4 p-6 transition-all hover:border-cyan-400/30">
              <PremiumIcon icon={guideIcons[i] ?? Coins} tone="cyan" />
              <div>
                <h2 className="font-display text-xl font-bold text-white group-hover:text-cyan-300">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm text-slate-400">{card.desc}</p>
                <p className="mt-4 text-xs font-semibold text-cyan-400">Open guide →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
