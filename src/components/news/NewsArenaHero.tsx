"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper, Radar } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import { NEWS_CATEGORIES } from "@/lib/news-utils";

const ORBIT_CATS = NEWS_CATEGORIES.filter((c) => c !== "All News").slice(0, 6);

export default function OrbitingNewsCategories() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,400px)]">
      <motion.div
        className="absolute inset-[8%] rounded-full border border-gold-400/20"
        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full border border-dashed border-cyan-400/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[28%] rounded-full border border-gold-500/20 bg-gradient-to-br from-gold-500/10 via-black/40 to-cyan-500/10 shadow-[0_0_50px_rgba(212,175,55,0.15)]" />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      >
        {ORBIT_CATS.map((cat, i) => {
          const angle = (360 / ORBIT_CATS.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 42 * Math.cos(rad);
          const y = 50 + 42 * Math.sin(rad);
          return (
            <motion.span
              key={cat}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            >
              <span className="whitespace-nowrap rounded-full border border-gold-400/30 bg-black/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-200 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-md">
                {cat}
              </span>
            </motion.span>
          );
        })}
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-[38%] origin-left bg-gradient-to-r from-gold-400/80 to-transparent"
        style={{ translateX: "-0%", translateY: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/15 ring-1 ring-gold-400/50"
          style={{ boxShadow: "0 0 36px rgba(212,175,55,0.35)" }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Radar className="h-7 w-7 text-gold-300" />
        </motion.div>
      </div>
    </div>
  );
}

export function NewsArenaHero() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(212,175,55,0.14),transparent_45%),radial-gradient(ellipse_at_90%_50%,rgba(34,211,238,0.1),transparent_40%)]" />
      <div className="hero-orb hero-orb-gold opacity-40" />
      <div className="absolute inset-0 bg-grid-premium opacity-25" />

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold-400/55"
          style={{ left: `${8 + i * 9}%`, top: `${28 + (i % 4) * 12}%` }}
          animate={{ opacity: [0.2, 0.75, 0.2], y: [0, -10, 0] }}
          transition={{ duration: 3.2 + (i % 3), repeat: Infinity, delay: i * 0.18 }}
        />
      ))}

      <motion.div
        className="relative border-y border-gold-400/20 bg-black/40 py-2.5 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.p
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 truncate px-4 text-center text-sm text-gold-300"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          LIVE — Casino intelligence desk · South Asia · Updated hourly
        </motion.p>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              <Newspaper className="h-3.5 w-3.5" />
              {t("newsHeroInsight")}
            </p>
            <h1 className="mt-3 zb-headline text-4xl sm:text-5xl">
              {t("newsHeroTitle1")}{" "}
              <span className="zb-gradient-text">{t("newsHeroTitle2")}</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">{t("newsHeroSubtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/jackpots" className="zb-btn-gold zb-shine inline-flex">
                {t("trendingNews")} →
              </Link>
              <Link href="/casinos" className="zb-btn-cyan inline-flex">
                Casino Reviews
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Live coverage radar
            </p>
            <OrbitingNewsCategories />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
