"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Flame, Sparkles, Trophy, Zap } from "lucide-react";
import { jackpotWins } from "@/data/jackpots";
import { countryFlags, GLOBAL_JACKPOT_TOTAL } from "@/data/landing-home";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import SectionReveal from "./SectionReveal";

function useCountUp(value: number, duration = 1.8, enabled = true) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, enabled]);

  return display;
}

function RollingAmount({
  amount,
  currency,
  active,
  large = false,
}: {
  amount: number;
  currency: string;
  active: boolean;
  large?: boolean;
}) {
  const value = useCountUp(amount, large ? 2.2 : 1.6, active);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <motion.p
      className={`font-notice tracking-tight text-gold-300 ${
        large ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
      }`}
      animate={
        active
          ? {
              textShadow: [
                "0 0 12px rgba(212,175,55,0.2)",
                "0 0 28px rgba(244,197,66,0.55)",
                "0 0 12px rgba(212,175,55,0.2)",
              ],
            }
          : undefined
      }
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      {formatted}
    </motion.p>
  );
}

function WinnerCard({
  win,
  index,
  featured,
}: {
  win: (typeof jackpotWins)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 });
  };

  return (
    <SectionReveal delay={index * 0.08} className="h-full min-w-[300px] snap-center md:min-w-0">
      <div style={{ perspective: "1300px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            y: featured ? -12 : 0,
            scale: featured ? 1.03 : 1,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${
            featured
              ? "border-gold-400/60 bg-gradient-to-br from-gold-500/20 via-black/55 to-cyan-500/10 shadow-[0_25px_80px_rgba(212,175,55,0.35),0_0_50px_rgba(244,197,66,0.2)]"
              : win.isRecord
                ? "border-gold-500/40 bg-gradient-to-br from-gold-500/12 via-black/50 to-amber-500/5 shadow-[0_18px_50px_rgba(212,175,55,0.22)]"
                : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/45 to-gold-500/5 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Confetti sparks */}
          {Array.from({ length: featured || win.isRecord ? 8 : 4 }).map((_, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-300"
              style={{ left: `${12 + i * 11}%`, top: `${18 + (i % 4) * 16}%` }}
              animate={{ opacity: [0, 1, 0], y: [0, -18, -30], scale: [0.6, 1.2, 0.4] }}
              transition={{ duration: 2.2 + (i % 3) * 0.4, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}

          {/* Shine */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.1)_50%,transparent_65%)]"
            animate={{ x: ["-70%", "130%"] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.8, delay: index * 0.3 }}
          />

          <div className="relative flex items-start gap-3" style={{ transform: "translateZ(30px)" }}>
            <motion.div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 ring-1 ring-gold-400/50"
              style={{ boxShadow: "0 0 28px rgba(212,175,55,0.4)" }}
              animate={{ rotate: [0, -6, 6, 0], y: [0, -3, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {win.isRecord ? (
                <Crown className="h-5 w-5 text-gold-300" />
              ) : (
                <Trophy className="h-5 w-5 text-gold-400" />
              )}
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{win.playerNickname}</p>
              <p className="mt-0.5 text-sm text-slate-400">
                {countryFlags[win.countryCode] ?? "🌐"} {win.country}
              </p>
            </div>
            {win.isRecord && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-navy-950 shadow-[0_0_16px_rgba(244,197,66,0.5)]">
                <Flame className="h-3 w-3" /> Record
              </span>
            )}
            {featured && !win.isRecord && (
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                <Sparkles className="h-3 w-3" /> Spotlight
              </span>
            )}
          </div>

          <div className="relative mt-7" style={{ transform: "translateZ(40px)" }}>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500/80">
              Amount Won
            </p>
            <RollingAmount
              amount={win.amount}
              currency={win.currency}
              active={inView}
              large={featured || win.isRecord}
            />
          </div>

          <p className="relative mt-3 text-sm text-slate-400" style={{ transform: "translateZ(18px)" }}>
            <span className="font-semibold text-slate-300">{win.casinoName}</span>
            <span className="mx-1.5 text-slate-600">·</span>
            {win.gameName}
          </p>

          <Link
            href={`/go/${win.casinoSlug}`}
            rel={AFFILIATE_LINK_REL}
            target="_blank"
            className="zb-btn-gold zb-shine relative mt-auto inline-flex w-full items-center justify-center gap-2 pt-6 text-center text-sm"
            style={{ transform: "translateZ(34px)" }}
          >
            <Zap className="h-4 w-4" />
            Claim Like Winners
          </Link>

          <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
        </motion.div>
      </div>
    </SectionReveal>
  );
}

function LiveJackpotBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const total = useCountUp(GLOBAL_JACKPOT_TOTAL, 2.4, inView);

  return (
    <SectionReveal>
      <div
        ref={ref}
        className="relative mb-10 overflow-hidden rounded-3xl border border-gold-400/40 bg-gradient-to-r from-gold-500/15 via-black/60 to-cyan-500/10 px-5 py-6 shadow-[0_0_50px_rgba(212,175,55,0.2)] backdrop-blur-xl sm:px-8"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]"
          animate={{ x: ["-50%", "130%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        <div className="relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live Global Jackpot Pool
            </p>
            <p className="font-notice mt-2 text-4xl text-gold-300 sm:text-5xl md:text-6xl">
              ${total.toLocaleString()}
              <span className="text-gold-500">+</span>
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Watch real-time style winner reports from South Asia and global play — then claim at trusted operators.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function JackpotWinners({ hideHeader = false }: { hideHeader?: boolean }) {
  const winners = jackpotWins.slice(0, 6);

  return (
    <section id="jackpots" className="relative zb-section overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(212,175,55,0.14),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.06),transparent_45%)]" />

      {/* Gold rain */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold-400/70"
          style={{ left: `${(i * 5.5) % 100}%`, top: "-4%" }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 1, 0.8, 0], rotate: [0, 180] }}
          transition={{
            duration: 5 + (i % 5),
            repeat: Infinity,
            delay: i * 0.35,
            ease: "linear",
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <SectionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Live Winners</p>
            <h2 className="mt-2 zb-headline">Jackpot Winners Feed</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Verified-style winner reports from global casino play — our most exciting intelligence layer.
            </p>
          </SectionReveal>
        )}

        <div className={hideHeader ? "" : "mt-10"}>
          <LiveJackpotBoard />
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {winners.map((win, i) => (
            <WinnerCard key={win.id} win={win} index={i} featured={i === 0 || i === 5} />
          ))}
        </div>
      </div>
    </section>
  );
}
