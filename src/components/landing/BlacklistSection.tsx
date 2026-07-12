"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Eye, ShieldAlert, Siren } from "lucide-react";
import { blacklistedCasinos } from "@/data/blacklist";
import SectionReveal from "./SectionReveal";

const riskLabels: Record<string, string> = {
  "delayed-payouts": "Delayed Withdrawals",
  "fake-license": "Fake License",
  "unresolved-complaints": "User Complaints",
  "suspicious-behavior": "Unfair Bonus Terms",
  "user-reported-concerns": "User Complaints",
};

const severityStyles = {
  critical: {
    label: "Critical Risk",
    badge: "bg-danger-500/20 text-danger-300 ring-danger-500/40",
    glow: "rgba(239,68,68,0.35)",
    border: "border-danger-500/40",
  },
  high: {
    label: "High Risk",
    badge: "bg-orange-500/15 text-orange-300 ring-orange-400/35",
    glow: "rgba(249,115,22,0.28)",
    border: "border-orange-500/35",
  },
  medium: {
    label: "Elevated Risk",
    badge: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
    glow: "rgba(245,158,11,0.22)",
    border: "border-amber-500/30",
  },
} as const;

function ThreatRadar() {
  return (
    <div className="pointer-events-none absolute -right-6 top-0 hidden h-44 w-44 opacity-70 lg:block">
      <motion.div
        className="absolute inset-0 rounded-full border border-danger-500/20"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-dashed border-danger-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-10 rounded-full border border-danger-500/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Siren className="h-6 w-6 text-danger-400/80" />
      </div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-[42%] origin-left bg-gradient-to-r from-danger-400/80 to-transparent"
        style={{ translateX: "-0%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function BlacklistCard({
  casino,
  index,
}: {
  casino: (typeof blacklistedCasinos)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const severity = severityStyles[casino.severity] ?? severityStyles.high;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (py - 0.5) * -10,
      y: (px - 0.5) * 12,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <SectionReveal delay={index * 0.08}>
      <div style={{ perspective: "1000px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.6 }}
          className={`group relative h-full overflow-hidden rounded-2xl border ${severity.border} bg-gradient-to-br from-white/[0.05] to-danger-950/20 p-5 backdrop-blur-xl`}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: `0 10px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(239,68,68,0.08), 0 0 40px ${severity.glow}`,
          }}
        >
          {/* Scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-danger-400/50 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4.5 + index, repeat: Infinity, ease: "linear" }}
          />

          {/* Stamp */}
          <div
            className="pointer-events-none absolute -right-2 top-8 rotate-12 rounded-md border border-danger-400/40 px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-danger-400/50"
            style={{ transform: "translateZ(30px) rotate(12deg)" }}
          >
            Flagged
          </div>

          <div className="relative flex items-start justify-between gap-3" style={{ transform: "translateZ(24px)" }}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-xl font-bold text-white">{casino.name}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${severity.badge}`}>
                  {severity.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{casino.summary}</p>
            </div>
            <motion.div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger-500/15 ring-1 ring-danger-400/40"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.2 }}
              style={{
                boxShadow: `0 0 24px ${severity.glow}`,
                transform: "translateZ(40px)",
              }}
            >
              <ShieldAlert className="h-5 w-5 text-danger-300" />
            </motion.div>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
            {casino.risks.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1.5 rounded-full border border-danger-500/35 bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-danger-200 backdrop-blur-sm"
              >
                <AlertTriangle className="h-3 w-3 text-danger-400" />
                {riskLabels[r] ?? r}
              </span>
            ))}
          </div>

          <div
            className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4"
            style={{ transform: "translateZ(16px)" }}
          >
            <p className="text-xs font-medium text-slate-500">
              <span className="font-bold text-danger-300">{casino.complaintCount.toLocaleString()}+</span>{" "}
              reported concerns
            </p>
            <Link
              href="/blacklist"
              className="inline-flex items-center gap-1 text-xs font-semibold text-danger-300 opacity-80 transition-opacity group-hover:opacity-100"
            >
              <Eye className="h-3.5 w-3.5" />
              Details
            </Link>
          </div>

          {/* Corner glow */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-danger-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
        </motion.div>
      </div>
    </SectionReveal>
  );
}

export default function BlacklistSection() {
  const items = blacklistedCasinos.slice(0, 4);

  return (
    <section className="relative zb-section overflow-hidden border-t border-danger-500/15">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(127,29,29,0.18),transparent_45%)]" />

      {/* Floating alert particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-danger-400/50"
          style={{ left: `${8 + ((i * 9) % 84)}%`, top: `${12 + ((i * 13) % 70)}%` }}
          animate={{ opacity: [0.15, 0.8, 0.15], y: [0, -14, 0] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="relative">
            <ThreatRadar />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-danger-400">Risk Intelligence</p>
            <h2 className="mt-2 zb-headline">Blacklisted Casinos</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Editorial risk assessments — not legal rulings. Serious warnings for players researching before deposit.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((casino, i) => (
            <BlacklistCard key={casino.id} casino={casino} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/blacklist"
              className="inline-flex items-center gap-2 rounded-full border border-danger-400/50 bg-gradient-to-r from-danger-500/25 to-danger-700/20 px-7 py-3.5 text-sm font-bold text-danger-100 shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-shadow hover:shadow-[0_0_45px_rgba(239,68,68,0.4)]"
            >
              <ShieldAlert className="h-4 w-4" />
              See Full Blacklist
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
