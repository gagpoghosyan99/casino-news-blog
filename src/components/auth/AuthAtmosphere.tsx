"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 96}%`,
  top: `${(i * 23 + 11) % 90}%`,
  size: 1 + (i % 3),
  duration: 4 + (i % 5),
  delay: (i % 8) * 0.35,
}));

/** Full-bleed animated navy + gold atmosphere for auth pages. No blue. */
export default function AuthAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(212,175,55,0.22),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(184,150,46,0.1),transparent_50%),radial-gradient(ellipse_45%_35%_at_90%_30%,rgba(244,197,66,0.08),transparent_45%),linear-gradient(180deg,#03050c_0%,#060912_45%,#0a0e17_100%)]" />

      <div className="auth-grid-drift absolute inset-0 opacity-[0.35]" />

      <motion.div
        className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-gold-400/15 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-1/4 h-[380px] w-[380px] rounded-full bg-[#f4c542]/12 blur-[110px]"
        animate={{ x: [0, -35, 0], y: [0, 25, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[90px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-[42%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px rgba(244,197,66,0.55)",
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], y: [0, -18, 0], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />
    </div>
  );
}
