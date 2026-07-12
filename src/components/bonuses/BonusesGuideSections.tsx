"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Gift, Scale, Sparkles } from "lucide-react";
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

export default function BonusesGuideSections() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
      <section aria-labelledby="bonus-how-heading">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">How to claim</p>
          <h2 id="bonus-how-heading" className="mt-2 zb-headline text-2xl md:text-3xl">
            Claim smarter — avoid bonus traps
          </h2>
        </SectionReveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <TiltPanel delay={0.05}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 ring-1 ring-gold-400/40">
              <Gift className="h-5 w-5 text-gold-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">1. Open the live offer</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Use <strong className="text-white">Claim Now</strong> to reach the operator, then open
              the promotions tab after login. Headline values change by region and mirror.
            </p>
          </TiltPanel>

          <TiltPanel delay={0.1}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-400/40">
              <Scale className="h-5 w-5 text-cyan-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">2. Read wagering first</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Check playthrough, max bet, game weighting, and expiry before opting in. Free spins
              often exclude live dealer contribution.
            </p>
          </TiltPanel>

          <TiltPanel delay={0.15}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">3. Test a small cashout</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Complete KYC early and test a small withdrawal where policy allows. Compare brands on
              our{" "}
              <Link href="/casinos" className="text-gold-400 hover:text-gold-300">
                casino directory
              </Link>
              .
            </p>
          </TiltPanel>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="bonus-disclaimer-heading">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/50 to-gold-500/5 p-6 shadow-[0_0_40px_rgba(245,158,11,0.1)] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 ring-1 ring-amber-400/40">
                <AlertTriangle className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h2 id="bonus-disclaimer-heading" className="font-display text-xl font-bold text-white">
                  Editorial bonus desk — not guaranteed offers
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  ZEONEBET does not invent locked-in dollar amounts. Cards summarise offer types and
                  payment rails from operator desks we track. Always confirm final terms on the casino
                  site. Affiliate commissions do not buy higher placement. 18+ only —{" "}
                  <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
                    responsible gambling guidance
                  </Link>
                  .
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold-400/25 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                    <Sparkles className="h-3 w-3" /> Verify before deposit
                  </span>
                  <Link
                    href="/how-we-review"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:border-cyan-400/30"
                  >
                    Review methodology →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
