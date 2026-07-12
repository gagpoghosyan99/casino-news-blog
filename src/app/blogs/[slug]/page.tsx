import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, blogPosts } from "@/data/blogs";
import { getCasinoByBlogSlug } from "@/data/casinos";
import BlogContent from "@/components/BlogContent";
import EditorialTrustBlock from "@/components/editorial/EditorialTrustBlock";
import { editorialAuthor, getPillarReviewFreshness } from "@/data/editorial";
import {
  getPillarReviewFaqs,
  isPillarReviewSlug,
} from "@/data/pillar-reviews";
import { getChecklistReviewFaqs } from "@/data/checklist-reviews-p6";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqPageSchema, reviewSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const reviewCategories = new Set(["good-casino", "bad-casino", "ranking-casino"]);

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {};
  }

  return buildPageMetadata({
    title: post.title.en,
    description: post.excerpt.en,
    path: `/blogs/${post.slug}`,
    noIndex: post.indexable === false,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const casino = getCasinoByBlogSlug(slug);
  const isCasinoReview = reviewCategories.has(post.category);
  const isPillar = isPillarReviewSlug(slug);
  const pageUrl = `${siteConfig.url}/blogs/${post.slug}`;
  const freshness = isPillar ? getPillarReviewFreshness(slug) : undefined;

  const reviewJsonLd =
    isCasinoReview && casino && isPillar
      ? reviewSchema({
          name: casino.name,
          rating: casino.rating,
          description: post.excerpt.en,
          url: pageUrl,
          datePublished: freshness?.datePublished,
          dateModified: freshness?.dateModified,
          authorName: editorialAuthor.name,
          authorUrl: editorialAuthor.url,
        })
      : null;

  const pillarFaqs = getPillarReviewFaqs(slug);
  const checklistFaqs = pillarFaqs.length === 0 ? getChecklistReviewFaqs(slug) : [];
  const faqsForSchema = pillarFaqs.length > 0 ? pillarFaqs : checklistFaqs;
  const faqJsonLd = faqsForSchema.length > 0 ? faqPageSchema(faqsForSchema) : null;

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Reviews", url: `${siteConfig.url}/blogs` },
    { name: post.title.en, url: pageUrl },
  ]);

  const jsonLd = [reviewJsonLd, faqJsonLd, breadcrumbJsonLd].filter(Boolean);

  return (
    <div className="zb-page-bg min-h-screen">
      {jsonLd.map((schema) => (
        <script
          key={schema!["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <Link href="/blogs" className="text-sm font-medium text-gold-400 hover:text-gold-300">
          ← Back to Reviews
        </Link>
        {isPillar && <EditorialTrustBlock slug={slug} />}
        <BlogContent post={post} casino={casino} showMethodologyLink={isCasinoReview} />
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/casinos" className="zb-btn-gold text-sm">
            Casino directory
          </Link>
          <Link href="/compare" className="zb-btn-cyan text-sm">
            Compare casinos
          </Link>
          <Link href="/bonuses" className="zb-btn-ghost text-sm">
            Bonuses
          </Link>
        </div>
      </div>
    </div>
  );
}
