import Link from "next/link";
import type { ProgrammaticPage } from "@/types/programmatic";
import PageShell from "@/components/ui/PageShell";

interface ProgrammaticPageLayoutProps {
  page: ProgrammaticPage;
  breadcrumbs: { name: string; href: string }[];
  relatedLinks?: { href: string; label: string }[];
  kicker?: string;
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

export default function ProgrammaticPageLayout({
  page,
  breadcrumbs,
  relatedLinks,
  kicker = "Editorial Guide",
}: ProgrammaticPageLayoutProps) {
  const links = relatedLinks ?? page.relatedLinks ?? [];
  const isCrypto = kicker.toLowerCase().includes("crypto");

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="bg-grid-premium pointer-events-none absolute inset-0 opacity-30" />
        <div className="hero-orb hero-orb-gold opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <nav className="mb-6 flex flex-wrap gap-2 text-sm text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                <Link href={crumb.href} className="hover:text-gold-400">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>
          <p
            className={`text-xs font-bold uppercase tracking-[0.25em] ${
              isCrypto ? "text-cyan-400" : "text-emerald-400"
            }`}
          >
            {kicker}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{page.h1}</h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{renderInlineContent(page.intro)}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {page.sections.map((section) => (
            <section key={section.heading} className="zb-glass p-6">
              <h2 className="font-display text-xl font-semibold text-gold-400">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{renderInlineContent(section.body)}</p>
            </section>
          ))}
        </div>

        {page.faqs && page.faqs.length > 0 && (
          <section className="mt-10" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-2xl font-bold text-white">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="zb-glass p-5">
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {renderInlineContent(faq.answer)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="zb-glass mt-12 p-6">
          {links.length > 0 && (
            <div className="mb-6 border-b border-white/10 pb-6">
              <h2 className="font-display text-lg font-semibold text-white">
                {page.relatedClusterTitle ?? "Related guides"}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-medium text-gold-400 hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-sm text-slate-400">
            18+ only. Gambling involves risk. Payment availability can change — verify operator terms
            and local laws before depositing. See our{" "}
            <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
              responsible gambling guide
            </Link>
            ,{" "}
            <Link href="/casinos" className="text-gold-400 hover:text-gold-300">
              casino reviews
            </Link>
            , and{" "}
            <Link href="/compare" className="text-gold-400 hover:text-gold-300">
              comparison hub
            </Link>{" "}
            for more options.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/crypto" className="zb-btn-cyan text-sm">
              All Crypto Guides
            </Link>
            <Link href="/casinos" className="zb-btn-gold text-sm">
              Trusted Casinos
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
