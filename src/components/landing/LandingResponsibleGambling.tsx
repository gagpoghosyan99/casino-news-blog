"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Ban,
  CircleHelp,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { responsibleGamblingQuickLinks } from "@/data/legal";
import SectionReveal from "./SectionReveal";

const cardThemes = [
  {
    icon: ShieldCheck,
    glow: "rgba(16,185,129,0.35)",
    ring: "ring-emerald-400/35",
    badge: "Guide",
    gradient: "from-emerald-500/20 via-transparent to-cyan-500/10",
  },
  {
    icon: Ban,
    glow: "rgba(52,211,153,0.3)",
    ring: "ring-emerald-300/30",
    badge: "18+",
    gradient: "from-teal-500/20 via-transparent to-emerald-500/10",
  },
  {
    icon: HeartHandshake,
    glow: "rgba(34,211,238,0.28)",
    ring: "ring-cyan-400/30",
    badge: "Care",
    gradient: "from-cyan-500/15 via-transparent to-emerald-500/10",
  },
  {
    icon: CircleHelp,
    glow: "rgba(212,175,55,0.25)",
    ring: "ring-gold-400/25",
    badge: "Trust",
    gradient: "from-gold-500/15 via-transparent to-emerald-500/10",
  },
] as const;

function SafetyOrb() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 hidden h-48 w-48 lg:block">
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-3 rounded-full border border-emerald-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-dashed border-cyan-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 to-cyan-500/10 ring-1 ring-emerald-400/40 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck className="h-7 w-7 text-emerald-300" />
      </motion.div>
    </div>
  );
}

function SafetyCard({
  item,
  index,
}: {
  item: (typeof responsibleGamblingQuickLinks)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const theme = cardThemes[index] ?? cardThemes[0];
  const Icon = theme.icon;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -9, y: (px - 0.5) * 11 });
  };

  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <div style={{ perspective: "1100px" }} className="h-full">
        <Link href={item.href} className="group block h-full">
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            whileHover={{ y: -6 }}
            className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${theme.gradient} p-5 backdrop-blur-xl`}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04), 0 0 36px ${theme.glow}`,
            }}
          >
            {/* Soft light sweep */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              style={{ transform: "translateZ(8px)" }}
            />

            <div className="relative flex items-start justify-between" style={{ transform: "translateZ(28px)" }}>
              <motion.div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-black/35 ring-1 ${theme.ring}`}
                style={{ boxShadow: `0 0 24px ${theme.glow}` }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-5 w-5 text-emerald-300" />
              </motion.div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300/80">
                {theme.badge}
              </span>
            </div>

            <h3
              className="relative mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-emerald-200"
              style={{ transform: "translateZ(22px)" }}
            >
              {item.title}
            </h3>
            <p
              className="relative mt-2 text-sm leading-relaxed text-slate-400"
              style={{ transform: "translateZ(16px)" }}
            >
              {item.desc}
            </p>

            <span
              className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400"
              style={{ transform: "translateZ(20px)" }}
            >
              Learn more
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>

            <div className="pointer-events-none absolute -bottom-12 -right-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-3xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        </Link>
      </div>
    </SectionReveal>
  );
}

export default function LandingResponsibleGambling() {
  return (
    <section className="relative zb-section overflow-hidden border-t border-emerald-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(16,185,129,0.1),transparent_50%),radial-gradient(ellipse_at_85%_80%,rgba(34,211,238,0.06),transparent_45%)]" />

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-emerald-300/60"
          style={{ left: `${10 + ((i * 11) % 80)}%`, top: `${15 + ((i * 14) % 65)}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -12, 0] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="relative pr-0 lg:pr-52">
            <SafetyOrb />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Player Safety</p>
            <h2 className="mt-2 zb-headline">Responsible Gambling</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              ZEONEBET promotes informed, safer play. Gambling should be entertainment — never a financial strategy.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {responsibleGamblingQuickLinks.map((item, i) => (
            <SafetyCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* HIGH-VISIBILITY 18+ compliance banner — must stay obvious */}
        <SectionReveal delay={0.2}>
          <aside
            aria-label="Age restriction and responsible gambling notice"
            className="relative mt-14 overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-amber-500 via-[#f4c542] to-amber-400 shadow-[0_0_0_4px_rgba(244,197,66,0.25),0_20px_60px_rgba(244,197,66,0.35)]"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.35)_50%,transparent_60%)]"
              animate={{ x: ["-40%", "140%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            />

            <div className="relative flex flex-col items-center gap-5 px-5 py-8 text-center sm:px-8 sm:py-10 md:flex-row md:text-left">
              <motion.div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy-950 text-amber-300 shadow-[0_0_30px_rgba(0,0,0,0.35)] ring-4 ring-navy-950/20 sm:h-24 sm:w-24"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              >
                <span className="font-display text-3xl font-black tracking-tight sm:text-4xl">18+</span>
              </motion.div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-navy-950/65">
                  Mandatory Player Notice
                </p>
                <p className="font-notice mt-2 text-2xl text-navy-950 sm:text-3xl md:text-[2.15rem]">
                  18+ only. Set deposit limits, take breaks, and seek help if gambling affects your life.
                </p>
                <p className="mt-3 font-display text-sm font-medium tracking-wide text-navy-950/70 sm:text-base">
                  Gambling should be entertainment — never a way to make money. Play safely.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:min-w-[220px]">
                <a
                  href="https://www.begambleaware.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-950 px-6 py-3.5 text-sm font-bold text-amber-300 shadow-lg transition-transform hover:scale-[1.03] hover:text-amber-200 active:scale-95"
                >
                  BeGambleAware.org
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/responsible-gambling"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy-950/80 bg-white/90 px-6 py-3.5 text-sm font-bold text-navy-950 transition-transform hover:scale-[1.03] hover:bg-white active:scale-95"
                >
                  Full Safety Guide
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </aside>
        </SectionReveal>
      </div>
    </section>
  );
}
