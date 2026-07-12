"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Clock3, Gift, Sparkles, Zap } from "lucide-react";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import { bonusOffers } from "@/data/bonuses";
import SectionReveal from "./SectionReveal";

function Countdown({ seed }: { seed: number }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = Date.now() + (seed + 1) * 3_600_000;
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seed]);

  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-black/40 px-2.5 py-1 font-mono text-xs font-bold text-gold-300 backdrop-blur-sm">
      <Clock3 className="h-3.5 w-3.5 animate-pulse" />
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

function BonusCard({
  offer,
  index,
  featured,
}: {
  offer: (typeof bonusOffers)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -9, y: (px - 0.5) * 11 });
  };

  return (
    <SectionReveal delay={index * 0.1} className="h-full">
      <div style={{ perspective: "1200px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{ rotateX: tilt.x, rotateY: tilt.y, y: featured ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${
            featured
              ? "border-gold-400/50 bg-gradient-to-br from-gold-500/15 via-black/50 to-cyan-500/10 shadow-[0_20px_60px_rgba(212,175,55,0.28),0_0_40px_rgba(212,175,55,0.15)]"
              : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/40 to-gold-500/5 shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Shine sweep */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)]"
            animate={{ x: ["-60%", "120%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2, delay: index * 0.4 }}
          />

          {featured && (
            <div
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-navy-950"
              style={{ transform: "translateZ(36px)" }}
            >
              <Sparkles className="h-3 w-3" /> Hot
            </div>
          )}

          <div className="relative flex items-center justify-between" style={{ transform: "translateZ(28px)" }}>
            <motion.div
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 ring-1 ring-gold-400/40"
              style={{ boxShadow: "0 0 24px rgba(212,175,55,0.3)" }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Gift className="h-5 w-5 text-gold-400" />
            </motion.div>
            <Countdown seed={index} />
          </div>

          <h3
            className="relative mt-5 font-display text-2xl font-bold text-white"
            style={{ transform: "translateZ(24px)" }}
          >
            {offer.casinoName}
          </h3>
          <p
            className="font-notice relative mt-3 text-xl text-gold-300 sm:text-2xl"
            style={{ transform: "translateZ(22px)" }}
          >
            {offer.value}
          </p>
          <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400" style={{ transform: "translateZ(16px)" }}>
            {offer.title}
          </p>
          <p className="relative mt-3 text-[11px] uppercase tracking-wider text-slate-500" style={{ transform: "translateZ(14px)" }}>
            Wagering: {offer.wagering}
          </p>

          <div className="relative mt-6 flex flex-col gap-2.5" style={{ transform: "translateZ(30px)" }}>
            <Link
              href={`/go/${offer.casinoSlug}`}
              rel={AFFILIATE_LINK_REL}
              target="_blank"
              className="zb-btn-gold zb-shine inline-flex items-center justify-center gap-2 text-center text-sm"
            >
              <Zap className="h-4 w-4" />
              Claim Now
            </Link>
            <Link
              href={`/blogs/review-${offer.casinoSlug}`}
              className="zb-btn-ghost text-center text-sm"
            >
              View Bonus Details
            </Link>
          </div>

          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
        </motion.div>
      </div>
    </SectionReveal>
  );
}

export default function BonusPromotions({ hideHeader = false }: { hideHeader?: boolean }) {
  const offers = bonusOffers.slice(0, 3);

  return (
    <section id="bonuses" className="relative zb-section overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.1),transparent_55%)]" />

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-400/50"
          style={{ left: `${8 + ((i * 9) % 84)}%`, top: `${12 + ((i * 13) % 70)}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -14, 0] }}
          transition={{ duration: 2.8 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <SectionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Limited-Time Offers</p>
            <h2 className="mt-2 zb-headline">Bonuses &amp; Promotions</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Premium bonus cards with urgency timers — always verify terms on the operator site.
            </p>
          </SectionReveal>
        )}

        <div className={`${hideHeader ? "" : "mt-12 "}grid gap-6 md:grid-cols-3 md:items-stretch`}>
          {offers.map((offer, i) => (
            <BonusCard key={offer.id} offer={offer} index={i} featured={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
