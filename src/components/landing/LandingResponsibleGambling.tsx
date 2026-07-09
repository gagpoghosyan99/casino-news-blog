"use client";

import Link from "next/link";
import { responsibleGamblingQuickLinks } from "@/data/legal";
import SectionReveal from "./SectionReveal";

export default function LandingResponsibleGambling() {
  return (
    <section className="zb-section border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Player Safety</p>
          <h2 className="mt-2 zb-headline">Responsible Gambling</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            ZEONEBET promotes informed, safer play. Gambling should be entertainment — never a financial strategy.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {responsibleGamblingQuickLinks.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div className="zb-glass h-full p-5">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
                <Link href={item.href} className="mt-4 inline-block text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                  Learn more →
                </Link>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-500/25 bg-amber-500/5 px-6 py-5 text-center">
          <p className="text-sm font-semibold text-amber-200">
            ⚠️ 18+ only. Set deposit limits, take breaks, and seek help if gambling affects your life.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
              BeGambleAware.org
            </a>
            <Link href="/responsible-gambling" className="text-gold-400 hover:underline">
              Full responsible gambling guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
