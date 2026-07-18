"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { GLOBAL_JACKPOT_TOTAL } from "@/data/landing-home";
import HolographicGlobe from "./HolographicGlobe";

const trustBadges = ["Verified Operators", "Licensed Platforms", "Real Winner Reports"];

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden zb-page-bg pb-20 pt-6 md:pb-28 md:pt-10">
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-30" />
      <div className="hero-orb hero-orb-gold" />
      <div className="hero-orb hero-orb-emerald" style={{ background: "rgba(34, 211, 238, 0.06)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Jackpot tracker — floating above globe */}
        <motion.div
          className="relative z-20 mx-auto mb-2 max-w-xl text-center"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400/80 sm:text-xs">
            Live Global Jackpot
          </p>
          <p className="mt-1 font-numeric text-3xl font-bold text-gold-400 sm:text-4xl md:text-5xl">
            $<AnimatedCounter value={GLOBAL_JACKPOT_TOTAL} duration={2.2} />
          </p>
        </motion.div>

        {/* Globe centerpiece */}
        <motion.div
          className="relative z-10 mx-auto max-w-3xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <HolographicGlobe />
        </motion.div>

        {/* Headline + copy below globe */}
        <motion.div
          className="relative z-20 mx-auto mt-6 max-w-3xl text-center md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Casino Intelligence Platform
          </p>
          <h1 className="mt-3 zb-headline leading-tight">
            Trusted Casino Intelligence for{" "}
            <span className="zb-gradient-text">South Asia</span> &amp; Global Players
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
            Trusted casino reviews, jackpot reports, exclusive bonuses, and verified operator rankings
            for global players.
          </p>

          {/* Stats bar */}
          <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 backdrop-blur-sm sm:text-sm">
            <span>
              <span className="text-gold-400">2M+</span> Active Users
            </span>
            <span className="hidden text-white/20 sm:inline">|</span>
            <span>
              <span className="text-cyan-400">500+</span> Verified Casinos
            </span>
          </div>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-300"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/casinos" className="zb-btn-gold zb-shine w-full text-center sm:w-auto">
              Explore Trusted Casinos
            </Link>
            <Link href="/#bonuses" className="zb-btn-ghost w-full text-center sm:w-auto">
              Claim Bonuses
            </Link>
            <Link href="/#jackpots" className="zb-btn-ghost w-full text-center sm:w-auto">
              View Jackpot Winners
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
