import Link from "next/link";
import { blogCategoryStyle } from "@/lib/blog-utils";
import type { BlogPost } from "@/types";

interface BlogCardStaticProps {
  post: BlogPost;
  categoryLabel: string;
  featured?: boolean;
}

export default function BlogCardStatic({
  post,
  categoryLabel,
  featured,
}: BlogCardStaticProps) {
  const styles = blogCategoryStyle(post.category);

  const glowClass = featured
    ? "border-gold-400/50 bg-gradient-to-br from-gold-500/12 via-black/50 to-cyan-500/8 shadow-[0_20px_50px_rgba(212,175,55,0.18)]"
    : "border-white/10 bg-gradient-to-br from-white/[0.06] via-black/45 to-gold-500/5 hover:border-gold-400/35";

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all ${glowClass}`}
    >
      <span
        className={`inline-flex w-fit rounded-md px-2.5 py-1 text-xs font-semibold ${styles.pill}`}
      >
        {categoryLabel}
      </span>

      {featured && (
        <span className="mt-2 inline-flex w-fit rounded-full bg-gold-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
          Featured
        </span>
      )}

      <h3 className="mt-4 text-lg font-bold leading-snug text-white sm:text-xl">
        <Link href={`/blogs/${post.slug}`} className="hover:text-gold-300">
          {post.title.en}
        </Link>
      </h3>

      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-400">
        {post.excerpt.en}
      </p>

      <p className="mt-3 text-xs text-slate-600">
        {post.readTime} min read · {post.author}
      </p>

      <Link href={`/blogs/${post.slug}`} className="zb-btn-gold zb-shine mt-6 inline-flex w-full justify-center text-sm">
        Read full review
      </Link>
    </article>
  );
}
