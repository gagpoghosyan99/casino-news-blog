"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
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
    { href: "/partners", label: "Partners" },
  ];

  const guideLinks = internalSeoLinks.slice(0, 6);

  const legalLinks = [
    { href: "/privacy", label: t("navPrivacy") },
    { href: "/terms", label: "Terms of Use" },
    { href: "/editorial-policy", label: "Editorial Policy" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/cookies", label: t("navCookies") },
    { href: "/responsible-gambling", label: t("footerResponsible") },
    { href: "/about", label: t("navAbout") },
  ];

  return (
    <footer className="border-t border-gold-500/20 bg-[#04060d]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-8">
          <div className="lg:col-span-2">
            <BrandLogo size="lg" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs text-slate-400 transition-colors hover:border-gold-400/40 hover:text-gold-300"
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
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-gold-300">
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
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Guides</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {internalSeoLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-gold-300"
                >
                  {link.footerLabel}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Payments</h3>
            <ul className="mt-4 space-y-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-gold-300">
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
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-500 to-[#f4c542] px-5 py-5 shadow-[0_0_40px_rgba(244,197,66,0.25)]">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-950 font-numeric text-lg font-black text-amber-300">
                18+
              </span>
              <p className="font-sans text-base font-medium text-navy-950 sm:text-lg">
                18+ only. Gamble responsibly. Set limits and seek help if needed.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-amber-300 hover:text-amber-200"
              >
                BeGambleAware.org
              </a>
              <Link
                href="/responsible-gambling"
                className="rounded-full border-2 border-navy-950 bg-white/90 px-4 py-2 text-xs font-bold text-navy-950"
              >
                Safety Guide
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <span>© {year} ZEONEBET. {t("footerRights")}</span>
          <p className="text-center text-xs text-slate-500 sm:text-sm">
            Developed By{" "}
            <a
              href="https://dewebam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-400 transition-colors hover:text-gold-300 hover:underline"
            >
              DEWEBAM.COM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
