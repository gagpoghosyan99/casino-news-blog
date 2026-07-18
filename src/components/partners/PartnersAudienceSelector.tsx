"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import SectionReveal from "@/components/landing/SectionReveal";
import { audienceCards } from "@/data/partners/content";

export default function PartnersAudienceSelector() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Who is this for?</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Choose your path</h2>
      </SectionReveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {audienceCards.map((card, i) => (
          <SectionReveal key={card.id} delay={i * 0.08}>
            <div
              className={`relative h-full overflow-hidden rounded-3xl border p-6 sm:p-8 ${
                card.id === "business"
                  ? "border-gold-400/30 bg-gradient-to-br from-gold-500/12 via-black/50 to-black/40"
                  : "border-white/12 bg-gradient-to-br from-white/[0.06] via-black/50 to-gold-500/5"
              }`}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
                {card.id === "business" ? "For businesses" : "For players"}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{card.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {card.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <a href={card.href} className="zb-btn-gold zb-shine mt-8 inline-flex">
                {card.ctaLabel}
              </a>
            </div>
          </SectionReveal>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        Looking for reviews first?{" "}
        <Link href="/casinos" className="font-medium text-gold-400 hover:text-gold-300">
          Browse the casino directory
        </Link>
        .
      </p>
    </section>
  );
}
