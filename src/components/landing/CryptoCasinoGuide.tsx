"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Shield, Wallet, Zap } from "lucide-react";
import { cryptoAssets, cryptoGuideCards } from "@/data/landing-home";
import SectionReveal from "./SectionReveal";

function BtcMark({ className = "", id = "btcGrad" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={`url(#${id})`} />
      <path
        fill="#0a0e17"
        d="M18.2 14.1c.3-1.9-1.2-2.9-3.2-3.6l.7-2.6-1.6-.4-.7 2.5c-.4-.1-.8-.2-1.3-.3l.7-2.5-1.6-.4-.7 2.6c-.3-.1-.7-.2-1-.3l-2.2-.5-.4 1.7s1.2.3 1.1.3c.6.2.8.6.7 1l-.7 3c0 0 .1 0 .2.1h-.2l-1.1 4.2c-.1.2-.3.5-.7.4.0 0-1.1-.3-1.1-.3l-.8 1.8 2 .5c.4.1.7.2 1.1.3l-.7 2.6 1.6.4.7-2.6c.4.1.9.2 1.3.3l-.7 2.6 1.6.4.7-2.6c2.8.5 4.9.3 5.8-2.2.7-2 .0-3.2-1.5-3.9 1.1-.3 1.9-1 2.1-2.5zm-3.7 5.2c-.5 2.1-4 .9-5.1.7l.9-3.6c1.1.3 4.7.8 4.2 2.9zm.5-5.3c-.5 1.9-3.3.9-4.2.7l.8-3.2c.9.2 3.9.7 3.4 2.5z"
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#f4c542" />
          <stop offset="1" stopColor="#d4af37" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EthMark({ className = "", id = "ethGrad" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={`url(#${id})`} />
      <path fill="#fff" fillOpacity="0.95" d="M16 5.5v7.8l6.6 2.9L16 5.5z" />
      <path fill="#fff" fillOpacity="0.7" d="M16 5.5L9.4 16.2 16 13.3V5.5z" />
      <path fill="#fff" fillOpacity="0.95" d="M16 21.7v4.8l6.6-9.1L16 21.7z" />
      <path fill="#fff" fillOpacity="0.7" d="M16 26.5v-4.8l-6.6-4.3L16 26.5z" />
      <path fill="#fff" fillOpacity="0.85" d="M16 20.4l6.6-3.7L16 13.8v6.6z" />
      <path fill="#fff" fillOpacity="0.55" d="M9.4 16.7l6.6 3.7v-6.6l-6.6 2.9z" />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8b9cff" />
          <stop offset="1" stopColor="#627eea" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function UsdtMark({ className = "", id = "usdtGrad" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={`url(#${id})`} />
      <path
        fill="#fff"
        d="M17.4 15.7v-2.2h4.5V9.8H10.1v3.7h4.5v2.2C10.8 15.9 8 16.8 8 17.9c0 1.1 2.8 2 6.6 2.2v4.1h2.8v-4.1c3.8-.2 6.6-1.1 6.6-2.2 0-1.1-2.8-2-6.6-2.2zm0 3.5v.1c-.1 0-.5.1-1.4.1s-1.3-.1-1.4-.1v-.1c-2.8-.2-4.9-.8-4.9-1.5s2.1-1.3 4.9-1.5v2.4c.2 0 .6.1 1.4.1s1.2-.1 1.4-.1v-2.4c2.8.2 4.9.8 4.9 1.5s-2.1 1.3-4.9 1.5z"
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#50e3c2" />
          <stop offset="1" stopColor="#26a17b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SolMark({ className = "", id = "solGrad" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill={`url(#${id})`} />
      <path
        fill="#fff"
        d="M10.2 19.8c.1-.1.3-.2.5-.2h12.1c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H9c-.3 0-.5-.4-.3-.6l1.5-1.5zm0-9.4c.1-.1.3-.2.5-.2h12.1c.3 0 .5.4.3.6l-1.5 1.5c-.1.1-.3.2-.5.2H9c-.3 0-.5-.4-.3-.6l1.5-1.5zm12.9 4.4c-.1-.1-.3-.2-.5-.2H10.5c-.3 0-.5.4-.3.6l1.5 1.5c.1.1.3.2.5.2h12.1c.3 0 .5-.4.3-.6l-1.5-1.5z"
      />
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ASSET_META = {
  BTC: { Mark: BtcMark, glow: "rgba(244,197,66,0.45)", ring: "ring-gold-400/40", wash: "from-gold-500/15" },
  ETH: { Mark: EthMark, glow: "rgba(98,126,234,0.45)", ring: "ring-indigo-300/40", wash: "from-indigo-500/15" },
  USDT: { Mark: UsdtMark, glow: "rgba(38,161,123,0.45)", ring: "ring-emerald-400/40", wash: "from-emerald-500/15" },
  SOL: { Mark: SolMark, glow: "rgba(220,31,255,0.35)", ring: "ring-fuchsia-400/40", wash: "from-fuchsia-500/15" },
} as const;

const ORBIT = [
  { top: "10%", left: "50%", delay: 0 },
  { top: "50%", left: "88%", delay: 0.4 },
  { top: "88%", left: "50%", delay: 0.8 },
  { top: "50%", left: "12%", delay: 1.2 },
];

const guideMeta = [
  { icon: Shield, accent: "from-gold-500/20 to-cyan-500/10", iconColor: "text-gold-400", border: "border-gold-400/35" },
  { icon: Zap, accent: "from-cyan-500/20 to-emerald-500/10", iconColor: "text-cyan-300", border: "border-cyan-400/35" },
  { icon: Wallet, accent: "from-emerald-500/20 to-cyan-500/10", iconColor: "text-emerald-300", border: "border-emerald-400/30" },
  { icon: ArrowUpRight, accent: "from-fuchsia-500/15 to-gold-500/10", iconColor: "text-fuchsia-300", border: "border-fuchsia-400/30" },
] as const;

function GuideCard({
  card,
  index,
}: {
  card: (typeof cryptoGuideCards)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const meta = guideMeta[index] ?? guideMeta[0];
  const Icon = meta.icon;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
  };

  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <Link href={card.href} className="group block h-full">
        <div style={{ perspective: "1100px" }} className="h-full">
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`relative h-full overflow-hidden rounded-3xl border ${meta.border} bg-gradient-to-br from-white/[0.06] via-black/45 to-cyan-500/5 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.07)_50%,transparent_60%)]"
              animate={{ x: ["-50%", "120%"] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
                delay: index * 0.3,
              }}
            />
            <div
              className={`relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} ring-1 ring-white/10`}
              style={{ transform: "translateZ(24px)", boxShadow: "0 0 24px rgba(34,211,238,0.2)" }}
            >
              <Icon className={`h-5 w-5 ${meta.iconColor}`} />
            </div>
            <h3
              className="relative font-display text-lg font-bold text-white transition-colors group-hover:text-cyan-300"
              style={{ transform: "translateZ(20px)" }}
            >
              {card.title}
            </h3>
            <p
              className="relative mt-2 text-sm leading-relaxed text-slate-400"
              style={{ transform: "translateZ(14px)" }}
            >
              {card.desc}
            </p>
            <span
              className="relative mt-4 inline-flex items-center gap-1 text-xs font-bold text-cyan-400"
              style={{ transform: "translateZ(18px)" }}
            >
              Open guide <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.div>
        </div>
      </Link>
    </SectionReveal>
  );
}

function CryptoOrbitStage() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-[18%] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-gold-500/10 blur-2xl" />

      <motion.div
        className="absolute inset-[8%] rounded-full border border-cyan-400/20"
        animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-[12%] rounded-full border border-dashed border-cyan-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[22%] rounded-full border border-gold-400/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-[36%] origin-left bg-gradient-to-r from-cyan-400/70 to-transparent"
        style={{ translateX: "-0%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 via-navy-900 to-gold-500/20 shadow-[0_0_50px_rgba(34,211,238,0.3)] ring-1 ring-white/15"
          animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/90">Pay</span>
          <span className="font-display text-sm font-bold text-white">Crypto</span>
        </motion.div>
      </div>

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
                transition={{
                  duration: 3.4 + i * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                }}
              >
                <Mark className="h-8 w-8 drop-shadow-lg" id={`orbit-${asset.symbol}`} />
                <span className="mt-0.5 text-[9px] font-bold tracking-wider text-white/80">
                  {asset.symbol}
                </span>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}

      {Array.from({ length: 10 }).map((_, i) => (
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

function AssetLinkCard({
  asset,
  index,
}: {
  asset: (typeof cryptoAssets)[number];
  index: number;
}) {
  const meta = ASSET_META[asset.symbol as keyof typeof ASSET_META];
  if (!meta) return null;
  const { Mark, glow, ring, wash } = meta;
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -6, y: (px - 0.5) * 8 });
  };

  return (
    <SectionReveal delay={index * 0.06} className="h-full">
      <Link href={asset.href} className="group block h-full">
        <div style={{ perspective: "1000px" }} className="h-full">
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`relative flex h-full items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${wash} via-black/50 to-black/40 p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl ring-1 ${ring}`}
            style={{ transformStyle: "preserve-3d", boxShadow: `0 0 32px ${glow}` }}
          >
            <Mark className="h-12 w-12 shrink-0" id={`grid-${asset.symbol}`} />
            <div className="min-w-0" style={{ transform: "translateZ(16px)" }}>
              <p className="font-display text-lg font-bold text-white group-hover:text-cyan-300">
                {asset.name}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {asset.symbol} casino guide
              </p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-cyan-400 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.div>
        </div>
      </Link>
    </SectionReveal>
  );
}

export default function CryptoCasinoGuide({
  hideHeader = false,
  showAssetGrid = false,
  ctaHref = "/crypto",
  ctaLabel = "Explore Crypto Casinos",
}: {
  hideHeader?: boolean;
  showAssetGrid?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
}) {
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

        {showAssetGrid && (
          <div className={`${hideHeader ? "mb-12" : "mb-12 mt-10"} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
            {cryptoAssets.map((asset, i) => (
              <AssetLinkCard key={asset.symbol} asset={asset} index={i} />
            ))}
          </div>
        )}

        <div className={`${hideHeader && !showAssetGrid ? "" : hideHeader ? "" : "mt-12 "}grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
          <SectionReveal>
            <CryptoOrbitStage />
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {cryptoGuideCards.map((card, i) => (
              <GuideCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href={ctaHref} className="zb-btn-cyan zb-shine inline-flex items-center gap-2">
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
