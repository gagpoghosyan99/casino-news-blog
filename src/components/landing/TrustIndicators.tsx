"use client";

import SectionReveal from "./SectionReveal";
import { trustIndicators } from "@/data/landing-home";

const iconMap: Record<string, string> = {
  shield: "🛡️",
  license: "📜",
  trophy: "🏆",
  star: "⭐",
  lock: "🔒",
  heart: "💚",
};

export default function TrustIndicators() {
  return (
    <section className="zb-section border-y border-white/5 bg-navy-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            Premium Trust Indicators
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-white md:text-3xl">
            Why players trust ZEONEBET
          </h2>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustIndicators.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div className="group zb-glass flex gap-4 p-5 transition-all hover:border-cyan-400/30 hover:shadow-glow-cyan">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500/20 to-cyan-500/20 text-xl ring-1 ring-gold-500/30">
                  {iconMap[item.icon]}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
