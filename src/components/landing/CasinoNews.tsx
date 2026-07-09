"use client";

import Link from "next/link";
import { sampleNews } from "@/data/news";
import SectionReveal from "./SectionReveal";

export default function CasinoNews() {
  const [featured, ...rest] = sampleNews.slice(0, 5);

  return (
    <section className="zb-section border-t border-white/5 bg-navy-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Intelligence Feed</p>
              <h2 className="mt-2 zb-headline">Casino News</h2>
            </div>
            <Link href="/news" className="text-sm font-semibold text-gold-400 hover:text-gold-300">
              Read More News →
            </Link>
          </div>
        </SectionReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SectionReveal>
            <Link href={`/news/${featured.id}`} className="group block h-full">
              <article className="zb-glass-gold relative h-full overflow-hidden p-6 md:p-8">
                <span className="rounded-full bg-danger-500/20 px-3 py-1 text-xs font-bold text-danger-300">
                  Breaking News
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white transition-colors group-hover:text-gold-300 md:text-3xl">
                  {featured.title.en}
                </h3>
                <p className="mt-3 line-clamp-3 text-slate-400">{featured.excerpt.en}</p>
                <p className="mt-6 text-sm font-semibold text-cyan-400">Read full story →</p>
                <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-gold-500/10 blur-2xl" />
              </article>
            </Link>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((article, i) => (
              <SectionReveal key={article.id} delay={i * 0.06}>
                <Link href={`/news/${article.id}`} className="group block">
                  <article className="zb-glass flex gap-4 p-4 transition-all hover:border-cyan-400/30">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-navy-800 text-2xl">
                      📰
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                        {i === 0 ? "Trending" : "Exclusive"}
                      </span>
                      <h3 className="mt-1 line-clamp-2 font-semibold text-white group-hover:text-cyan-300">
                        {article.title.en}
                      </h3>
                    </div>
                  </article>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
