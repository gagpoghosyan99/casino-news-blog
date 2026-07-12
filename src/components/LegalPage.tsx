"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import { LegalDocument } from "@/data/legal";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/ui/PageHero";
import PremiumTiltCard from "@/components/ui/PremiumTiltCard";

interface LegalPageProps {
  document: LegalDocument;
  otherPageHref?: string;
  otherPageLabelKey?: "navPrivacy" | "navCookies";
  relatedLinks?: { href: string; label: string }[];
  kicker?: string;
}

export default function LegalPage({
  document,
  otherPageHref,
  otherPageLabelKey,
  relatedLinks,
  kicker = "Legal & Trust",
}: LegalPageProps) {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);

  return (
    <PageShell>
      <PageHero
        kicker={kicker}
        title={document.title}
        description={document.intro}
        badges={[`Updated ${document.lastUpdated}`, "18+ only"]}
        tone="gold"
        actions={
          <>
            <Link href="/" className="zb-btn-gold zb-shine">
              {t("backHome")}
            </Link>
            <Link href="/contact" className="zb-btn-cyan">
              {t("navContact")}
            </Link>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {document.sections.map((section, i) => (
            <PremiumTiltCard key={section.title} delay={Math.min(i * 0.04, 0.28)}>
              <h2 className="font-display text-lg font-semibold text-gold-300">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-inside list-disc space-y-2 text-slate-300">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              )}
            </PremiumTiltCard>
          ))}
        </div>

        {(relatedLinks?.length || otherPageHref) && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Related</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold-300 hover:border-gold-400/40"
                >
                  {link.label}
                </Link>
              ))}
              {otherPageHref && otherPageLabelKey && (
                <Link
                  href={otherPageHref}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold-300 hover:border-gold-400/40"
                >
                  {t(otherPageLabelKey)}
                </Link>
              )}
              <Link
                href="/contact"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-gold-300 hover:border-gold-400/40"
              >
                {t("navContact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
