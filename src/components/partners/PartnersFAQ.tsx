"use client";

import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";
import { businessFaq, playerFaq, PARTNERS_ROUTES } from "@/data/partners/content";

export default function PartnersFAQ({
  audience = "business",
}: {
  audience?: "business" | "player";
}) {
  const items = audience === "business" ? businessFaq : playerFaq;

  return (
    <section id="faq" className="scroll-mt-36 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">FAQ</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">
          {audience === "business" ? "Company partner questions" : "Customer partner questions"}
        </h2>
      </SectionReveal>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/10 bg-black/40 open:border-gold-400/25"
          >
            <summary className="cursor-pointer list-none px-5 py-4 text-base font-semibold tracking-wide text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span className="font-numeric text-gold-400 group-open:hidden">+</span>
                <span className="font-numeric hidden text-gold-400 group-open:inline">−</span>
              </span>
            </summary>
            <p className="border-t border-white/10 px-5 py-4 text-[15px] leading-[1.75] text-slate-300">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function PartnersFinalCTA({
  variant = "hub",
}: {
  variant?: "hub" | "company" | "customer";
}) {
  if (variant === "company") {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold-400/35 bg-gradient-to-br from-gold-500/15 via-black/60 to-black/50 px-6 py-12 text-center sm:px-10">
          <h2 className="font-display text-3xl font-bold tracking-[0.02em] text-white sm:text-4xl">
            Ready to grow with ZeoneBet?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300">
            Tell us about your brand, product or campaign and we’ll map the right company partnership model.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="zb-btn-gold zb-shine">
              Contact partnership team
            </a>
            <Link
              href={PARTNERS_ROUTES.customer}
              className="inline-flex items-center justify-center rounded-full border border-gold-400/40 bg-white/5 px-6 py-3 text-sm font-semibold text-gold-200 transition hover:border-gold-300/60 hover:bg-white/10"
            >
              Switch to Customer Partners
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "customer") {
    return (
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold-400/35 bg-gradient-to-br from-gold-500/15 via-black/60 to-black/50 px-6 py-12 text-center sm:px-10">
          <h2 className="font-display text-3xl font-bold tracking-[0.02em] text-white sm:text-4xl">
            Explore player value on ZeoneBet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-300">
            Compare casinos, review offer conditions and discover referral opportunities — always 18+ and with
            clear disclosures.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/casinos" className="zb-btn-gold zb-shine">
              Browse casinos
            </Link>
            <Link
              href={PARTNERS_ROUTES.company}
              className="inline-flex items-center justify-center rounded-full border border-gold-400/40 bg-white/5 px-6 py-3 text-sm font-semibold text-gold-200 transition hover:border-gold-300/60 hover:bg-white/10"
            >
              Switch to Company Partners
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

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-gold-400/35 bg-gradient-to-br from-gold-500/15 via-black/60 to-black/50 px-6 py-12 text-center sm:px-10">
        <h2 className="font-display text-3xl font-bold tracking-[0.02em] text-white sm:text-4xl">
          Let’s build the next opportunity together.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={PARTNERS_ROUTES.company} className="zb-btn-gold zb-shine">
            Company Partners
          </Link>
          <Link
            href={PARTNERS_ROUTES.customer}
            className="inline-flex items-center justify-center rounded-full border border-gold-400/40 bg-white/5 px-6 py-3 text-sm font-semibold text-gold-200 transition hover:border-gold-300/60 hover:bg-white/10"
          >
            Customer Partners
          </Link>
        </div>
      </div>
    </section>
  );
}
