"use client";

import Link from "next/link";
import { internalSeoLinks } from "@/data/programmatic/internal-seo-links";
import { footerSocial } from "@/data/landing-home";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";

export default function Footer() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);
  const year = new Date().getFullYear();

  const casinoLinks = [
    { href: "/casinos", label: "Top 40 Rankings" },
    { href: "/compare", label: "Compare Casinos" },
    { href: "/blogs", label: "Reviews" },
    { href: "/blacklist", label: "Blacklist" },
  ];

  const newsLinks = [
    { href: "/news", label: "Latest News" },
    { href: "/reports/south-asia-casino-payments-2026", label: "Payment Report" },
    { href: "/how-we-review", label: "Review Methodology" },
  ];

  const guideLinks = internalSeoLinks.slice(0, 6);

  const legalLinks = [
    { href: "/privacy", label: t("navPrivacy") },
    { href: "/terms", label: "Terms of Use" },
    { href: "/editorial-policy", label: "Editorial Policy" },
    { href: "/cookies", label: t("navCookies") },
    { href: "/responsible-gambling", label: t("footerResponsible") },
    { href: "/about", label: t("navAbout") },
  ];

  return (
    <footer className="border-t border-gold-500/20 bg-[#04060d]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-gold-500 text-xs font-bold text-navy-950">
                ZB
              </div>
              <span className="font-display text-xl font-bold text-white">ZEONEBET</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              {t("footerDesc")}
            </p>
            <div className="mt-6 flex gap-3">
              {footerSocial.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                  aria-label={s.label}
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Casinos</h3>
            <ul className="mt-4 space-y-2">
              {casinoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-cyan-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">News</h3>
            <ul className="mt-4 space-y-2">
              {newsLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-cyan-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Guides</h3>
            <ul className="mt-4 space-y-2">
              {internalSeoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-cyan-300">
                    {link.footerLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Payments</h3>
            <ul className="mt-4 space-y-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-cyan-300">
                    {link.footerLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Legal &amp; Trust</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-cyan-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-600 sm:flex-row">
          <span>© {year} ZEONEBET. {t("footerRights")}</span>
          <p className="text-center text-xs text-slate-600">
            18+ only · Gamble responsibly · Affiliate disclosure applies
          </p>
        </div>
      </div>
    </footer>
  );
}
