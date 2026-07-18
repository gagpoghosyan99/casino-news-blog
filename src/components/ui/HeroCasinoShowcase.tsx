"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SYMBOLS = ["7", "★", "BAR", "◆", "A", "K"] as const;

function Reel({
  delay,
  spinning,
  stopAt,
}: {
  delay: number;
  spinning: boolean;
  stopAt: number;
}) {
  const loop = [...SYMBOLS, ...SYMBOLS, ...SYMBOLS];

  return (
    <div className="relative h-[168px] w-[72px] overflow-hidden rounded-xl border border-gold-400/35 bg-gradient-to-b from-[#1a1408] via-[#0c0a06] to-[#1a1408] shadow-[inset_0_0_24px_rgba(0,0,0,0.8)] sm:h-[196px] sm:w-[84px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-[52px] -translate-y-1/2 border-y border-gold-400/40 bg-gold-400/5 shadow-[0_0_30px_rgba(212,175,55,0.15)]" />

      <motion.div
        className="flex flex-col items-center"
        animate={
          spinning
            ? { y: [0, -SYMBOLS.length * 56] }
            : { y: -stopAt * 56 }
        }
        transition={
          spinning
            ? { duration: 0.55 + delay * 0.12, repeat: Infinity, ease: "linear" }
            : { type: "spring", stiffness: 120, damping: 18, delay: delay * 0.15 }
        }
      >
        {loop.map((sym, i) => (
          <div
            key={`${sym}-${i}`}
            className="flex h-[56px] w-full items-center justify-center font-numeric text-2xl font-black tracking-tight text-gold-300 sm:text-3xl"
            style={{
              textShadow: "0 0 18px rgba(244,197,66,0.45)",
            }}
          >
            {sym}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const CHIPS = [
  { label: "100", x: "-12%", y: "78%", rot: -18, delay: 0 },
  { label: "25", x: "78%", y: "82%", rot: 14, delay: 0.4 },
  { label: "500", x: "88%", y: "48%", rot: -8, delay: 0.8 },
];

/** Decorative 3D slot machine for PageHero right column — imitation only. */
export default function HeroCasinoShowcase() {
  const [spinning, setSpinning] = useState(true);
  const [stops, setStops] = useState([0, 2, 4]);

  useEffect(() => {
    let cancelled = false;

    const cycle = () => {
      if (cancelled) return;
      setSpinning(true);
      window.setTimeout(() => {
        if (cancelled) return;
        setStops([
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length),
        ]);
        setSpinning(false);
        window.setTimeout(cycle, 2800);
      }, 2200);
    };

    const start = window.setTimeout(cycle, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -12 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end"
      style={{ perspective: "1400px" }}
      aria-hidden
    >
      {/* Soft stage glow */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold-400/15 blur-3xl" />

      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [-6, 6, -6], rotateX: [4, 2, 4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Machine body */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-400/40 bg-gradient-to-br from-[#2a2110] via-[#12100c] to-[#0a0907] p-4 shadow-[0_40px_80px_rgba(0,0,0,0.65),0_0_60px_rgba(212,175,55,0.18),inset_0_1px_0_rgba(244,197,66,0.35)] sm:p-5">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent" />

          {/* Marquee */}
          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-gold-400/30 bg-black/50 px-3 py-2">
            <motion.span
              className="h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(244,197,66,0.9)]"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300">
              ZEONEBET · LIVE REELS
            </p>
            <motion.span
              className="h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(244,197,66,0.9)]"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>

          {/* Reels window */}
          <div className="relative rounded-2xl border border-gold-400/25 bg-black/60 p-3 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)]">
            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <Reel delay={0} spinning={spinning} stopAt={stops[0]} />
              <Reel delay={1} spinning={spinning} stopAt={stops[1]} />
              <Reel delay={2} spinning={spinning} stopAt={stops[2]} />
            </div>
          </div>

          {/* Payline + lever cue */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-black/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-500 via-[#f4c542] to-gold-400"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "45%" }}
                />
              </div>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-gold-400/80">
                {spinning ? "Spinning…" : "Hold · editorial preview"}
              </p>
            </div>
            <motion.div
              className="flex h-14 w-10 flex-col items-center justify-end rounded-full border border-gold-400/40 bg-gradient-to-b from-gold-400/30 to-black/40 pb-2 shadow-[0_0_24px_rgba(212,175,55,0.25)]"
              animate={{ y: spinning ? [0, 4, 0] : [0, -2, 0] }}
              transition={{ duration: spinning ? 0.35 : 2.2, repeat: Infinity }}
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#f4c542] to-gold-500 shadow-[0_0_14px_rgba(244,197,66,0.6)]" />
            </motion.div>
          </div>
        </div>

        {/* Floating chips */}
        {CHIPS.map((chip) => (
          <motion.div
            key={chip.label}
            className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-400/70 bg-gradient-to-br from-[#3a2f14] to-[#12100a] font-numeric text-[10px] font-bold text-gold-300 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.25)]"
            style={{ left: chip.x, top: chip.y, rotate: chip.rot }}
            animate={{ y: [0, -10, 0], rotate: [chip.rot, chip.rot + 12, chip.rot] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
          >
            {chip.label}
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Visual demo · not real play
      </p>
    </motion.div>
  );
}
