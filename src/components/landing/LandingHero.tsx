"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { GLOBAL_JACKPOT_TOTAL } from "@/data/landing-home";

const trustBadges = ["Verified Operators", "Licensed Platforms", "Real Winner Reports"];

function HolographicGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg">
      <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-navy-900/80 to-gold-500/10 shadow-glow-cyan"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.35),transparent_55%)]" />
        <div className="absolute inset-[18%] rounded-full border border-white/10" />
        <div className="absolute inset-[32%] rounded-full border border-dashed border-cyan-400/20" />
        {/* South Asia highlight dots */}
        {[
          { top: "42%", left: "58%" },
          { top: "48%", left: "52%" },
          { top: "38%", left: "62%" },
          { top: "55%", left: "48%" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            style={{ top: pos.top, left: pos.left }}
          />
        ))}
      </motion.div>
      {/* Floating coins */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-navy-950 shadow-glow-gold"
          style={{ top: `${15 + i * 25}%`, left: i === 1 ? "5%" : "85%" }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          $
        </motion.div>
      ))}
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden zb-page-bg pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-40" />
      <div className="hero-orb hero-orb-gold" />
      <div className="hero-orb hero-orb-emerald" style={{ background: "rgba(34, 211, 238, 0.06)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Casino Intelligence Platform
            </p>
            <h1 className="mt-4 zb-headline leading-tight">
              South Asia&apos;s Premium{" "}
              <span className="zb-gradient-text">Casino Intelligence</span> &amp; Global Trust Platform
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              Trusted casino reviews, jackpot reports, exclusive bonuses, and verified operator rankings
              for global players.
            </p>

            <div className="mt-8 zb-glass-gold inline-block rounded-2xl px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-300/80">
                Live Global Jackpot
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-gold-400 md:text-4xl">
                $<AnimatedCounter value={GLOBAL_JACKPOT_TOTAL} duration={2.2} />
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-300"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/casinos" className="zb-btn-gold zb-shine text-center">
                Explore Trusted Casinos
              </Link>
              <Link href="/#bonuses" className="zb-btn-cyan text-center">
                Claim Exclusive Bonuses
              </Link>
              <Link href="/#jackpots" className="zb-btn-ghost text-center">
                View Live Jackpot Winners
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HolographicGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
