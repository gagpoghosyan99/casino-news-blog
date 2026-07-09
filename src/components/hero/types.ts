import type { LucideIcon } from "lucide-react";

export interface FloatingCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: LucideIcon;
  badges?: string[];
  className?: string;
  delay?: number;
  variant?: "gold" | "cyan" | "glass";
}

export interface NavItem {
  href: string;
  label: string;
  exact?: boolean;
}
