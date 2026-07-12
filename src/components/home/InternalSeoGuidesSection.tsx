"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bitcoin,
  BookOpen,
  CreditCard,
  FileText,
  Layers,
  Wallet,
} from "lucide-react";
import { internalSeoLinks } from "@/data/programmatic/internal-seo-links";
import SectionReveal from "@/components/landing/SectionReveal";

const categoryMeta: Record<
  string,
  { icon: typeof Bitcoin; glow: string; ring: string; gradient: string; badge: string }
> = {
  "Crypto Casinos": {
    icon: Bitcoin,
    glow: "rgba(34,211,238,0.28)",
    ring: "ring-cyan-400/35",
    gradient: "from-cyan-500/15 via-black/40 to-gold-500/10",
    badge: "text-cyan-300 border-cyan-400/30 bg-cyan-500/10",
  },
  "Payment Guides": {
    icon: CreditCard,
    glow: "rgba(16,185,129,0.28)",
    ring: "ring-emerald-400/35",
    gradient: "from-emerald-500/15 via-black/40 to-cyan-500/10",
    badge: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  },
  Comparisons: {
    icon: Layers,
    glow: "rgba(212,175,55,0.28)",
    ring: "ring-gold-400/35",
    gradient: "from-gold-500/15 via-black/40 to-amber-500/10",
    badge: "text-gold-300 border-gold-400/30 bg-gold-500/10",
  },
};

const fallbackMeta = {
  icon: BookOpen,
  glow: "rgba(212,175,55,0.22)",
  ring: "ring-gold-400/30",
  gradient: "from-gold-500/10 via-black/40 to-white/5",
  badge: "text-gold-300 border-gold-400/30 bg-gold-500/10",
};

function GuideCard({
  link,
  index,
}: {
  link: (typeof internalSeoLinks)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const meta = categoryMeta[link.category] ?? fallbackMeta;
  const Icon = meta.icon;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
  };

  return (
    <SectionReveal delay={index * 0.07} className="h-full">
      <div style={{ perspective: "1100px" }} className="h-full">
        <Link href={link.href} className="group block h-full">
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${meta.gradient} p-5 backdrop-blur-xl`}
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04), 0 0 32px ${meta.glow}`,
            }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
              }}
            />

            <div className="relative flex items-start justify-between gap-3" style={{ transform: "translateZ(28px)" }}>
              <motion.div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-black/40 ring-1 ${meta.ring}`}
                style={{ boxShadow: `0 0 22px ${meta.glow}` }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.2 + (index % 3) * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-5 w-5 text-gold-300" />
              </motion.div>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}>
                {link.category}
              </span>
            </div>

            <h3
              className="relative mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-gold-300"
              style={{ transform: "translateZ(22px)" }}
            >
              {link.title}
            </h3>
            <p
              className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-400"
              style={{ transform: "translateZ(16px)" }}
            >
              {link.description}
            </p>

            <div
              className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4"
              style={{ transform: "translateZ(24px)" }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400">
                <FileText className="h-3.5 w-3.5" />
                {link.cta}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-gold-400/40">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            <div className="pointer-events-none absolute -bottom-14 -right-10 h-36 w-36 rounded-full opacity-60 blur-3xl transition-opacity group-hover:opacity-100" style={{ background: meta.glow }} />
          </motion.div>
        </Link>
      </div>
    </SectionReveal>
  );
}

export default function InternalSeoGuidesSection() {
  return (
    <section id="crypto-payment-guides" className="relative zb-section overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(34,211,238,0.07),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(212,175,55,0.07),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Player Resources</p>
              <h2 className="mt-2 zb-headline">Crypto &amp; Payment Casino Guides</h2>
              <p className="mt-3 max-w-2xl text-slate-400">
                Explore ZEONEBET guides for crypto casinos, payment methods, and safe casino comparisons.
              </p>
            </div>
            <Link href="/india-casino-payments" className="zb-btn-ghost inline-flex items-center gap-2 self-start text-sm sm:self-auto">
              <Wallet className="h-4 w-4" />
              View all payment guides
            </Link>
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {internalSeoLinks.map((link, i) => (
            <GuideCard key={link.href} link={link} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
