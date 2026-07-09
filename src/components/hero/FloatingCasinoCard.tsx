import type { FloatingCasinoCardProps } from "./types";

export default function FloatingCasinoCard({
  title,
  value,
  icon: Icon,
  className = "",
  glow = "gold",
}: FloatingCasinoCardProps) {
  const glowClass =
    glow === "cyan"
      ? "shadow-[0_0_30px_rgba(34,211,238,0.15)] border-cyan-400/20"
      : "shadow-[0_0_30px_rgba(212,175,55,0.15)] border-gold-500/20";

  return (
    <div
      className={`float-slow rounded-2xl border bg-black/35 px-5 py-4 shadow-2xl backdrop-blur-xl ${glowClass} ${className}`}
    >
      <div className="flex items-start gap-3">
        {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 sm:text-xs">
            {title}
          </p>
          {value && (
            <p
              className={`mt-1 text-sm font-bold sm:text-base ${glow === "cyan" ? "text-cyan-300" : "text-[#f4c542]"}`}
            >
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
