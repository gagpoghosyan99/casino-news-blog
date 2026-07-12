"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Flame, Sparkles, Zap } from "lucide-react";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import { useLocale } from "@/context/LocaleContext";
import { getLocalizedText } from "@/lib/i18n";
import { useTranslation } from "@/lib/useTranslation";
import { goodCasinos } from "@/data/casinos";
import { getCasinoRankingMeta } from "@/data/casino-ranking-meta";
import { NewsArticle } from "@/types";
import { categoryStyles } from "@/lib/news-utils";
import SectionReveal from "@/components/landing/SectionReveal";

interface NewsSidebarProps {
  articles: NewsArticle[];
}

function SidebarPanel({
  children,
  className = "",
  gold = false,
}: {
  children: ReactNode;
  className?: string;
  gold?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -5, y: (px - 0.5) * 6 });
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl ${
          gold
            ? "border-gold-400/40 bg-gradient-to-br from-gold-500/15 via-black/50 to-cyan-500/8 shadow-[0_16px_40px_rgba(212,175,55,0.18)]"
            : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/45 to-gold-500/5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
        } ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
          animate={{ x: ["-40%", "120%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        />
        <div className="relative" style={{ transform: "translateZ(16px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function NewsSidebar({ articles }: NewsSidebarProps) {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);
  const indexableArticles = articles.filter((article) => article.indexable !== false);
  const trending = indexableArticles.slice(0, 5);
  const latest = [...indexableArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4);
  const promos = goodCasinos.slice(0, 4);

  return (
    <aside className="space-y-5">
      <SectionReveal>
        <SidebarPanel>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-gold-400" />
            <h3 className="font-display text-lg font-bold text-white">{t("trendingNews")}</h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">{t("popularTopics")}</p>
          <ul className="mt-4 space-y-3">
            {trending.map((article, i) => {
              const styles = categoryStyles(article.category);
              return (
                <li key={article.id}>
                  <Link href={`/news/${article.id}`} className="group flex gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-sm font-bold text-gold-300 ring-1 ring-gold-400/30">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${styles.pill}`}>
                        {article.category}
                      </span>
                      <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-300 group-hover:text-gold-300">
                        {getLocalizedText(article.title, locale)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SidebarPanel>
      </SectionReveal>

      <SectionReveal delay={0.06}>
        <SidebarPanel>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <h3 className="font-display text-lg font-bold text-white">{t("latestUpdates")}</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {latest.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/news/${article.id}`}
                  className="block text-sm font-medium text-slate-400 transition-colors hover:text-gold-300"
                >
                  <span className="line-clamp-2">{getLocalizedText(article.title, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarPanel>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <SidebarPanel gold>
          <h3 className="font-display text-lg font-bold text-white">{t("topPromotions")}</h3>
          <ul className="mt-4 space-y-3">
            {promos.map((casino, i) => {
              const meta = getCasinoRankingMeta(casino.slug, casino.rating, i);
              return (
                <li key={casino.id}>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-xs font-black text-navy-950 shadow-[0_0_16px_rgba(212,175,55,0.35)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{casino.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {meta.payments.slice(0, 3).join(" · ")}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/go/${casino.slug}`}
                      rel={AFFILIATE_LINK_REL}
                      target="_blank"
                      className="zb-btn-gold zb-shine mt-3 inline-flex w-full items-center justify-center gap-1.5 !px-3 !py-2 text-xs"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      Register
                      <ExternalLink className="h-3 w-3 opacity-80" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/casinos" className="zb-btn-ghost mt-4 inline-flex w-full justify-center text-sm">
            {t("showMore")}
          </Link>
        </SidebarPanel>
      </SectionReveal>
    </aside>
  );
}
