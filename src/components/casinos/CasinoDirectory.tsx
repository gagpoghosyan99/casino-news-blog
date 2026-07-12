import Link from "next/link";
import type { Casino } from "@/types";
import type { CasinoFilter } from "@/lib/casino-filter";
import CasinoDirectoryCard from "@/components/casinos/CasinoDirectoryCard";
import {
  DirectoryGuideSection,
  DirectoryScoringSection,
} from "@/components/casinos/DirectoryGuideSections";
import SectionReveal from "@/components/landing/SectionReveal";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";

const FILTER_TABS: { key: CasinoFilter; label: string; href: string }[] = [
  { key: "all", label: "All rankings", href: "/casinos" },
  { key: "good", label: "Top rated", href: "/casinos?tab=good" },
  { key: "bad", label: "Caution list", href: "/casinos?tab=bad" },
];

const RESOURCE_LINKS = [
  { href: "/blogs/review-stake", label: "Stake review" },
  { href: "/blogs/review-bc-game", label: "BC.Game review" },
  { href: "/blogs/review-roobet", label: "Roobet review" },
  { href: "/blogs/review-bet365", label: "Bet365 review" },
  { href: "/blogs/review-leovegas", label: "LeoVegas review" },
  { href: "/payment/upi", label: "UPI payment guide" },
  { href: "/india-casino-payments", label: "India payment hub" },
  { href: "/compare", label: "Compare casinos" },
  { href: "/how-we-review", label: "Review methodology" },
  { href: "/responsible-gambling", label: "Responsible gambling" },
];

type CasinoDirectoryProps = {
  filter: CasinoFilter;
  listHeading: string;
  casinos: Casino[];
  featured: Casino[];
  showBadDisclaimer?: boolean;
};

export default function CasinoDirectory({
  filter,
  listHeading,
  casinos,
  featured,
  showBadDisclaimer = false,
}: CasinoDirectoryProps) {
  return (
    <PageShell>
      <PageHero
        kicker="Casino Directory"
        title="Top Online Casino Reviews for South Asian Players"
        description="Compare editor-rated casinos including Stake, BC.Game, Roobet, Bet365, and LeoVegas. Each listing links to an independent ZEONEBET review covering payments, licensing caveats, bonus honesty, and responsible gambling notes."
        badges={["Independent reviews", "Payment context", "18+ only"]}
        tone="gold"
        actions={
          <>
            <Link href="/bonuses" className="zb-btn-gold zb-shine">
              Claim Bonuses
            </Link>
            <Link href="/compare" className="zb-btn-cyan">
              Compare Casinos
            </Link>
          </>
        }
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(212,175,55,0.06),transparent_40%)]" />

        <SectionReveal>
          <nav className="relative flex flex-wrap gap-2" aria-label="Casino directory filters">
            {FILTER_TABS.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  filter === tab.key
                    ? "border-gold-500/50 bg-gold-500/20 text-gold-300 shadow-[0_0_24px_rgba(212,175,55,0.25)]"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-cyan-400/30 hover:text-slate-200"
                }`}
                aria-current={filter === tab.key ? "page" : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </SectionReveal>

        <DirectoryGuideSection />
        <DirectoryScoringSection />

        {showBadDisclaimer && (
          <SectionReveal>
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-danger-500/35 bg-gradient-to-br from-danger-500/15 via-black/50 to-black/40 p-6 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
              <p className="font-semibold text-danger-300">Editorial caution list</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                These brands show repeated reported concerns in public player feedback. ZEONEBET
                documents risk indicators — not legal findings. Verify operator terms and local laws
                before depositing.
              </p>
            </div>
          </SectionReveal>
        )}

        {filter !== "bad" && featured.length > 0 && (
          <section className="relative mt-14" aria-labelledby="featured-casinos-heading">
            <SectionReveal>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                Spotlight picks
              </p>
              <h2 id="featured-casinos-heading" className="mt-2 zb-headline text-2xl md:text-3xl">
                Featured pillar reviews
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">
                In-depth editorial reviews with real payment rails, trust splits, and register CTAs —
                the same premium card language as the homepage rankings.
              </p>
            </SectionReveal>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {featured.map((casino, i) => (
                <SectionReveal key={casino.id} delay={Math.min(i * 0.05, 0.4)}>
                  <CasinoDirectoryCard casino={casino} featured index={i} />
                </SectionReveal>
              ))}
            </div>
          </section>
        )}

        <section className="relative mt-16" aria-labelledby="directory-list-heading">
          <SectionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Full directory</p>
            <h2 id="directory-list-heading" className="mt-2 zb-headline text-2xl md:text-3xl">
              {listHeading}
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              {casinos.length} casinos · Updated for 2026 · Terms and availability vary by region
            </p>
          </SectionReveal>
          <div className="mt-8 space-y-4">
            {casinos.map((casino, i) => (
              <SectionReveal key={casino.id} delay={Math.min(i * 0.03, 0.35)}>
                <CasinoDirectoryCard casino={casino} index={i} />
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="relative mt-16" aria-labelledby="directory-resources-heading">
          <SectionReveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Resources</p>
            <h2 id="directory-resources-heading" className="mt-2 zb-headline text-xl md:text-2xl">
              Related guides &amp; trust resources
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <div className="relative mt-6 overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/8 p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-xl sm:p-8">
              <ul className="flex flex-wrap gap-x-4 gap-y-3 text-sm">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-gold-300 transition-colors hover:border-gold-400/40 hover:bg-gold-500/10"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                Ratings follow our published{" "}
                <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
                  review methodology
                </Link>
                . ZEONEBET may earn affiliate commissions from outbound links; scores remain
                independent. Gambling involves risk —{" "}
                <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
                  read responsible gambling guidance
                </Link>
                . 18+ only.
              </p>
            </div>
          </SectionReveal>
        </section>
      </div>
    </PageShell>
  );
}
