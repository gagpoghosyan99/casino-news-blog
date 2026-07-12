"use client";

import { NEWS_CATEGORIES, type NewsCategory } from "@/lib/news-utils";

const CATEGORY_ICONS: Record<string, string> = {
  "All News": "●",
  Payments: "◆",
  Industry: "▣",
  Sports: "✦",
  Crypto: "₿",
  "Live Casino": "◇",
  Regulation: "⚖",
};

interface NewsCategoryFilterProps {
  active: NewsCategory;
  onChange: (category: NewsCategory) => void;
}

export default function NewsCategoryFilter({ active, onChange }: NewsCategoryFilterProps) {
  return (
    <div className="sticky top-[73px] z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 py-4">
          {NEWS_CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange(cat)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "border border-gold-500/50 bg-gold-500/20 text-gold-300 shadow-[0_0_24px_rgba(212,175,55,0.28)]"
                    : "border border-white/10 bg-white/[0.03] text-slate-400 hover:border-cyan-400/30 hover:text-slate-200"
                }`}
              >
                <span aria-hidden className="text-xs opacity-80">
                  {CATEGORY_ICONS[cat]}
                </span>
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
