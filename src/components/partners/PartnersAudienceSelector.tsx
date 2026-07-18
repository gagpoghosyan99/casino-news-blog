"use client";

import Link from "next/link";
import { ArrowRight, Building2, Check, Sparkles } from "lucide-react";
import SectionReveal from "@/components/landing/SectionReveal";
import { audienceCards } from "@/data/partners/content";

export default function PartnersAudienceSelector() {
  return (
    <section id="choose-path" className="scroll-mt-36 border-y border-gold-400/15 bg-gradient-to-b from-gold-500/[0.07] via-[#070a12] to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Step 1 · Choose your path</p>
          <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Company partner or customer partner?</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300">
            Pick the option that matches you. Company partners see business offers. Customer partners see player
            benefits and gambling-related options.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {audienceCards.map((card, i) => {
            const isCompany = card.id === "business";
            return (
              <SectionReveal key={card.id} delay={i * 0.08}>
                <a
                  href={card.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 sm:p-8 ${
                    isCompany
                      ? "border-gold-400/45 bg-gradient-to-br from-gold-500/20 via-[#0b0f18] to-black/60 shadow-[0_0_0_1px_rgba(212,175,55,0.12),0_24px_60px_rgba(0,0,0,0.45)] hover:border-gold-300/70 hover:shadow-[0_0_40px_rgba(212,175,55,0.18)]"
                      : "border-white/18 bg-gradient-to-br from-white/[0.08] via-[#0b0f18] to-gold-500/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.4)] hover:border-gold-400/35 hover:shadow-[0_0_36px_rgba(212,175,55,0.1)]"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity ${
                      isCompany ? "bg-gold-400/25 opacity-80 group-hover:opacity-100" : "bg-white/10 opacity-60 group-hover:opacity-90"
                    }`}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
                          isCompany
                            ? "bg-gold-500 text-navy-950"
                            : "bg-white/10 text-gold-200 ring-1 ring-gold-400/35"
                        }`}
                      >
                        {isCompany ? <Building2 className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                        {card.badge}
                      </span>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {card.sectionLabel}
                      </p>
                    </div>
                    <span className="font-numeric text-sm font-bold text-gold-400/80">{isCompany ? "01" : "02"}</span>
                  </div>

                  <h3 className="relative mt-4 font-display text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">
                    {card.title}
                  </h3>
                  <p className="relative mt-2 text-sm font-medium text-gold-300/90">{card.who}</p>
                  <p className="relative mt-3 text-[15px] leading-[1.75] text-slate-300">{card.description}</p>

                  <ul className="relative mt-6 grid flex-1 gap-2 sm:grid-cols-2">
                    {card.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span
                    className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform group-hover:translate-x-0.5 ${
                      isCompany
                        ? "bg-gold-500 text-navy-950 shadow-[0_0_28px_rgba(212,175,55,0.35)]"
                        : "border border-gold-400/40 bg-white/5 text-gold-200"
                    }`}
                  >
                    {card.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </SectionReveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Looking for reviews first?{" "}
          <Link href="/casinos" className="font-medium text-gold-400 hover:text-gold-300">
            Browse the casino directory
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
