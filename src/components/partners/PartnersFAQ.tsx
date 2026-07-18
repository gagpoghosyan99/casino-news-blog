"use client";

import { useState } from "react";
import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";
import { businessFaq, playerFaq } from "@/data/partners/content";

export default function PartnersFAQ() {
  const [tab, setTab] = useState<"business" | "player">("business");
  const items = tab === "business" ? businessFaq : playerFaq;

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">FAQ</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Common questions</h2>
      </SectionReveal>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="FAQ audience">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "business"}
          onClick={() => setTab("business")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            tab === "business"
              ? "bg-gold-500/20 text-gold-300 ring-1 ring-gold-400/40"
              : "border border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          Business FAQ
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "player"}
          onClick={() => setTab("player")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            tab === "player"
              ? "bg-gold-500/20 text-gold-300 ring-1 ring-gold-400/40"
              : "border border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          Player FAQ
        </button>
      </div>

      <div className="mt-6 space-y-3" role="tabpanel">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/10 bg-black/40 open:border-gold-400/25"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-display text-base font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="font-numeric text-gold-400 group-open:hidden">+</span>
                <span className="font-numeric hidden text-gold-400 group-open:inline">−</span>
              </span>
            </summary>
            <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function PartnersFinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gold-400/35 bg-gradient-to-br from-gold-500/15 via-black/60 to-black/50 px-6 py-12 text-center sm:px-10">
        <h2 className="font-display text-3xl font-bold tracking-[0.02em] text-white sm:text-4xl">
          Let’s build the next opportunity together.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Whether you represent an iGaming company, provide industry technology, create content or want more
          value as a player, ZeoneBet provides a clear path to connect.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="zb-btn-gold zb-shine">
            Become a Partner
          </a>
          <a href="#for-players" className="zb-btn-cyan">
            Explore Player Benefits
          </a>
          <Link href="/contact" className="text-sm font-semibold text-gold-400 hover:text-gold-300">
            Contact the ZeoneBet team →
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          18+ only. Gamble responsibly.{" "}
          <Link href="/responsible-gambling" className="text-gold-500 hover:text-gold-400">
            Safety resources
          </Link>
        </p>
      </div>
    </section>
  );
}
