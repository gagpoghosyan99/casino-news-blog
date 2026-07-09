"use client";

import Link from "next/link";
import { blacklistedCasinos } from "@/data/blacklist";
import SectionReveal from "./SectionReveal";

const riskLabels: Record<string, string> = {
  "delayed-payouts": "Delayed Withdrawals",
  "fake-license": "Fake License",
  "unresolved-complaints": "User Complaints",
  "suspicious-behavior": "Unfair Bonus Terms",
  "user-reported-concerns": "User Complaints",
};

export default function BlacklistSection() {
  const items = blacklistedCasinos.slice(0, 4);

  return (
    <section className="zb-section border-t border-danger-500/10 bg-gradient-to-b from-navy-950 to-danger-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-danger-400">Risk Intelligence</p>
          <h2 className="mt-2 zb-headline">Blacklisted Casinos</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Editorial risk assessments — not legal rulings. Serious warnings for players researching before deposit.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((casino, i) => (
            <SectionReveal key={casino.id} delay={i * 0.06}>
              <div className="rounded-2xl border border-danger-500/30 bg-danger-500/5 p-5 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{casino.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{casino.summary}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-danger-500/20 px-2 py-1 text-xs font-bold text-danger-300">
                    ⚠️
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {casino.risks.map((r) => (
                    <span
                      key={r}
                      className="rounded-md border border-danger-500/30 bg-danger-500/10 px-2 py-0.5 text-[10px] font-semibold text-danger-300"
                    >
                      {riskLabels[r] ?? r}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-600">{casino.complaintCount}+ reported concerns</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/blacklist" className="inline-flex items-center rounded-xl border border-danger-500/40 bg-danger-500/10 px-6 py-3 text-sm font-semibold text-danger-300 transition-all hover:bg-danger-500/20">
            See Full Blacklist →
          </Link>
        </div>
      </div>
    </section>
  );
}
