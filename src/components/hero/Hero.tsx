"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Bitcoin,
  Coins,
  ShieldCheck,
  Trophy,
  Zap,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { GLOBAL_JACKPOT_TOTAL } from "@/data/landing-home";
import FloatingCard from "./FloatingCard";
import HeroBackground from "./HeroBackground";
import Navbar from "./Navbar";
import RevealLayer from "./RevealLayer";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 640px)");
    const update = () => setReduceMotion(mq.matches || narrow.matches);
    update();
    mq.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ height: "100dvh" }}
      aria-label="ZEONEBET casino intelligence hero"
    >
      <Navbar />

      {/* Spotlight layers */}
      <RevealLayer
        disabled={reduceMotion}
        base={<HeroBackground variant="base" />}
        reveal={<HeroBackground variant="reveal" />}
      />

      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,6,13,0.55)_100%)]" />

      {/* Floating UI cards */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
        <FloatingCard
          title="Live Global Jackpot"
          value={`$${GLOBAL_JACKPOT_TOTAL.toLocaleString()}+`}
          icon={Zap}
          variant="gold"
          className="absolute left-[4%] top-[22%] w-44 animate-heroFadeUp lg:w-52"
          delay={0}
        />
        <FloatingCard
          title="Verified Operators"
          icon={ShieldCheck}
          className="absolute right-[5%] top-[20%] w-40 animate-heroFadeUp lg:w-44"
          delay={0.3}
        />
        <FloatingCard
          title="Licensed Platforms"
          icon={BadgeCheck}
          className="absolute left-[6%] bottom-[28%] w-40 animate-heroFadeUp lg:w-44"
          delay={0.6}
        />
        <FloatingCard
          title="Latest Winner"
          subtitle="India"
          value="$74,000 Won"
          icon={Trophy}
          variant="gold"
          className="absolute right-[6%] bottom-[30%] w-44 animate-heroFadeUp lg:w-48"
          delay={0.9}
        />
        <FloatingCard
          title="Crypto Accepted"
          badges={["BTC", "ETH", "USDT", "SOL"]}
          icon={Bitcoin}
          variant="cyan"
          className="absolute bottom-[18%] left-1/2 w-52 -translate-x-1/2 animate-heroFadeUp"
          delay={1.2}
        />
      </div>

      {/* Mobile compact cards */}
      <div className="pointer-events-none absolute inset-x-0 top-20 z-10 flex justify-between px-3 sm:hidden">
        <FloatingCard
          title="Jackpot"
          value={`$${(GLOBAL_JACKPOT_TOTAL / 1_000_000).toFixed(1)}M+`}
          icon={Coins}
          variant="gold"
          className="w-[46%] text-[10px]"
        />
        <FloatingCard
          title="Winner"
          subtitle="India"
          value="$74K"
          icon={Trophy}
          className="w-[46%] text-[10px]"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6">
        <p
          className="animate-heroReveal text-xs font-bold uppercase tracking-[0.3em] text-cyan-400"
          style={{ animationDelay: "0.1s" }}
        >
          Premium Casino Intelligence
        </p>

        <h1 className="mt-4 max-w-4xl">
          <span
            className="animate-heroReveal block font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.2s" }}
          >
            Casino Intelligence
          </span>
          <span
            className="animate-heroReveal mt-1 block font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="zb-gradient-text">Built for Winners</span>
          </span>
        </h1>

        <p
          className="animate-heroFadeUp mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg"
          style={{ animationDelay: "0.5s" }}
        >
          Discover verified casinos, real jackpot winners, exclusive bonuses, crypto payment guides,
          and trusted rankings before you play.
        </p>

        {/* Jackpot inline on desktop center */}
        <div
          className="animate-heroFadeUp mt-6 hidden rounded-2xl border border-gold-500/30 bg-white/[0.06] px-6 py-3 backdrop-blur-xl sm:inline-block"
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-gold-300/80">
            Live Global Jackpot
          </p>
          <p className="font-display text-2xl font-bold text-gold-400 md:text-3xl">
            $<AnimatedCounter value={GLOBAL_JACKPOT_TOTAL} duration={2} />+
          </p>
        </div>

        {/* Trust row */}
        <div
          className="animate-heroFadeUp mt-5 flex flex-wrap justify-center gap-2"
          style={{ animationDelay: "0.7s" }}
        >
          {["Verified Operators", "Licensed Platforms", "Real Winner Reports", "Secure Payments"].map(
            (badge) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-medium text-cyan-300 sm:text-xs"
              >
                ✓ {badge}
              </span>
            )
          )}
        </div>

        {/* CTAs */}
        <div
          className="animate-heroFadeUp mt-8 flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          style={{ animationDelay: "0.85s" }}
        >
          <Link href="/casinos" className="shine-button zb-btn-gold w-full text-center sm:w-auto">
            Explore Trusted Casinos
          </Link>
          <Link href="/#bonuses" className="zb-btn-cyan w-full text-center sm:w-auto">
            Claim Bonuses
          </Link>
          <Link href="/#jackpots" className="zb-btn-ghost w-full text-center sm:w-auto">
            View Jackpot Winners
          </Link>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-500 sm:text-xs">
          Move cursor to reveal the luxury casino world
        </p>
      </div>
    </section>
  );
}
