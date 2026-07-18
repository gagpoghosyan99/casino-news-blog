"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import PageHeroAtmosphere from "@/components/ui/PageHeroAtmosphere";

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: ReactNode;
  tone?: "gold" | "cyan" | "emerald";
}

const toneText = {
  gold: "text-gold-400",
  cyan: "text-gold-400",
  emerald: "text-emerald-400",
} as const;

export default function PageHero({
  kicker,
  title,
  description,
  badges = [],
  actions,
  tone = "gold",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[min(72vh,640px)] overflow-hidden border-b border-white/10">
      <PageHeroAtmosphere />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] ${toneText[tone]}`}
          >
            <span className="h-px w-8 bg-gradient-to-r from-gold-400 to-transparent" />
            {kicker}
          </motion.p>

          <h1 className="mt-4 zb-headline text-3xl sm:text-4xl lg:text-5xl xl:text-[3.35rem] xl:leading-[1.1]">
            {title.split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="mr-[0.28em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {description}
          </motion.p>

          {badges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {badges.map((badge, i) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  className="rounded-full border border-gold-400/35 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-300 shadow-[0_0_24px_rgba(212,175,55,0.14)] backdrop-blur-sm"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>

        {/* Decorative 3D accent rail */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px origin-left bg-gradient-to-r from-gold-400/70 via-gold-400/20 to-transparent"
        />
      </div>
    </section>
  );
}
