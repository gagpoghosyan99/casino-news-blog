"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, Star, Zap } from "lucide-react";
import CasinoLogo from "@/components/CasinoLogo";
import { getCasinoRankingMeta } from "@/data/casino-ranking-meta";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import type { Casino } from "@/types";

type CasinoDirectoryCardProps = {
  casino: Casino;
  featured?: boolean;
  index?: number;
};

export default function CasinoDirectoryCard({
  casino,
  featured = false,
  index = 0,
}: CasinoDirectoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reviewHref = `/blogs/${casino.blogSlug}`;
  const meta = getCasinoRankingMeta(casino.slug, casino.rating, index);
  const isCaution = casino.type === "bad";
  const isTop = casino.type === "good" || featured;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
  };

  return (
    <div style={{ perspective: "1200px" }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, y: featured ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 backdrop-blur-xl sm:p-6 ${
          isCaution
            ? "border-danger-500/35 bg-gradient-to-br from-danger-500/10 via-black/50 to-black/40 shadow-[0_16px_40px_rgba(239,68,68,0.12)]"
            : featured || isTop
              ? "border-gold-400/40 bg-gradient-to-br from-gold-500/12 via-black/50 to-cyan-500/8 shadow-[0_20px_55px_rgba(212,175,55,0.18)]"
              : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/45 to-gold-500/5 shadow-[0_14px_36px_rgba(0,0,0,0.35)]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.08)_50%,transparent_65%)]"
          animate={{ x: ["-65%", "125%"] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2,
            delay: (index % 6) * 0.25,
          }}
        />

        <div
          className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
          style={{ transform: "translateZ(24px)" }}
        >
          <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                  isCaution
                    ? "bg-danger-500/20 text-danger-300"
                    : featured
                      ? "bg-gold-500 text-navy-950 shadow-[0_0_16px_rgba(212,175,55,0.45)]"
                      : "bg-white/10 text-gold-400"
                }`}
              >
                {String(casino.rank).padStart(2, "0")}
              </span>
              <CasinoLogo
                name={casino.name}
                slug={casino.slug}
                rank={casino.rank}
                type={casino.type}
                variant="square"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  <Link
                    href={reviewHref}
                    className="hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                  >
                    {casino.name}
                  </Link>
                </h3>
                {isCaution ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-danger-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-danger-300 ring-1 ring-danger-500/30">
                    <ShieldAlert className="h-3 w-3" /> Caution
                  </span>
                ) : featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300 ring-1 ring-gold-400/35">
                    <Star className="h-3 w-3 fill-gold-400" /> Featured
                  </span>
                ) : null}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <p className="font-notice text-2xl text-gold-300">{casino.rating.toFixed(1)}</p>
                <div className="flex gap-2 text-xs text-slate-400">
                  <span>
                    Trust <strong className="text-slate-200">{meta.trustScore.toFixed(1)}</strong>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>
                    User <strong className="text-slate-200">{meta.userScore.toFixed(1)}</strong>
                  </span>
                  <span className="text-slate-600">·</span>
                  <span>
                    Bonus <strong className="text-slate-200">{meta.bonusScore.toFixed(1)}</strong>
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {meta.payments.slice(0, 4).map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {featured && (
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
                  {casino.summary.en}
                </p>
              )}
            </div>
          </div>

          <div
            className="relative z-10 flex shrink-0 flex-row gap-2 sm:flex-col sm:items-stretch"
            style={{ transform: "translateZ(30px)" }}
          >
            <Link
              href={`/go/${casino.slug}`}
              rel={AFFILIATE_LINK_REL}
              target="_blank"
              className="zb-btn-gold zb-shine inline-flex flex-1 items-center justify-center gap-1.5 !px-4 !py-2.5 text-xs sm:flex-none"
            >
              <Zap className="h-3.5 w-3.5" />
              Register
              <ExternalLink className="h-3 w-3 opacity-80" />
            </Link>
            <Link
              href={reviewHref}
              className="zb-btn-ghost inline-flex flex-1 items-center justify-center !px-4 !py-2.5 text-xs sm:flex-none"
            >
              Review
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
