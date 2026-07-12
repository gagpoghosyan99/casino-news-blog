"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock3, Gift } from "lucide-react";
import PremiumIcon from "@/components/ui/PremiumIcon";
import { bonusOffers } from "@/data/bonuses";
import SectionReveal from "./SectionReveal";

function Countdown({ seed }: { seed: number }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = Date.now() + (seed + 1) * 3_600_000;
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seed]);

  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-gold-400">
      <Clock3 className="h-3.5 w-3.5" />
      {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

export default function BonusPromotions() {
  const offers = bonusOffers.slice(0, 3);

  return (
    <section id="bonuses" className="zb-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Limited-Time Offers</p>
          <h2 className="mt-2 zb-headline">Bonuses &amp; Promotions</h2>
          <p className="mt-3 text-slate-400">Premium bonus cards with urgency timers — always verify terms on the operator site.</p>
        </SectionReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offers.map((offer, i) => (
            <SectionReveal key={offer.id} delay={i * 0.08}>
              <div className="zb-glass flex h-full flex-col p-6 transition-all hover:border-gold-500/30 hover:shadow-glow-gold">
                <div className="flex items-center justify-between">
                  <PremiumIcon icon={Gift} tone="gold" size="sm" />
                  <Countdown seed={i} />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{offer.casinoName}</h3>
                <p className="mt-2 text-2xl font-bold text-gold-400">{offer.value}</p>
                <p className="mt-2 flex-1 text-sm text-slate-500">{offer.title}</p>
                <p className="mt-2 text-xs text-slate-600">Wagering: {offer.wagering}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <Link href={`/go/${offer.casinoSlug}`} className="zb-btn-gold zb-shine text-center text-sm">
                    Claim Now
                  </Link>
                  <Link href={`/blogs/review-${offer.casinoSlug}`} className="zb-btn-ghost text-center text-sm">
                    View Bonus Details
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
