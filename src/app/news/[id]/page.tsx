import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById, sampleNews } from "@/data/news";
import NewsDetail from "@/components/NewsDetail";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return sampleNews.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getNewsById(id);

  if (!article) {
    return {};
  }

  return buildPageMetadata({
    title: article.title.en,
    description: article.excerpt.en,
    path: `/news/${id}`,
    noIndex: article.indexable === false,
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = getNewsById(id);

  if (!article) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/news/${id}`;
  const jsonLd = [];

  if (article.indexable !== false) {
    jsonLd.push(
      articleSchema({
        title: article.title.en,
        description: article.excerpt.en,
        url: pageUrl,
        datePublished: article.publishedAt,
        author: article.source,
      })
    );
  }

  jsonLd.push(
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "News", url: `${siteConfig.url}/news` },
      { name: article.title.en, url: pageUrl },
    ])
  );

  return (
    <>
      {jsonLd.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="zb-page-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <Link href="/news" className="text-sm font-medium text-gold-400 hover:text-gold-300">
            ← Back to News
          </Link>
          <div className="mt-6">
            <NewsDetail article={article} />
          </div>
        </div>
      </div>
    </>
  );
}
