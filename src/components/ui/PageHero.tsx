"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: ReactNode;
  tone?: "gold" | "cyan" | "emerald";
}

const toneText = {
  gold: "text-gold-400",
  cyan: "text-gold-400",
  emerald: "text-emerald-400",
} as const;

export default function PageHero({
  kicker,
  title,
  description,
  badges = [],
  actions,
  tone = "gold",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(212,175,55,0.18),transparent_45%),radial-gradient(ellipse_at_90%_40%,rgba(184,150,46,0.1),transparent_40%)]" />
      <div className="hero-orb hero-orb-gold opacity-50" />
      <div className="hero-orb hero-orb-emerald opacity-30" />

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-400/60"
          style={{ left: `${10 + i * 8}%`, top: `${30 + (i % 4) * 10}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -12, 0] }}
          transition={{ duration: 3.5 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-xs font-bold uppercase tracking-[0.25em] ${toneText[tone]}`}
        >
          {kicker}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-3 max-w-4xl zb-headline text-3xl sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14 }}
          className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          {description}
        </motion.p>
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold-400/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.12)]"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        )}
        {actions && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {actions}
          </motion.div>
        )}
      </div>
    </section>
  );
}
