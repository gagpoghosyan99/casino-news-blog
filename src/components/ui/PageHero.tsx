import type { ReactNode } from "react";

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  badges?: string[];
  actions?: ReactNode;
  tone?: "gold" | "cyan" | "emerald";
}

const toneText = {
  gold: "text-gold-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
} as const;

export default function PageHero({
  kicker,
  title,
  description,
  badges = [],
  actions,
  tone = "gold",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-30" />
      <div className="hero-orb hero-orb-gold opacity-50" />
      <div
        className="hero-orb hero-orb-emerald opacity-40"
        style={{ background: "rgba(34, 211, 238, 0.06)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${toneText[tone]}`}>
          {kicker}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
