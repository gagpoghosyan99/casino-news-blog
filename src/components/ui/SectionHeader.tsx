import Link from "next/link";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  /** Use h1 for page-level titles; h2 for section blocks (default). */
  headingLevel?: "h1" | "h2";
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  href,
  linkLabel = "View all",
  headingLevel = "h2",
}: SectionHeaderProps) {
  const HeadingTag = headingLevel;
  const headingClass =
    headingLevel === "h1"
      ? "mt-1 font-display text-3xl font-bold tracking-tight text-white md:text-4xl"
      : "mt-1 font-display text-3xl font-bold tracking-tight text-white md:text-4xl";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {eyebrow}
          </p>
        )}
        <HeadingTag className={headingClass}>
          {title}
        </HeadingTag>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base text-slate-400">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
