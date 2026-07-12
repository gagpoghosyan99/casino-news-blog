import Link from "next/link";
import type { Casino } from "@/types";
import type { CasinoFilter } from "@/lib/casino-filter";
import CasinoDirectoryCard from "@/components/casinos/CasinoDirectoryCard";
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
            <Link href="/bonuses" className="zb-btn-gold">
              Claim Bonuses
            </Link>
            <Link href="/compare" className="zb-btn-cyan">
              Compare Casinos
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap gap-2" aria-label="Casino directory filters">
          {FILTER_TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === tab.key
                  ? "border-gold-500/50 bg-gold-500/20 text-gold-300 shadow-glow-gold"
                  : "border-white/10 text-slate-400 hover:border-cyan-400/30 hover:text-slate-200"
              }`}
              aria-current={filter === tab.key ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <section className="mt-10" aria-labelledby="directory-how-to-heading">
          <h2 id="directory-how-to-heading" className="font-display text-2xl font-bold text-white">
            How to use this casino directory
          </h2>
          <div className="zb-glass mt-4 p-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Start with your primary question — payments, crypto, sports crossover, or complaint
              themes — then open the linked review before depositing. Use the{" "}
              <strong className="text-white">Top rated</strong> filter for editor-favoured brands,
              the full ranking for discovery, and the <strong className="text-white">Caution list</strong>{" "}
              for operators with repeated reported concerns. Every score is an editorial estimate
              from our published weights, not a guarantee of payouts or legal permission to play
              in your jurisdiction.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              We recommend verifying cashier methods after login, reading bonus terms before opting
              in, and testing a small withdrawal where policy allows. Cross-check payment context on
              our{" "}
              <Link href="/india-casino-payments" className="text-gold-400 hover:text-gold-300">
                India
              </Link>
              ,{" "}
              <Link href="/bangladesh-casino-payments" className="text-gold-400 hover:text-gold-300">
                Bangladesh
              </Link>
              , and{" "}
              <Link href="/pakistan-casino-payments" className="text-gold-400 hover:text-gold-300">
                Pakistan payment hubs
              </Link>{" "}
              before sending money. Use the{" "}
              <Link href="/compare" className="text-gold-400 hover:text-gold-300">
                comparison hub
              </Link>{" "}
              to shortlist two or three brands side by side.
            </p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="directory-scoring-heading">
          <h2 id="directory-scoring-heading" className="font-display text-2xl font-bold text-white">
            How ZEONEBET scores casinos
          </h2>
          <div className="zb-glass mt-4 p-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Ratings combine safety and licensing signals, payment and withdrawal clarity, bonus
              fairness, game variety, mobile usability, support quality, and recurring complaint
              themes. Commercial affiliate relationships do not purchase higher scores.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Read the full{" "}
              <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
                review methodology
              </Link>
              , browse the{" "}
              <Link href="/blacklist" className="text-gold-400 hover:text-gold-300">
                editorial blacklist
              </Link>
              , and follow{" "}
              <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
                responsible gambling guidance
              </Link>
              . 18+ only.
            </p>
          </div>
        </section>

        {showBadDisclaimer && (
          <div className="mt-6 rounded-2xl border border-danger-500/30 bg-danger-500/5 p-5">
            <p className="font-semibold text-danger-300">Editorial caution list</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              These brands show repeated reported concerns in public player feedback. ZEONEBET
              documents risk indicators — not legal findings. Verify operator terms and local laws
              before depositing.
            </p>
          </div>
        )}

        {filter !== "bad" && featured.length > 0 && (
          <section className="mt-10" aria-labelledby="featured-casinos-heading">
            <h2 id="featured-casinos-heading" className="font-display text-2xl font-bold text-white">
              Featured pillar reviews
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              In-depth editorial reviews with FAQ coverage, payment notes, and compliance language.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {featured.map((casino) => (
                <CasinoDirectoryCard key={casino.id} casino={casino} featured />
              ))}
            </div>
          </section>
        )}

        <section className="mt-12" aria-labelledby="directory-list-heading">
          <h2 id="directory-list-heading" className="font-display text-2xl font-bold text-white">
            {listHeading}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {casinos.length} casinos · Updated for 2026 · Terms and availability vary by region
          </p>
          <div className="mt-6 space-y-4">
            {casinos.map((casino) => (
              <CasinoDirectoryCard key={casino.id} casino={casino} />
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="directory-resources-heading">
          <h2 id="directory-resources-heading" className="font-display text-xl font-bold text-white">
            Related guides &amp; trust resources
          </h2>
          <div className="zb-glass mt-4 p-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium text-gold-400 hover:text-gold-300">
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
        </section>
      </div>
    </PageShell>
  );
}
