"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Compass,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionReveal from "@/components/landing/SectionReveal";

function TiltPanel({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -6, y: (px - 0.5) * 8 });
  };

  return (
    <SectionReveal delay={delay} className="h-full">
      <div style={{ perspective: "1100px" }} className="h-full">
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-black/45 to-gold-500/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.07)_50%,transparent_60%)]"
            animate={{ x: ["-50%", "120%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          />
          <div className="relative" style={{ transform: "translateZ(20px)" }}>
            {children}
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}

export function DirectoryGuideSection() {
  return (
    <section className="mt-12" aria-labelledby="directory-how-to-heading">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">How it works</p>
        <h2 id="directory-how-to-heading" className="mt-2 zb-headline text-2xl md:text-3xl">
          How to use this casino directory
        </h2>
      </SectionReveal>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <TiltPanel delay={0.05}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 ring-1 ring-gold-400/40">
            <Compass className="h-5 w-5 text-gold-300" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Start with your priority</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Filter by payments, crypto, sports crossover, or complaint themes — then open the linked
            review before depositing. Use <strong className="text-white">Top rated</strong> for
            editor-favoured brands, the full ranking for discovery, and{" "}
            <strong className="text-white">Caution list</strong> for operators with repeated reported
            concerns.
          </p>
        </TiltPanel>

        <TiltPanel delay={0.12}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 ring-1 ring-gold-400/40">
            <BookOpen className="h-5 w-5 text-gold-300" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">Verify before you deposit</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Confirm cashier methods after login, read bonus terms, and test a small withdrawal where
            policy allows. Cross-check{" "}
            <Link href="/india-casino-payments" className="text-gold-400 hover:text-gold-300">
              India
            </Link>
            ,{" "}
            <Link href="/bangladesh-casino-payments" className="text-gold-400 hover:text-gold-300">
              Bangladesh
            </Link>
            , and{" "}
            <Link href="/pakistan-casino-payments" className="text-gold-400 hover:text-gold-300">
              Pakistan payment hubs
            </Link>{" "}
            — then shortlist on our{" "}
            <Link href="/compare" className="text-gold-400 hover:text-gold-300">
              comparison hub
            </Link>
            .
          </p>
        </TiltPanel>
      </div>
    </section>
  );
}

export function DirectoryScoringSection() {
  return (
    <section className="mt-12" aria-labelledby="directory-scoring-heading">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Methodology</p>
        <h2 id="directory-scoring-heading" className="mt-2 zb-headline text-2xl md:text-3xl">
          How ZEONEBET scores casinos
        </h2>
      </SectionReveal>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Safety & licensing",
            desc: "Licence signals, entity disclosure, and payout clarity.",
            tone: "gold",
          },
          {
            icon: Scale,
            title: "Bonus fairness",
            desc: "Wagering honesty, max-bet rules, and usability scores.",
            tone: "gold",
          },
          {
            icon: Sparkles,
            title: "Player experience",
            desc: "Mobile UX, support quality, and complaint themes.",
            tone: "emerald",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <TiltPanel key={item.title} delay={0.06 * i}>
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${
                  item.tone === "gold"
                    ? "bg-gold-500/15 ring-gold-400/40"
                    : item.tone === "cyan"
                      ? "bg-cyan-500/15 ring-cyan-400/40"
                      : "bg-emerald-500/15 ring-emerald-400/40"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    item.tone === "gold"
                      ? "text-gold-300"
                      : item.tone === "cyan"
                        ? "text-cyan-300"
                        : "text-emerald-300"
                  }`}
                />
              </div>
              <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </TiltPanel>
          );
        })}
      </div>

      <SectionReveal delay={0.15}>
        <p className="mt-5 text-sm text-slate-400">
          Commercial affiliate relationships do not purchase higher scores. Read the full{" "}
          <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
            review methodology
          </Link>
          , browse the{" "}
          <Link href="/blacklist" className="text-gold-400 hover:text-gold-300">
            editorial blacklist
          </Link>
          , and follow{" "}
          <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
            responsible gambling guidance
          </Link>
          . 18+ only.
        </p>
      </SectionReveal>
    </section>
  );
}
