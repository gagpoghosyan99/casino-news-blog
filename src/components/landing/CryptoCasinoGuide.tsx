"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Wallet, Zap } from "lucide-react";
import { cryptoAssets, cryptoGuideCards } from "@/data/landing-home";
import SectionReveal from "./SectionReveal";

function BtcMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="url(#btcGrad)" />
      <path
        fill="#0a0e17"
        d="M18.2 14.1c.3-1.9-1.2-2.9-3.2-3.6l.7-2.6-1.6-.4-.7 2.5c-.4-.1-.8-.2-1.3-.3l.7-2.5-1.6-.4-.7 2.6c-.3-.1-.7-.2-1-.3l-2.2-.5-.4 1.7s1.2.3 1.1.3c.6.2.8.6.7 1l-.7 3c0 0 .1 0 .2.1h-.2l-1.1 4.2c-.1.2-.3.5-.7.4.0 0-1.1-.3-1.1-.3l-.8 1.8 2 .5c.4.1.7.2 1.1.3l-.7 2.6 1.6.4.7-2.6c.4.1.9.2 1.3.3l-.7 2.6 1.6.4.7-2.6c2.8.5 4.9.3 5.8-2.2.7-2 .0-3.2-1.5-3.9 1.1-.3 1.9-1 2.1-2.5zm-3.7 5.2c-.5 2.1-4 .9-5.1.7l.9-3.6c1.1.3 4.7.8 4.2 2.9zm.5-5.3c-.5 1.9-3.3.9-4.2.7l.8-3.2c.9.2 3.9.7 3.4 2.5z"
      />
      <defs>
        <linearGradient id="btcGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#f4c542" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EthMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="url(#ethGrad)" />
      <path fill="#fff" fillOpacity="0.95" d="M16 5.5v7.8l6.6 2.9L16 5.5z" />
      <path fill="#fff" fillOpacity="0.7" d="M16 5.5L9.4 16.2 16 13.3V5.5z" />
      <path fill="#fff" fillOpacity="0.95" d="M16 21.7v4.8l6.6-9.1L16 21.7z" />
      <path fill="#fff" fillOpacity="0.7" d="M16 26.5v-4.8l-6.6-4.3L16 26.5z" />
      <path fill="#fff" fillOpacity="0.85" d="M16 20.4l6.6-3.7L16 13.8v6.6z" />
      <path fill="#fff" fillOpacity="0.55" d="M9.4 16.7l6.6 3.7v-6.6l-6.6 2.9z" />
      <defs>
        <linearGradient id="ethGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8b9cff" />
          <stop offset="1" stopColor="#627eea" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function UsdtMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="url(#usdtGrad)" />
      <path
        fill="#fff"
        d="M17.4 15.7v-2.2h4.5V9.8H10.1v3.7h4.5v2.2C10.8 15.9 8 16.8 8 17.9c0 1.1 2.8 2 6.6 2.2v4.1h2.8v-4.1c3.8-.2 6.6-1.1 6.6-2.2 0-1.1-2.8-2-6.6-2.2zm0 3.5v.1c-.1 0-.5.1-1.4.1s-1.3-.1-1.4-.1v-.1c-2.8-.2-4.9-.8-4.9-1.5s2.1-1.3 4.9-1.5v2.4c.2 0 .6.1 1.4.1s1.2-.1 1.4-.1v-2.4c2.8.2 4.9.8 4.9 1.5s-2.1 1.3-4.9 1.5z"
      />
      <defs>
        <linearGradient id="usdtGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#50e3c2" />
          <stop offset="1" stopColor="#26a17b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SolMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="url(#solGrad)" />
      <path
        fill="#fff"
        d="M10.2 19.8c.1-.1.3-.2.5-.2h12.1c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H9c-.3 0-.5-.4-.3-.6l1.5-1.5zm0-9.4c.1-.1.3-.2.5-.2h12.1c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H9c-.3 0-.5-.4-.3-.6l1.5-1.5zm12.9 4.4c-.1-.1-.3-.2-.5-.2H10.5c-.3 0-.5.4-.3.6l1.5 1.5c.1.1.3.2.5.2h12.1c.3 0 .5-.4.3-.6l-1.5-1.5z"
      />
      <defs>
        <linearGradient id="solGrad" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ASSET_META = {
  BTC: { Mark: BtcMark, glow: "rgba(244,197,66,0.45)", ring: "ring-gold-400/40" },
  ETH: { Mark: EthMark, glow: "rgba(98,126,234,0.45)", ring: "ring-indigo-300/40" },
  USDT: { Mark: UsdtMark, glow: "rgba(38,161,123,0.45)", ring: "ring-emerald-400/40" },
  SOL: { Mark: SolMark, glow: "rgba(220,31,255,0.35)", ring: "ring-fuchsia-400/40" },
} as const;

const ORBIT = [
  { top: "10%", left: "50%", delay: 0 },
  { top: "50%", left: "88%", delay: 0.4 },
  { top: "88%", left: "50%", delay: 0.8 },
  { top: "50%", left: "12%", delay: 1.2 },
];

const guideMeta = [
  { icon: Shield, accent: "from-gold-500/20 to-cyan-500/10", iconColor: "text-gold-400" },
  { icon: Zap, accent: "from-cyan-500/20 to-emerald-500/10", iconColor: "text-cyan-300" },
  { icon: Wallet, accent: "from-emerald-500/20 to-cyan-500/10", iconColor: "text-emerald-300" },
  { icon: ArrowUpRight, accent: "from-fuchsia-500/15 to-gold-500/10", iconColor: "text-fuchsia-300" },
] as const;

function CryptoOrbitStage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Ambient glows */}
      <div className="absolute inset-[18%] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-gold-500/10 blur-2xl" />

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-[12%] rounded-full border border-dashed border-cyan-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[22%] rounded-full border border-cyan-400/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulse core — perfectly centered */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 via-navy-900 to-gold-500/20 ring-1 ring-white/15 shadow-[0_0_50px_rgba(34,211,238,0.3)]"
          animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/90">Pay</span>
          <span className="font-display text-sm font-bold text-white">Crypto</span>
        </motion.div>
      </div>

      {/* Connecting beams */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="rgba(34,211,238,0)" />
            <stop offset="0.5" stopColor="rgba(34,211,238,0.45)" />
            <stop offset="1" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
        </defs>
        {ORBIT.map((pos, i) => (
          <motion.line
            key={i}
            x1="50%"
            y1="50%"
            x2={pos.left}
            y2={pos.top}
            stroke="url(#beam)"
            strokeWidth="1"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.15, 0.55, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>

      {/* Orbiting assets */}
      {cryptoAssets.map((asset, i) => {
        const meta = ASSET_META[asset.symbol as keyof typeof ASSET_META];
        const pos = ORBIT[i];
        if (!meta || !pos) return null;
        const { Mark, glow, ring } = meta;

        return (
          <motion.div
            key={asset.symbol}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top: pos.top, left: pos.left }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Link href={asset.href} className="group block">
              <motion.div
                className={`relative flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl ring-1 ${ring} transition-transform group-hover:scale-110`}
                style={{ boxShadow: `0 0 28px ${glow}` }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.4 + i * 0.45, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
              >
                <Mark className="h-8 w-8 drop-shadow-lg" />
                <span className="mt-0.5 text-[9px] font-bold tracking-wider text-white/80">
                  {asset.symbol}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-300/70"
          style={{ left: `${12 + ((i * 11) % 76)}%`, top: `${18 + ((i * 17) % 64)}%` }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -12, 0] }}
          transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  );
}

export default function CryptoCasinoGuide({ hideHeader = false }: { hideHeader?: boolean }) {
  return (
    <section className="relative zb-section overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(34,211,238,0.08),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(212,175,55,0.06),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <SectionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Crypto Fintech</p>
            <h2 className="mt-2 zb-headline">Crypto Casino &amp; Payment Guides</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Futuristic payment intelligence for Bitcoin, Ethereum, USDT, and Solana casino deposits.
            </p>
          </SectionReveal>
        )}

        <div className={`${hideHeader ? "" : "mt-12 "}grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
          <SectionReveal>
            <CryptoOrbitStage />
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {cryptoGuideCards.map((card, i) => {
              const meta = guideMeta[i] ?? guideMeta[0];
              const Icon = meta.icon;
              return (
                <SectionReveal key={card.title} delay={i * 0.08}>
                  <Link href={card.href} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="zb-glass-cyan relative h-full overflow-hidden p-5 transition-shadow group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                    >
                      <div
                        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} ring-1 ring-white/10`}
                      >
                        <Icon className={`h-5 w-5 ${meta.iconColor}`} />
                      </div>
                      <h3 className="font-semibold text-white transition-colors group-hover:text-cyan-300">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.desc}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Open guide <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                      <div className="pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/crypto" className="zb-btn-cyan inline-flex items-center gap-2">
            Explore Crypto Casinos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
