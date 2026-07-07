import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";

const authorityLinks = [
  { href: "/reports/south-asia-casino-payments-2026", label: "2026 payment report" },
  { href: "/blogs", label: "Casino reviews" },
  { href: "/casinos", label: "Casino directory" },
  { href: "/compare", label: "Compare casinos" },
  { href: "/pakistan-casino-payments", label: "Pakistan payments" },
  { href: "/bangladesh-casino-payments", label: "Bangladesh payments" },
  { href: "/india-casino-payments", label: "India payments" },
  { href: "/blogs/review-stake", label: "Stake review" },
  { href: "/blogs/review-bc-game", label: "BC.Game review" },
  { href: "/crypto/bitcoin-casino", label: "Bitcoin casinos" },
  { href: "/crypto/ethereum-casino", label: "Ethereum casinos" },
  { href: "/how-we-review", label: "Review methodology" },
] as const;

export default function HomeAuthoritySection() {
  return (
    <section id="casinopulse-authority" className="border-t border-white/10 bg-navy-950 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <GlassCard glow="gold" className="p-8">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Independent Casino Research for South Asia
          </h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            CasinoPulse helps South Asian players compare casino reviews, payment guides, crypto casino
            options, and safety resources. We publish editorial reviews, regional payment explainers,
            and responsible gambling guidance — without operating casinos or processing deposits.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Start with our methodology, compare brands by trust and payments, then read pillar reviews
            before any deposit. Availability of bonuses and payment rails varies by region and can
            change without notice — always verify inside the official cashier after login.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Read our{" "}
            <Link href="/reports/south-asia-casino-payments-2026" className="text-gold-400 hover:text-gold-300">
              South Asia casino payment methods report
            </Link>{" "}
            for a regional comparison of UPI, MFS wallets, bank rails, and crypto — updated for 2026.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {authorityLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-gold-400 transition-colors hover:border-gold-500/30 hover:text-gold-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </section>
  );
}
