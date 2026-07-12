import type { LucideIcon } from "lucide-react";

type PremiumIconTone = "gold" | "cyan" | "emerald" | "danger";

interface PremiumIconProps {
  icon: LucideIcon;
  tone?: PremiumIconTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const toneStyles: Record<PremiumIconTone, string> = {
  gold: "from-gold-500/25 to-amber-500/10 text-gold-400 ring-gold-500/35 shadow-[0_0_20px_rgba(212,175,55,0.2)]",
  cyan: "from-cyan-500/25 to-cyan-600/10 text-cyan-300 ring-cyan-400/35 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
  emerald: "from-emerald-500/25 to-emerald-600/10 text-emerald-400 ring-emerald-400/35 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
  danger: "from-danger-500/25 to-danger-600/10 text-danger-300 ring-danger-500/35 shadow-[0_0_20px_rgba(239,68,68,0.2)]",
};

const sizeStyles = {
  sm: { box: "h-9 w-9 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-12 w-12 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-14 w-14 rounded-2xl", icon: "h-6 w-6" },
};

export default function PremiumIcon({
  icon: Icon,
  tone = "gold",
  size = "md",
  className = "",
}: PremiumIconProps) {
  const s = sizeStyles[size];
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br ring-1 ${toneStyles[tone]} ${s.box} ${className}`}
    >
      <Icon className={s.icon} strokeWidth={2.25} />
    </div>
  );
}
