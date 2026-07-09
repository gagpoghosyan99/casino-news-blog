import type { LucideIcon } from "lucide-react";

export interface FloatingCasinoCardProps {
  title: string;
  value?: string;
  icon?: LucideIcon;
  className?: string;
  glow?: "gold" | "cyan";
}
