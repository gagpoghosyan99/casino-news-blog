"use client";

import Link from "next/link";
import { Check, ExternalLink, Smartphone, Star } from "lucide-react";
import CasinoLogo from "@/components/CasinoLogo";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import SectionReveal from "./SectionReveal";
import { rankedCasinos } from "@/data/landing-home";

export default function CasinoRankingTable() {
  return (
    <section id="rankings" className="zb-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Premium Rankings</p>
          <h2 className="mt-2 zb-headline">Top 10 Trusted South Asian Casinos</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Editorial trust, user, and bonus scores with real payment rails per operator — then register or read the review.
          </p>
        </SectionReveal>

        <div className="mt-10 space-y-3">
          <div className="zb-glass hidden grid-cols-12 items-center gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 xl:grid">
            <span className="col-span-1">Rank</span>
            <span className="col-span-3">Casino</span>
            <span className="col-span-1 text-center">Trust</span>
            <span className="col-span-1 text-center">User</span>
            <span className="col-span-1 text-center">Bonus</span>
            <span className="col-span-2">Payments</span>
            <span className="col-span-1 text-center">Mobile</span>
            <span className="col-span-2 text-right">Action</span>
          </div>

          {rankedCasinos.map((casino, i) => (
            <SectionReveal key={casino.slug} delay={i * 0.05}>
              <div
                className={`zb-glass flex flex-col gap-4 p-4 transition-all hover:border-gold-500/30 xl:grid xl:grid-cols-12 xl:items-center xl:gap-3 xl:px-5 xl:py-4 ${
                  casino.premium ? "border-gold-500/40 shadow-glow-gold-lg ring-1 ring-gold-500/20" : ""
                }`}
              >
                <div className="flex items-center gap-3 xl:col-span-4">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      casino.premium
                        ? "bg-gold-500 text-navy-950 shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                        : "bg-white/10 text-gold-400"
                    }`}
                  >
                    {String(casino.rank).padStart(2, "0")}
                  </span>
                  <CasinoLogo name={casino.name} slug={casino.slug} rank={casino.rank} variant="wide" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{casino.name}</p>
                    {casino.premium && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-400">
                        <Star className="h-3 w-3 fill-gold-400" /> Top Rated
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 xl:contents">
                  {[
                    { label: "Trust", value: casino.trustScore },
                    { label: "User", value: casino.userScore },
                    { label: "Bonus", value: casino.bonusScore },
                  ].map((s) => (
                    <div key={s.label} className="text-center xl:col-span-1">
                      <p className="text-[10px] uppercase text-slate-500 xl:hidden">{s.label}</p>
                      <p className="font-display text-lg font-bold text-gold-400">{s.value.toFixed(1)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 xl:col-span-2">
                  {casino.payments.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="hidden items-center justify-center xl:col-span-1 xl:flex">
                  {casino.mobile ? (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-400/30"
                      title="Mobile-friendly"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                      <Smartphone className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </div>

                <div className="relative z-10 flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap xl:col-span-2 xl:justify-end">
                  {casino.mobile && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-400/30 xl:hidden"
                      title="Mobile-friendly"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      Mobile
                    </span>
                  )}
                  <Link
                    href={`/go/${casino.slug}`}
                    rel={AFFILIATE_LINK_REL}
                    target="_blank"
                    className="zb-btn-gold zb-shine inline-flex shrink-0 items-center justify-center gap-1.5 !px-4 !py-2.5 text-center text-xs"
                  >
                    Register
                    <ExternalLink className="h-3 w-3 opacity-80" />
                  </Link>
                  <Link
                    href={`/blogs/${casino.blogSlug}`}
                    className="zb-btn-ghost inline-flex shrink-0 items-center justify-center !px-4 !py-2.5 text-xs"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/casinos" className="zb-btn-cyan">
            View All 40 Casino Rankings →
          </Link>
        </div>
      </div>
    </section>
  );
}
