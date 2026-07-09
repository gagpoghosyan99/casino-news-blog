"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/casinos", label: "Casinos" },
  { href: "/news", label: "News" },
  { href: "/#bonuses", label: "Bonuses" },
  { href: "/crypto/bitcoin-casino", label: "Crypto" },
  { href: "/#jackpots", label: "Jackpots" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string, exact?: boolean) => {
    if (href.startsWith("/#")) return false;
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-navy-950/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-gold-500 font-display text-xs font-bold text-navy-950 shadow-glow-gold">
            ZB
          </div>
          <span className="font-display text-lg font-bold tracking-wide">
            <span className="text-cyan-400">ZEONE</span>
            <span className="text-gold-400">BET</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                isActive(item.href, item.exact) ? "text-gold-400" : "text-slate-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link href="/contact" className="hidden text-sm font-medium text-slate-400 hover:text-white sm:inline">
            Login
          </Link>
          <Link href="/casinos" className="zb-btn-gold hidden px-4 py-2 text-xs sm:inline-flex">
            Register Now
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-950/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 text-sm font-medium ${
                isActive(item.href, item.exact) ? "text-gold-400" : "text-slate-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="zb-btn-ghost text-center">
              Login
            </Link>
            <Link href="/casinos" onClick={() => setMobileOpen(false)} className="zb-btn-gold text-center">
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
