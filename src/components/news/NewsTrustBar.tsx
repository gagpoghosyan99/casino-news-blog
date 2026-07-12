"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Gift, Lock, MessageCircle, ShieldCheck } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import SectionReveal from "@/components/landing/SectionReveal";

const TRUST_ITEMS = [
  { icon: ShieldCheck, key: "trustReliable" as const, tone: "gold" },
  { icon: Lock, key: "trustSecure" as const, tone: "cyan" },
  { icon: Gift, key: "trustBonuses" as const, tone: "gold" },
  { icon: MessageCircle, key: "trustSupport" as const, tone: "emerald" },
] as const;

const BADGES = [
  { label: "Responsible Gambling", icon: "18+" },
  { label: "Editorial Source", icon: "✓" },
  { label: "18+ Verified Desk", icon: "✓" },
];

function TrustCard({
  icon: Icon,
  label,
  tone,
  delay,
}: {
  icon: typeof ShieldCheck;
  label: string;
  tone: "gold" | "cyan" | "emerald";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -7, y: (px - 0.5) * 9 });
  };

  const tones = {
    gold: {
      icon: "text-gold-300",
      ring: "ring-gold-400/40",
      bg: "bg-gold-500/15",
      wash: "from-gold-500/12 via-black/45 to-cyan-500/5",
      border: "border-gold-400/30",
    },
    cyan: {
      icon: "text-cyan-300",
      ring: "ring-cyan-400/40",
      bg: "bg-cyan-500/15",
      wash: "from-cyan-500/12 via-black/45 to-gold-500/5",
      border: "border-cyan-400/30",
    },
    emerald: {
      icon: "text-emerald-300",
      ring: "ring-emerald-400/40",
      bg: "bg-emerald-500/15",
      wash: "from-emerald-500/12 via-black/45 to-gold-500/5",
      border: "border-emerald-400/30",
    },
  }[tone];

  return (
    <SectionReveal delay={delay} className="h-full">
      <div style={{ perspective: "1000px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className={`flex h-full items-center gap-4 overflow-hidden rounded-3xl border ${tones.border} bg-gradient-to-br ${tones.wash} p-5 shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tones.bg} ring-1 ${tones.ring}`}
            style={{ transform: "translateZ(22px)" }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className={`h-5 w-5 ${tones.icon}`} />
          </motion.div>
          <p className="text-sm font-semibold text-slate-200" style={{ transform: "translateZ(16px)" }}>
            {label}
          </p>
        </motion.div>
      </div>
    </SectionReveal>
  );
}

export default function NewsTrustBar() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  return (
    <section className="relative overflow-hidden border-t border-white/10 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            Trust signals
          </p>
          <h2 className="mt-2 text-center zb-headline text-2xl">Why readers trust our news desk</h2>
        </SectionReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((item, i) => (
            <TrustCard
              key={item.key}
              icon={item.icon}
              label={t(item.key)}
              tone={item.tone}
              delay={i * 0.06}
            />
          ))}
        </div>

        <SectionReveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-500/10 px-5 py-2.5 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/20 text-xs font-bold text-gold-300">
                  {badge.icon}
                </span>
                <span className="text-sm font-medium text-slate-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
