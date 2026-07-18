"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import AuthAtmosphere from "@/components/auth/AuthAtmosphere";

type AuthStageProps = {
  kicker: string;
  title: string;
  description: string;
  badges?: string[];
  children: ReactNode;
  footerHint?: ReactNode;
};

export default function AuthStage({
  kicker,
  title,
  description,
  badges = [],
  children,
  footerHint,
}: AuthStageProps) {
  return (
    <div className="relative min-h-[calc(100vh-0px)] overflow-hidden">
      <AuthAtmosphere />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            <div className="mb-8 inline-flex justify-center lg:justify-start">
              <BrandLogo size="lg" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold-400">{kicker}</p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-300 lg:mx-0 sm:text-lg">
              {description}
            </p>

            {badges.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-gold-400/35 bg-gold-500/10 px-3.5 py-1.5 text-xs font-semibold text-gold-300 shadow-[0_0_24px_rgba(212,175,55,0.15)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {footerHint && (
              <div className="mt-8 hidden text-sm text-slate-400 lg:block">{footerHint}</div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gold-400/10 blur-3xl" />
            <div className="auth-panel relative overflow-hidden rounded-[1.75rem] border border-gold-400/30 bg-gradient-to-br from-[#12161f]/95 via-[#0a0e17]/92 to-[#080b12]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55),0_0_60px_rgba(212,175,55,0.12)] backdrop-blur-2xl sm:p-8">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/15 blur-3xl" />
              <div className="relative">{children}</div>
            </div>
          </motion.div>
        </div>

        {footerHint && (
          <div className="mt-8 text-center text-sm text-slate-400 lg:hidden">{footerHint}</div>
        )}
      </div>
    </div>
  );
}
