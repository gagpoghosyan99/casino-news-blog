"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { getLocalizedText } from "@/lib/i18n";
import { categoryStyles, formatTimeAgo } from "@/lib/news-utils";
import { NewsArticle } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "featured" | "brief";
  index?: number;
}

export default function NewsCard({ article, variant = "featured", index = 0 }: NewsCardProps) {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const styles = categoryStyles(article.category);
  const title = getLocalizedText(article.title, locale);
  const excerpt = getLocalizedText(article.excerpt, locale);
  const isBrief = variant === "brief" || article.indexable === false;
  const large = variant === "featured" && index < 2;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
  };

  return (
    <Link href={`/news/${article.id}`} className="group block h-full">
      <div style={{ perspective: "1200px" }} className="h-full">
        <motion.article
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{ rotateX: tilt.x, rotateY: tilt.y, y: large ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className={`relative flex h-full flex-col overflow-hidden rounded-3xl border backdrop-blur-xl ${
            isBrief
              ? "border-white/10 bg-gradient-to-br from-white/[0.04] via-black/45 to-slate-500/5"
              : large
                ? "border-gold-400/35 bg-gradient-to-br from-gold-500/12 via-black/50 to-cyan-500/8 shadow-[0_20px_55px_rgba(212,175,55,0.16)]"
                : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/45 to-gold-500/5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)]"
            animate={{ x: ["-65%", "125%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
              delay: (index % 5) * 0.3,
            }}
          />

          <div
            className={`relative flex items-center justify-center bg-gradient-to-br ${styles.image} ${
              large ? "h-52" : "h-40"
            }`}
            style={{ transform: "translateZ(18px)" }}
          >
            <motion.span
              className="text-5xl drop-shadow-[0_0_24px_rgba(212,175,55,0.35)] sm:text-6xl"
              animate={{ y: [0, -6, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {styles.icon}
            </motion.span>
            <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles.pill}`}>
                {article.category}
              </span>
              {isBrief && (
                <span className="rounded-full border border-slate-500/40 bg-navy-950/80 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur">
                  Brief update
                </span>
              )}
              <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur">
                {formatTimeAgo(article.publishedAt, locale)}
              </span>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col p-5" style={{ transform: "translateZ(24px)" }}>
            <h2
              className={`line-clamp-2 font-display font-bold leading-snug text-white group-hover:text-gold-300 ${
                large ? "text-xl sm:text-2xl" : "text-lg"
              }`}
            >
              {title}
            </h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">{excerpt}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <time dateTime={article.publishedAt} className="text-slate-500">
                {new Date(article.publishedAt).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-GB")}
              </time>
              <span className="inline-flex items-center gap-1 font-semibold text-gold-400 group-hover:text-gold-300">
                Read full news
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </Link>
  );
}
