"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${(i * 19 + 5) % 97}%`,
  top: `${(i * 29 + 9) % 88}%`,
  size: 1 + (i % 4),
  duration: 3.8 + (i % 6) * 0.7,
  delay: (i % 9) * 0.28,
}));

const FLOATING_PLANES = [
  { w: 180, h: 120, x: "8%", y: "22%", rot: -18, delay: 0 },
  { w: 140, h: 90, x: "78%", y: "18%", rot: 14, delay: 0.4 },
  { w: 160, h: 100, x: "72%", y: "58%", rot: -10, delay: 0.8 },
  { w: 120, h: 80, x: "12%", y: "62%", rot: 22, delay: 1.2 },
];

/** Multi-depth gold atmosphere — orbital rings + floating planes (no blue). */
export default function PageHeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-15%,rgba(212,175,55,0.28),transparent_55%),radial-gradient(ellipse_55%_45%_at_0%_70%,rgba(184,150,46,0.12),transparent_50%),radial-gradient(ellipse_50%_40%_at_100%_40%,rgba(244,197,66,0.1),transparent_48%),linear-gradient(180deg,#02040a_0%,#060912_42%,#0a0e17_100%)]" />

      <div className="page-hero-perspective absolute inset-0 opacity-50">
        <div className="page-hero-vanishing-grid" />
      </div>

      <motion.div
        className="absolute -left-32 top-[10%] h-[480px] w-[480px] rounded-full bg-gold-400/20 blur-[120px]"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.12, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-[5%] h-[420px] w-[420px] rounded-full bg-[#f4c542]/14 blur-[110px]"
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1.05, 1, 1.05], x: [0, -25, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Orbital ring system — tilted in 3D space */}
      <div
        className="absolute left-[58%] top-[42%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 max-lg:left-1/2 max-lg:opacity-70"
        style={{ perspective: "900px" }}
      >
        <div style={{ transform: "rotateX(68deg)", transformStyle: "preserve-3d" }}>
          <motion.div
            className="absolute inset-0 rounded-full border border-gold-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[11%] rounded-full border border-dashed border-gold-400/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[26%] rounded-full border border-gold-300/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300 shadow-[0_0_20px_rgba(244,197,66,0.9)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 280px" }}
          />
        </div>
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300 shadow-[0_0_28px_rgba(244,197,66,0.85)]"
          animate={{ scale: [1, 1.45, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating glass planes */}
      <div className="absolute inset-0" style={{ perspective: "1200px" }}>
        {FLOATING_PLANES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-2xl border border-gold-400/25 bg-gradient-to-br from-gold-500/12 via-white/[0.04] to-transparent shadow-[0_24px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(244,197,66,0.22)]"
            style={{
              width: p.w,
              height: p.h,
              left: p.x,
              top: p.y,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -18, 0],
              rotateX: [8, 14, 8],
              rotateY: [p.rot, p.rot + 8, p.rot],
              opacity: [0.4, 0.72, 0.4],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${6 + p.size * 2}px rgba(244,197,66,0.55)`,
          }}
          animate={{
            opacity: [0.12, 0.95, 0.12],
            y: [0, -22 - (p.id % 5) * 3, 0],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute -left-1/4 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-gold-400/8 to-transparent"
        animate={{ x: ["-20%", "180%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-950/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0e17] to-transparent" />
    </div>
  );
}
