"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type PremiumTiltCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "cyan" | "danger" | "amber";
  delay?: number;
};

const toneClasses = {
  gold: "border-gold-400/30 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/5 shadow-[0_14px_36px_rgba(212,175,55,0.1)]",
  cyan: "border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-black/50 to-gold-500/5 shadow-[0_14px_36px_rgba(34,211,238,0.1)]",
  danger:
    "border-danger-500/35 bg-gradient-to-br from-danger-500/10 via-black/50 to-black/40 shadow-[0_14px_36px_rgba(239,68,68,0.12)]",
  amber:
    "border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/50 to-gold-500/5 shadow-[0_14px_36px_rgba(245,158,11,0.1)]",
} as const;

export default function PremiumTiltCard({
  children,
  className = "",
  tone = "gold",
  delay = 0,
}: PremiumTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -5, y: (px - 0.5) * 7 });
  };

  return (
    <div style={{ perspective: "1100px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 18,
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          opacity: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
          rotateX: { type: "spring", stiffness: 260, damping: 22 },
          rotateY: { type: "spring", stiffness: 260, damping: 22 },
        }}
        className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${toneClasses[tone]} ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
          animate={{ x: ["-50%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
        />
        <div className="relative" style={{ transform: "translateZ(16px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
