"use client";

import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";
import {
  affiliateOfferCards,
  dashboardPreviewTiles,
  mediaKitCards,
  playerBenefitCards,
  playerJourney,
} from "@/data/partners/content";
import type { AffiliateOfferCard as Offer } from "@/types/partners";
import { AFFILIATE_LINK_REL } from "@/lib/seo/affiliate-link";
import { ExternalLink } from "lucide-react";

export function OfferTransparencyCard({
  compact = false,
}: {
  compact?: boolean;
}) {
  if (compact) {
    return (
      <p className="text-[11px] leading-relaxed text-slate-500">
        ZeoneBet may receive compensation when you follow selected links. This does not increase your cost.
        Always review the operator’s full terms.{" "}
        <Link href="/affiliate-disclosure" className="text-gold-500 hover:text-gold-400">
          Disclosure
        </Link>
        {" · "}
        <Link href="/responsible-gambling" className="text-gold-500 hover:text-gold-400">
          18+ Play responsibly
        </Link>
      </p>
    );
  }

  return (
    <aside className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 text-sm leading-relaxed text-amber-100/90">
      <p className="font-semibold text-amber-200">Offer transparency</p>
      <p className="mt-2">
        ZeoneBet may receive compensation when you follow selected links. This does not increase your cost.
        Offers are controlled by third-party operators and may change. Always review the operator’s full terms
        before registering or depositing. 18+ only.
      </p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
        <Link href="/affiliate-disclosure" className="text-gold-300 hover:text-gold-200">
          Affiliate disclosure
        </Link>
        <Link href="/responsible-gambling" className="text-gold-300 hover:text-gold-200">
          Responsible gambling
        </Link>
        <Link href="/how-we-review" className="text-gold-300 hover:text-gold-200">
          Review methodology
        </Link>
      </div>
    </aside>
  );
}

function AffiliateOfferCard({ offer }: { offer: Offer }) {
  const expired = offer.status === "expired";
  const external = offer.destinationUrl.startsWith("http");

  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-lg font-bold text-white">{offer.operatorName}</h3>
        {offer.affiliateRelationship && (
          <span className="rounded-full border border-gold-400/30 bg-gold-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
            Affiliate
          </span>
        )}
        {offer.sponsored && (
          <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
            Sponsored
          </span>
        )}
        {offer.status === "needs_review" && (
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Verify on operator
          </span>
        )}
      </div>
      <p className="mt-2 font-semibold text-gold-300">{offer.title}</p>
      <p className="mt-2 text-sm text-slate-400">{offer.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div>
          <dt className="text-slate-500">Type</dt>
          <dd className="font-medium text-slate-300">{offer.bonusType || "—"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Value</dt>
          <dd className="font-numeric font-medium text-slate-300">{offer.bonusValue || "—"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Wagering</dt>
          <dd className="font-medium text-slate-300">{offer.wageringRequirement || "—"}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Age</dt>
          <dd className="font-numeric font-medium text-slate-300">{offer.ageRequirement}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500">Eligibility</dt>
          <dd className="font-medium text-slate-300">{offer.eligibleCountries.join(", ")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-slate-500">Last verified</dt>
          <dd className="font-numeric font-medium text-slate-300">{offer.lastVerifiedAt}</dd>
        </div>
      </dl>
      <div className="mt-auto space-y-3 pt-5">
        <OfferTransparencyCard compact />
        {expired ? (
          <p className="text-sm text-danger-300">This offer listing has expired.</p>
        ) : (
          <a
            href={offer.destinationUrl}
            target={external || offer.destinationUrl.startsWith("/go/") ? "_blank" : undefined}
            rel={
              offer.destinationUrl.startsWith("/go/") || external
                ? `${AFFILIATE_LINK_REL} noopener noreferrer`
                : undefined
            }
            className="zb-btn-gold zb-shine inline-flex w-full text-sm"
          >
            View offer <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <a href={offer.termsUrl} target="_blank" rel="noopener noreferrer" className="block text-center text-xs text-gold-400 hover:text-gold-300">
          Full terms
        </a>
      </div>
    </article>
  );
}

export function PlayerBenefits() {
  return (
    <section id="for-players" className="scroll-mt-28 border-y border-white/10 bg-gradient-to-b from-gold-500/[0.04] to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionReveal>
          <h2 className="zb-headline text-2xl md:text-3xl">
            Use ZeoneBet to make better-informed casino choices.
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
            ZeoneBet helps you compare casino options, understand promotions, read reviews, check important
            conditions, discover available referral offers, and learn how wagering and payments work. Casino
            accounts, deposits, withdrawals, verification, bonuses, games, and support are managed by the
            relevant third-party operator — not by ZeoneBet.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {playerBenefitCards.map((card, i) => (
            <SectionReveal key={card.id} delay={Math.min(i * 0.04, 0.2)}>
              <div className="h-full rounded-2xl border border-white/10 bg-black/40 p-5">
                <h3 className="font-display text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{card.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Offers, eligibility, rewards and qualification rules are determined by the relevant casino operator
          and may change. Where available · subject to eligibility · terms apply · availability depends on
          country and operator.
        </p>
      </div>
    </section>
  );
}

export function PlayerJourney() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">How players use ZeoneBet</h2>
      </SectionReveal>
      <ol className="mt-8 grid gap-4 md:grid-cols-5">
        {playerJourney.map((step) => (
          <li key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <span className="font-numeric text-xs font-bold text-gold-400">Step {step.step}</span>
            <h3 className="mt-2 font-display text-base font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{step.description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <OfferTransparencyCard />
      </div>
    </section>
  );
}

export function PlayerOffersSection() {
  return (
    <section id="player-offers" className="scroll-mt-36 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">Example tracked offers</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Sample listings for editorial transparency. Headline bonus amounts that are not independently
          confirmed are labeled as operator-page values — never invent winnings.
        </p>
      </SectionReveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {affiliateOfferCards.map((offer) => (
          <AffiliateOfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/bonuses" className="zb-btn-cyan inline-flex">
          Browse all bonus guides
        </Link>
      </div>
    </section>
  );
}

export function ReferralProgram() {
  return (
    <section id="referral-benefits" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <div className="overflow-hidden rounded-3xl border border-gold-400/30 bg-gradient-to-br from-gold-500/10 via-black/50 to-black/40 p-6 sm:p-10">
          <span className="rounded-full border border-gold-400/40 bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-300">
            Coming soon
          </span>
          <h2 className="mt-4 zb-headline text-2xl md:text-3xl">ZeoneBet Referral Program</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
            A future registered-user program may provide a personal referral link or code, activity tracking,
            and eligible rewards based on published program terms. This is architecture and waitlist UI only —
            no fake payouts or tracking results are shown.
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Create a ZeoneBet account",
              "Complete required verification",
              "Receive a personal referral link or code",
              "Share through approved channels",
              "Track qualified activity",
              "Receive eligible rewards based on program terms",
            ].map((item, i) => (
              <li key={item} className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-300">
                <span className="font-numeric text-gold-400">{i + 1}.</span> {item}
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm font-semibold text-white">Anti-abuse rules</p>
            <ul className="mt-3 grid gap-1 text-sm text-slate-400 sm:grid-cols-2">
              {[
                "No self-referrals",
                "No misleading advertising",
                "No spam",
                "No prohibited traffic sources",
                "No duplicate accounts",
                "No impersonation",
                "No promotion to restricted or underage audiences",
                "No guaranteed-income claims",
                "No manipulation of tracking",
                "Rewards require validation",
              ].map((r) => (
                <li key={r}>· {r}</li>
              ))}
            </ul>
          </div>
          <a href="#contact" className="zb-btn-gold zb-shine mt-8 inline-flex">
            Join the Referral Waitlist
          </a>
          <p className="mt-3 text-xs text-slate-500">
            Waitlist interest is recorded via the partnerships desk until self-serve referral tooling launches.
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}

export function PartnerDashboardPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Partner dashboard preview</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">What partners may manage later</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Sample UI only — not live campaign data. Labels use demo wording so nothing is mistaken for real metrics.
        </p>
      </SectionReveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardPreviewTiles.map((tile) => (
          <div key={tile.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">{tile.label}</p>
            <p className="mt-2 font-numeric text-lg font-semibold text-slate-300">{tile.demoValue}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MediaKitSection({ onRequest }: { onRequest: () => void }) {
  return (
    <section id="advertising" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <h2 className="zb-headline text-2xl md:text-3xl">Plan your campaign</h2>
      </SectionReveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaKitCards.map((card) => (
          <div key={card.id} className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <h3 className="font-display text-base font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={onRequest} className="zb-btn-gold zb-shine">
          Request Media Kit
        </button>
        <a href="#contact" className="zb-btn-cyan">
          Discuss a Campaign
        </a>
      </div>
      <p className="mt-3 text-xs text-slate-500">No fake download file — media kit requests go through the inquiry form.</p>
    </section>
  );
}

export function EditorialIndependence() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="zb-headline text-2xl md:text-3xl">Commercial partnerships do not buy positive ratings</h2>
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-slate-300">
            <li>· Paid relationships may influence placement visibility.</li>
            <li>· Sponsored content is labeled.</li>
            <li>· Casino submission does not guarantee publication.</li>
            <li>· Commercial partners cannot directly control editorial conclusions.</li>
            <li>· Reviews should use the same published evaluation methodology.</li>
            <li>· Offers can be removed or updated when information changes.</li>
            <li>· Users should independently check operator terms.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/how-we-review" className="text-gold-400 hover:text-gold-300">
              Review Methodology
            </Link>
            <Link href="/editorial-policy" className="text-gold-400 hover:text-gold-300">
              Editorial Policy
            </Link>
            <Link href="/affiliate-disclosure" className="text-gold-400 hover:text-gold-300">
              Affiliate Disclosure
            </Link>
            <Link href="/responsible-gambling" className="text-gold-400 hover:text-gold-300">
              Responsible Gambling
            </Link>
            <Link href="/contact" className="text-gold-400 hover:text-gold-300">
              Corrections & contact
            </Link>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
