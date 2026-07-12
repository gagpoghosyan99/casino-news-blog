"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  HeartHandshake,
  Lock,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import SectionReveal from "./SectionReveal";
import { trustIndicators } from "@/data/landing-home";

const iconMap = {
  shield: ShieldCheck,
  license: ScrollText,
  trophy: Trophy,
  star: BadgeCheck,
  lock: Lock,
  heart: HeartHandshake,
} as const;

const toneStyles = {
  shield: {
    icon: "text-gold-300",
    ring: "ring-gold-400/45",
    bg: "bg-gold-500/15",
    glow: "rgba(212,175,55,0.45)",
    border: "border-gold-400/35",
    wash: "from-gold-500/18 via-black/50 to-cyan-500/8",
  },
  license: {
    icon: "text-cyan-300",
    ring: "ring-cyan-400/40",
    bg: "bg-cyan-500/15",
    glow: "rgba(34,211,238,0.4)",
    border: "border-cyan-400/30",
    wash: "from-cyan-500/15 via-black/50 to-gold-500/8",
  },
  trophy: {
    icon: "text-gold-300",
    ring: "ring-gold-400/45",
    bg: "bg-gold-500/15",
    glow: "rgba(244,197,66,0.45)",
    border: "border-gold-400/35",
    wash: "from-gold-500/18 via-black/50 to-amber-500/8",
  },
  star: {
    icon: "text-cyan-300",
    ring: "ring-cyan-400/40",
    bg: "bg-cyan-500/15",
    glow: "rgba(34,211,238,0.38)",
    border: "border-cyan-400/30",
    wash: "from-cyan-500/14 via-black/50 to-white/[0.04]",
  },
  lock: {
    icon: "text-emerald-300",
    ring: "ring-emerald-400/40",
    bg: "bg-emerald-500/15",
    glow: "rgba(52,211,153,0.4)",
    border: "border-emerald-400/30",
    wash: "from-emerald-500/14 via-black/50 to-cyan-500/6",
  },
  heart: {
    icon: "text-emerald-300",
    ring: "ring-emerald-400/40",
    bg: "bg-emerald-500/15",
    glow: "rgba(16,185,129,0.38)",
    border: "border-emerald-400/30",
    wash: "from-emerald-500/14 via-black/50 to-gold-500/6",
  },
} as const;

function TrustCard({
  item,
  index,
}: {
  item: (typeof trustIndicators)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = iconMap[item.icon];
  const tone = toneStyles[item.icon];
  const featured = index === 0 || index === 2;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 });
  };

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <div style={{ perspective: "1200px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            y: featured ? -6 : 0,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${tone.border} bg-gradient-to-br ${tone.wash} ${
            featured
              ? "shadow-[0_22px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(212,175,55,0.12)]"
              : "shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.09)_50%,transparent_65%)]"
            animate={{ x: ["-70%", "130%"] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2.2,
              delay: index * 0.35,
            }}
          />

          <div
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-60 blur-3xl"
            style={{ background: tone.glow }}
          />

          <div className="relative flex items-start justify-between gap-3" style={{ transform: "translateZ(32px)" }}>
            <motion.div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tone.bg} ring-1 ${tone.ring}`}
              style={{ boxShadow: `0 0 28px ${tone.glow}` }}
              animate={{ y: [0, -5, 0], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className={`h-6 w-6 ${tone.icon}`} strokeWidth={1.75} />
            </motion.div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              0{index + 1}
            </span>
          </div>

          <h3
            className="relative mt-5 font-display text-xl font-bold text-white"
            style={{ transform: "translateZ(26px)" }}
          >
            {item.title}
          </h3>
          <p
            className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400"
            style={{ transform: "translateZ(18px)" }}
          >
            {item.desc}
          </p>

          <div
            className="relative mt-5 flex items-center gap-2 border-t border-white/10 pt-4"
            style={{ transform: "translateZ(22px)" }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${tone.bg} ring-1 ${tone.ring}`} />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Editorial verified
            </span>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}

export default function TrustIndicators() {
  return (
    <section className="relative zb-section overflow-hidden border-y border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.12),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(34,211,238,0.08),transparent_45%)]" />

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-400/50"
          style={{ left: `${8 + i * 7.5}%`, top: `${20 + (i % 5) * 12}%` }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              <Sparkles className="h-3.5 w-3.5" />
              Premium Trust Indicators
            </p>
            <h2 className="mt-3 zb-headline">Why players trust ZEONEBET</h2>
            <p className="mt-3 text-slate-400">
              Six editorial pillars behind every ranking, review, and winner report on the platform.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="relative mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-gold-400/30 bg-gradient-to-r from-gold-500/10 via-black/50 to-cyan-500/10 px-5 py-4 shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-xl sm:gap-6">
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
              animate={{ x: ["-40%", "120%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />
            {[
              { label: "Operators reviewed", value: "40+" },
              { label: "Editorial pillars", value: "6" },
              { label: "Trust standard", value: "18+" },
            ].map((stat) => (
              <div key={stat.label} className="relative text-center">
                <p className="font-notice text-2xl text-gold-300 sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustIndicators.map((item, i) => (
            <TrustCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
