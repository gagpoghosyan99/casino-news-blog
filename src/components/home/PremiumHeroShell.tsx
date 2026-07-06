import Link from "next/link";
import { translations } from "@/lib/translations";
import { isFeatureEnabled } from "@/config/features";
import HeroJackpotTicker from "./HeroJackpotTicker";

const ctas = [
  { href: "/casinos?tab=good", label: "Explore Top Casinos", primary: true },
  { href: "/#jackpot-winners", label: "Jackpot Winners", primary: false },
  { href: "/#bonus-tracker", label: "Bonus examples", primary: false },
  { href: "/#blacklist", label: "Safety Alerts", primary: false },
] as const;

export default function PremiumHeroShell() {
  const t = translations.en;

  return (
    <>
      {isFeatureEnabled("jackpotTicker") && <HeroJackpotTicker />}
      <section className="relative overflow-hidden bg-hero-premium">
        <div className="hero-orb hero-orb-gold" />
        <div className="hero-orb hero-orb-emerald" />
        <div className="absolute inset-0 bg-grid-premium opacity-40" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {t.trustedBy}
            </div>

            <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.heroTitleMain}{" "}
              <span className="gradient-text-premium">{t.heroTitleHighlight}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              {t.heroSubtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={cta.primary ? "btn-premium-primary" : "btn-premium-secondary"}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              { label: t.heroStatJackpots, value: "$12.4M", sub: t.heroStatJackpotsSub },
              { label: t.heroStatCasinos, value: "40+", sub: t.heroStatCasinosSub },
              { label: t.heroStatReaders, value: "120K+", sub: t.heroStatReadersSub },
            ].map((stat) => (
              <div key={stat.label} className="glass-card floating-card p-5 text-center">
                <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-white">{stat.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
