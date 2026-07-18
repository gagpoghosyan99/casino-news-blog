"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { partnersHero, trustStrip } from "@/data/partners/content";

const NODES = [
  { label: "Media", x: "18%", y: "22%" },
  { label: "Casinos", x: "72%", y: "18%" },
  { label: "Technology", x: "78%", y: "58%" },
  { label: "Content", x: "22%", y: "68%" },
  { label: "Offers", x: "48%", y: "78%" },
  { label: "Players", x: "50%", y: "38%" },
];

export default function PartnersHero() {
  const reduce = useReducedMotion();

  return (
    <section id="overview" className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.2),transparent_55%),linear-gradient(180deg,#02040a_0%,#060912_50%,#0a0e17_100%)]" />
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:pb-16 lg:pt-32">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
            {partnersHero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-[0.02em] text-white sm:text-4xl lg:text-[2.75rem]">
            {partnersHero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {partnersHero.description}
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <a
              href={partnersHero.primaryCta.href}
              className="group relative overflow-hidden rounded-2xl border border-gold-400/50 bg-gradient-to-br from-gold-500/25 to-gold-500/5 p-4 shadow-[0_0_32px_rgba(212,175,55,0.15)] transition hover:border-gold-300"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">Path 01</p>
              <p className="mt-1.5 font-display text-lg font-bold text-white">{partnersHero.primaryCta.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Business offers · For companies
              </p>
              <span className="mt-3 inline-flex text-sm font-semibold text-gold-300 group-hover:text-gold-200">
                Choose company →
              </span>
            </a>
            <a
              href={partnersHero.secondaryCta.href}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/[0.04] p-4 transition hover:border-gold-400/40 hover:bg-white/[0.07]"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Path 02</p>
              <p className="mt-1.5 font-display text-lg font-bold text-white">{partnersHero.secondaryCta.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Player options · For customers
              </p>
              <span className="mt-3 inline-flex text-sm font-semibold text-gold-400 group-hover:text-gold-300">
                Choose customer →
              </span>
            </a>
          </div>

          <a
            href={partnersHero.tertiaryCta.href}
            className="mt-5 inline-flex text-sm font-semibold text-gold-400 hover:text-gold-300"
          >
            {partnersHero.tertiaryCta.label} →
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <div className="absolute inset-8 rounded-full border border-gold-400/15" />
          <div className="absolute inset-16 rounded-full border border-dashed border-gold-400/20" />
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            <svg className="h-full w-full" viewBox="0 0 400 400" aria-hidden>
              <circle cx="200" cy="200" r="2" fill="rgba(244,197,66,0.9)" />
              {NODES.map((n, i) => {
                const angle = (i / NODES.length) * Math.PI * 2;
                const x = 200 + Math.cos(angle) * 120;
                const y = 200 + Math.sin(angle) * 120;
                return (
                  <line
                    key={n.label}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="rgba(212,175,55,0.25)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </motion.div>
          {NODES.map((n, i) => (
            <motion.div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/35 bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-300 shadow-[0_0_24px_rgba(212,175,55,0.15)] backdrop-blur-md"
              style={{ left: n.x, top: n.y }}
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {n.label}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {trustStrip.map((item) => (
            <div key={item.id} className="min-w-0">
              <p className="text-sm font-semibold text-gold-300">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-4 text-[11px] text-slate-600 sm:px-6 lg:px-8">
          No invented traffic, revenue, or ranking claims. Campaign metrics are agreed per partnership.{" "}
          <Link href="/affiliate-disclosure" className="text-gold-500 hover:text-gold-400">
            Affiliate disclosure
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
