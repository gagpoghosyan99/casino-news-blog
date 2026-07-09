"use client";

import type { FloatingCardProps } from "./types";

export default function FloatingCard({
  title,
  subtitle,
  value,
  icon: Icon,
  badges,
  className = "",
  delay = 0,
  variant = "glass",
}: FloatingCardProps) {
  const border =
    variant === "gold"
      ? "border-gold-500/35 shadow-glow-gold"
      : variant === "cyan"
        ? "border-cyan-400/35 shadow-glow-cyan"
        : "border-white/15";

  return (
    <div
      className={`hero-float-card animate-floatSlow rounded-2xl border bg-white/[0.06] p-3 backdrop-blur-xl sm:p-4 ${border} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-2.5">
        {Icon && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 sm:h-9 sm:w-9">
            <Icon className="h-4 w-4 text-gold-400 sm:h-5 sm:w-5" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs font-semibold text-cyan-300 sm:text-sm">{subtitle}</p>}
          {value && (
            <p className="mt-1 font-display text-base font-bold text-gold-400 sm:text-lg">{value}</p>
          )}
          {badges && (
            <div className="mt-2 flex flex-wrap gap-1">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-md bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-bold text-cyan-300 sm:text-[10px]"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
