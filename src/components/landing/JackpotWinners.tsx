"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { jackpotWins } from "@/data/jackpots";
import { countryFlags } from "@/data/landing-home";
import SectionReveal from "./SectionReveal";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function JackpotWinners() {
  const winners = jackpotWins.slice(0, 6);

  return (
    <section id="jackpots" className="relative zb-section overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
      {/* Gold particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-400/60"
          style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 80}%` }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -20, 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Live Winners</p>
          <h2 className="mt-2 zb-headline">Jackpot Winners Feed</h2>
          <p className="mt-3 text-slate-400">Verified-style winner reports from global casino play.</p>
        </SectionReveal>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-3">
          {winners.map((win, i) => (
            <SectionReveal key={win.id} delay={i * 0.08} className="min-w-[280px] snap-center md:min-w-0">
              <div className="zb-glass-gold group h-full p-6 transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-lg font-bold text-navy-950">
                    {win.playerNickname.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{win.playerNickname}</p>
                    <p className="text-sm text-slate-500">
                      {countryFlags[win.countryCode] ?? "🌐"} {win.country}
                    </p>
                  </div>
                  {win.isRecord && (
                    <span className="ml-auto rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                      RECORD
                    </span>
                  )}
                </div>
                <p className="mt-6 font-display text-3xl font-bold text-gold-400">
                  {formatAmount(win.amount, win.currency)}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {win.casinoName} · {win.gameName}
                </p>
                <Link
                  href={`/go/${win.casinoSlug}`}
                  className="zb-btn-gold zb-shine mt-6 block w-full text-center text-sm"
                >
                  Claim Like Winners
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
