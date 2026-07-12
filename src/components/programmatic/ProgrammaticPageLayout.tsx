import Link from "next/link";
import type { ProgrammaticPage } from "@/types/programmatic";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/ui/PageHero";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

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
  const tone = isCrypto ? "cyan" : "gold";

  return (
    <PageShell>
      <PageHero
        kicker={kicker}
        title={page.h1}
        description={page.intro.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
        badges={["18+ only", "Verify on operator site", "Editorial guide"]}
        tone={tone}
        actions={
          <>
            <Link href="/casinos" className="zb-btn-gold zb-shine">
              Trusted Casinos
            </Link>
            <Link href={isCrypto ? "/crypto" : "/compare"} className="zb-btn-cyan">
              {isCrypto ? "All Crypto Guides" : "Compare Casinos"}
            </Link>
          </>
        }
      />

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap gap-2 text-sm text-slate-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              <Link href={crumb.href} className="hover:text-gold-400">
                {crumb.name}
              </Link>
            </span>
          ))}
        </nav>

        <div className="space-y-5">
          {page.sections.map((section, i) => (
            <PremiumTiltCard key={section.heading} tone={isCrypto ? "cyan" : "gold"} delay={Math.min(i * 0.04, 0.3)}>
              <h2 className="font-display text-xl font-semibold text-gold-300">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{renderInlineContent(section.body)}</p>
            </PremiumTiltCard>
          ))}
        </div>

        {page.faqs && page.faqs.length > 0 && (
          <section className="mt-12" aria-labelledby="faq-heading">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">FAQ</p>
            <h2 id="faq-heading" className="mt-2 zb-headline text-2xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-4">
              {page.faqs.map((faq, i) => (
                <PremiumTiltCard key={faq.question} tone="cyan" delay={Math.min(i * 0.04, 0.24)}>
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {renderInlineContent(faq.answer)}
                  </p>
                </PremiumTiltCard>
              ))}
            </div>
          </section>
        )}

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/8 p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-xl sm:p-8">
          {links.length > 0 && (
            <div className="mb-6 border-b border-white/10 pb-6">
              <h2 className="font-display text-lg font-semibold text-white">
                {page.relatedClusterTitle ?? "Related guides"}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold-300 transition-colors hover:border-gold-400/40 hover:bg-gold-500/10"
                    >
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
            <Link href="/bonuses" className="zb-btn-ghost text-sm">
              Bonuses
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
