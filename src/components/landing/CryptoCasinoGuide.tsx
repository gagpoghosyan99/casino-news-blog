"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bitcoin, Coins, Wallet, Zap } from "lucide-react";
import PremiumIcon from "@/components/ui/PremiumIcon";
import { cryptoAssets, cryptoGuideCards } from "@/data/landing-home";
import SectionReveal from "./SectionReveal";

const guideIcons = [Bitcoin, Zap, Wallet, Coins] as const;

export default function CryptoCasinoGuide() {
  return (
    <section className="zb-section border-t border-white/5 bg-gradient-to-b from-navy-950 to-[#04060d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Crypto Fintech</p>
          <h2 className="mt-2 zb-headline">Crypto Casino &amp; Payment Guides</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Futuristic payment intelligence for Bitcoin, Ethereum, USDT, and Solana casino deposits.
          </p>
        </SectionReveal>

        <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row">
          <div className="relative flex h-48 w-full max-w-md items-center justify-center lg:h-64 lg:w-1/2">
            {cryptoAssets.map((asset, i) => {
              const positions = [
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-125",
                "left-[15%] top-[20%]",
                "right-[10%] top-[25%]",
                "left-[20%] bottom-[10%]",
              ];
              return (
                <motion.div
                  key={asset.symbol}
                  className={`absolute flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-gold-500/20 font-bold text-white shadow-glow-cyan ring-1 ring-cyan-400/30 ${positions[i]}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                >
                  <Bitcoin className="mb-0.5 h-4 w-4 text-gold-400" />
                  <span className="text-[10px] tracking-wide">{asset.symbol}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-1/2">
            {cryptoGuideCards.map((card, i) => (
              <SectionReveal key={card.title} delay={i * 0.06}>
                <Link href={card.href} className="group block h-full">
                  <div className="zb-glass-cyan flex h-full gap-3 p-5 transition-all group-hover:shadow-glow-cyan">
                    <PremiumIcon icon={guideIcons[i] ?? Coins} tone="cyan" size="sm" />
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-300">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{card.desc}</p>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/crypto/bitcoin-casino" className="zb-btn-cyan">
            Explore Crypto Casinos →
          </Link>
        </div>
      </div>
    </section>
  );
}
