"use client";

import SectionReveal from "@/components/landing/SectionReveal";
import {
  businessBenefits,
  partnerTypeCards,
  partnershipModels,
  partnershipProcess,
} from "@/data/partners/content";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function BusinessPartnerTypes({ onInquire }: { onInquire: (preset: string) => void }) {
  return (
    <section id="for-businesses" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">Business partnerships</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
          We work with established iGaming companies, emerging brands and specialist service providers through
          transparent, flexible partnership models.
        </p>
      </SectionReveal>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {partnerTypeCards.map((card, i) => (
          <SectionReveal key={card.id} delay={Math.min(i * 0.05, 0.25)}>
            <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
              <ul className="mt-4 flex-1 space-y-2">
                {card.services.map((s) => (
                  <li key={s} className="text-sm text-slate-400 before:mr-2 before:text-gold-500 before:content-['·']">
                    {s}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onInquire(card.ctaLabel.includes("List") ? "Casino listing" : "Custom proposal")}
                className="zb-btn-ghost mt-6 w-full text-sm"
              >
                {card.ctaLabel}
              </button>
            </article>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

export function BusinessBenefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">What you receive as a ZeoneBet partner</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          We do not claim guaranteed traffic, registrations, revenue, rankings, or conversions.
        </p>
      </SectionReveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {businessBenefits.map((b, i) => (
          <SectionReveal key={b.id} delay={Math.min(i * 0.04, 0.24)}>
            <div className="h-full rounded-2xl border border-gold-400/20 bg-gradient-to-b from-gold-500/8 to-transparent p-5">
              <h3 className="font-display text-base font-semibold text-gold-300">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.description}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

export function PartnershipModels({ onCustom }: { onCustom: () => void }) {
  const [open, setOpen] = useState<string>(partnershipModels[0]?.id ?? "affiliate");

  return (
    <section id="partnership-models" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Models</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Choose the right partnership model</h2>
      </SectionReveal>
      <div className="mt-8 space-y-3">
        {partnershipModels.map((model) => {
          const isOpen = open === model.id;
          return (
            <div
              key={model.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? "" : model.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-semibold tracking-wide text-white sm:text-lg">
                  {model.title}
                </span>
                <span className="font-numeric text-gold-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="border-t border-white/10 px-5 pb-5 pt-3">
                  <p className="text-[15px] leading-[1.8] text-slate-200/90">{model.summary}</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {model.details.map((d) => (
                      <li key={d} className="text-[15px] leading-relaxed text-slate-300">
                        · {d}
                      </li>
                    ))}
                  </ul>
                  {model.note && <p className="mt-3 text-sm leading-relaxed text-slate-400">{model.note}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <button type="button" onClick={onCustom} className="zb-btn-gold zb-shine">
          Request a Custom Proposal
        </button>
      </div>
    </section>
  );
}

export function PartnershipProcess() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) {
      setProgress(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const raw = 1 - rect.top / (view * 0.85);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" ref={ref}>
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">How business cooperation works</h2>
      </SectionReveal>
      <div className="relative mt-10">
        <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 sm:left-6" />
        <div
          className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-gold-400 to-gold-500/40 sm:left-6"
          style={{ height: `${progress * 100}%` }}
        />
        <ol className="space-y-6">
          {partnershipProcess.map((step) => (
            <li key={step.step} className="relative flex gap-4 pl-0 sm:gap-5">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-[#0a0e17] font-numeric text-sm font-bold text-gold-300 sm:h-12 sm:w-12">
                {step.step}
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
