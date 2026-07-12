"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { getLocalizedText } from "@/lib/i18n";
import { categoryStyles, formatTimeAgo } from "@/lib/news-utils";
import { NewsArticle } from "@/types";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

interface NewsDetailProps {
  article: NewsArticle;
}

function renderInlineContent(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <Link
          key={index}
          href={linkMatch[2]}
          className="font-medium text-gold-400 hover:text-gold-300"
        >
          {linkMatch[1]}
        </Link>
      );
    }
    return part;
  });
}

export default function NewsDetail({ article }: NewsDetailProps) {
  const { locale } = useLocale();
  const content = getLocalizedText(article.content, locale);
  const styles = categoryStyles(article.category);

  return (
    <article>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${styles.pill}`}>
          {article.category}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
          {formatTimeAgo(article.publishedAt, locale)}
        </span>
      </div>

      <h1 className="mt-4 zb-headline text-3xl md:text-4xl">
        {getLocalizedText(article.title, locale)}
      </h1>

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
        <span>{article.source}</span>
        <span>·</span>
        <time>
          {new Date(article.publishedAt).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN")}
        </time>
      </div>

      <PremiumTiltCard className="mt-8" tone="gold">
        <p className="text-lg leading-relaxed text-slate-300">
          {getLocalizedText(article.excerpt, locale)}
        </p>
      </PremiumTiltCard>

      <div className="mt-6 space-y-4 leading-relaxed text-slate-300">
        {content.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={i} className="mt-8 font-display text-xl font-semibold text-gold-300">
                {paragraph.replace("## ", "")}
              </h2>
            );
          }
          if (paragraph.startsWith("- ")) {
            return (
              <ul key={i} className="list-disc space-y-1 pl-6 text-slate-300">
                {paragraph.split("\n").map((line, j) => (
                  <li key={j}>{renderInlineContent(line.replace("- ", ""))}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
              {renderInlineContent(paragraph)}
            </p>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/news" className="zb-btn-cyan">
          More news
        </Link>
        <Link href="/casinos" className="zb-btn-gold">
          Trusted casinos
        </Link>
      </div>
    </article>
  );
}
