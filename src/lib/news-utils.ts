export const NEWS_CATEGORIES = [
  "All News",
  "Payments",
  "Industry",
  "Sports",
  "Crypto",
  "Live Casino",
  "Regulation",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export function formatTimeAgo(isoDate: string, locale: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return locale === "hi" ? "अभी" : "Just now";
  if (hours < 24) return locale === "hi" ? `${hours} घंटे पहले` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return locale === "hi" ? `${days} दिन पहले` : `${days}d ago`;
  return new Date(isoDate).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN");
}

export function categoryStyles(category: string) {
  const map: Record<string, { pill: string; image: string; icon: string }> = {
    Payments: {
      pill: "border border-amber-400/35 bg-amber-500/15 text-amber-200",
      image: "from-amber-500/40 via-gold-500/20 to-black/60",
      icon: "💳",
    },
    Industry: {
      pill: "border border-cyan-400/35 bg-cyan-500/15 text-cyan-200",
      image: "from-cyan-500/35 via-blue-500/15 to-black/60",
      icon: "📊",
    },
    Sports: {
      pill: "border border-emerald-400/35 bg-emerald-500/15 text-emerald-200",
      image: "from-emerald-500/35 via-teal-500/15 to-black/60",
      icon: "🏏",
    },
    Crypto: {
      pill: "border border-gold-400/35 bg-gold-500/15 text-gold-200",
      image: "from-gold-500/35 via-amber-500/15 to-black/60",
      icon: "₿",
    },
    "Live Casino": {
      pill: "border border-rose-400/35 bg-rose-500/15 text-rose-200",
      image: "from-rose-500/35 via-orange-500/15 to-black/60",
      icon: "🎰",
    },
    Regulation: {
      pill: "border border-slate-400/35 bg-slate-500/15 text-slate-200",
      image: "from-slate-500/35 via-zinc-500/15 to-black/60",
      icon: "⚖️",
    },
  };
  return (
    map[category] ?? {
      pill: "border border-gold-400/30 bg-gold-500/10 text-gold-200",
      image: "from-gold-500/30 via-cyan-500/10 to-black/60",
      icon: "📰",
    }
  );
}
