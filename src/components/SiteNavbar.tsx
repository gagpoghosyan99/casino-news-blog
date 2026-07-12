"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const SITE_NAV_ITEMS = [
  { href: "/", label: "Home", exact: true },
  { href: "/casinos", label: "Casinos" },
  { href: "/news", label: "News" },
  { href: "/bonuses", label: "Bonuses" },
  { href: "/crypto", label: "Crypto" },
  { href: "/jackpots", label: "Jackpots" },
] as const;

export default function SiteNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const solid = !isHome || scrolled || mobileOpen;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-navy-950/90 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-[#d4af37] text-[10px] font-bold text-black shadow-glow-gold">
            ZB
          </div>
          <span className="text-lg font-bold tracking-wide">
            <span className="text-cyan-400">ZEONE</span>
            <span className="text-[#d4af37]">BET</span>
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-md md:flex">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-white/15 hover:text-white ${
                isActive(item.href, "exact" in item ? item.exact : false)
                  ? "bg-white/15 text-[#f4c542]"
                  : "text-white/75"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link href="/contact" className="text-sm font-medium text-white/75 transition-colors hover:text-white">
            Login
          </Link>
          <Link href="/casinos" className="hero-cta-gold rounded-full px-5 py-2 text-sm font-bold text-black">
            Register Now
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive(item.href, "exact" in item ? item.exact : false)
                  ? "text-[#f4c542]"
                  : "text-white/75"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <div className="flex justify-center pb-1">
              <LanguageSwitcher variant="compact" />
            </div>
            <Link href="/contact" className="text-center text-sm text-white/75">
              Login
            </Link>
            <Link href="/casinos" className="hero-cta-gold rounded-full py-2 text-center text-sm font-bold text-black">
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
