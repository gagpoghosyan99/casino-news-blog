"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import type { NewsCategory } from "@/lib/news-utils";
import { NewsArticle } from "@/types";
import { NewsArenaHero } from "@/components/news/NewsArenaHero";
import NewsCategoryFilter from "@/components/news/NewsCategoryFilter";
import NewsCard from "@/components/news/NewsCard";
import NewsSidebar from "@/components/news/NewsSidebar";
import NewsTrustBar from "@/components/news/NewsTrustBar";
import SectionReveal from "@/components/landing/SectionReveal";

function sortByDateDesc(a: NewsArticle, b: NewsArticle) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

interface NewsListingClientProps {
  initialArticles: NewsArticle[];
}

export default function NewsListingClient({ initialArticles }: NewsListingClientProps) {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [loading] = useState(false);
  const [category, setCategory] = useState<NewsCategory>("All News");

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles?.length) {
          setArticles(data.articles);
        }
      })
      .catch(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    if (category === "All News") return articles;
    return articles.filter((a) => a.category === category);
  }, [articles, category]);

  const featuredArticles = useMemo(
    () => filtered.filter((a) => a.indexable !== false).sort(sortByDateDesc),
    [filtered]
  );

  const briefArticles = useMemo(
    () => filtered.filter((a) => a.indexable === false).sort(sortByDateDesc),
    [filtered]
  );

  return (
    <div className="zb-page-bg min-h-screen">
      <NewsArenaHero />
      <NewsCategoryFilter active={category} onChange={setCategory} />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(212,175,55,0.06),transparent_40%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {loading ? (
              <div className="py-20 text-center text-slate-500">{t("loadingNews")}</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-slate-500">{t("noNewsInCategory")}</div>
            ) : (
              <div className="space-y-14">
                {featuredArticles.length > 0 && (
                  <section>
                    <SectionReveal>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                        Intelligence feed
                      </p>
                      <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Latest casino news</h2>
                    </SectionReveal>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {featuredArticles.slice(0, 2).map((article, i) => (
                        <SectionReveal key={article.id} delay={i * 0.06}>
                          <NewsCard article={article} variant="featured" index={i} />
                        </SectionReveal>
                      ))}
                    </div>
                    {featuredArticles.length > 2 && (
                      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {featuredArticles.slice(2).map((article, i) => (
                          <SectionReveal key={article.id} delay={Math.min(i * 0.04, 0.3)}>
                            <NewsCard article={article} variant="featured" index={i + 2} />
                          </SectionReveal>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {briefArticles.length > 0 && (
                  <section>
                    <SectionReveal>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                        Quick notes
                      </p>
                      <h2 className="mt-2 zb-headline text-2xl">Brief updates</h2>
                      <p className="mt-2 text-sm text-slate-500">
                        Short editorial notes — not full reports. These pages are not indexed in search.
                      </p>
                    </SectionReveal>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {briefArticles.map((article, i) => (
                        <SectionReveal key={article.id} delay={Math.min(i * 0.04, 0.3)}>
                          <NewsCard article={article} variant="brief" index={i} />
                        </SectionReveal>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <NewsSidebar articles={articles} />
        </div>
      </div>

      <NewsTrustBar />
    </div>
  );
}
