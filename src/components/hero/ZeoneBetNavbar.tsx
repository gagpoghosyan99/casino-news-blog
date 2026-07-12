"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/casinos", label: "Casinos" },
  { href: "/news", label: "News" },
  { href: "/#bonuses", label: "Bonuses" },
  { href: "/crypto/bitcoin-casino", label: "Crypto" },
  { href: "/#jackpots", label: "Jackpots" },
];

export default function ZeoneBetNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (href.startsWith("/#")) return false;
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-[#d4af37] text-[10px] font-bold text-black">
          ZB
        </div>
        <span className="text-lg font-bold tracking-wide">
          <span className="text-cyan-400">ZEONE</span>
          <span className="text-[#d4af37]">BET</span>
        </span>
      </Link>

      {/* Center pill nav — desktop */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-2 backdrop-blur-md md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/15 hover:text-white ${
              isActive(item.href, item.exact)
                ? "bg-white/15 text-[#f4c542]"
                : "text-white/75"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right — desktop */}
      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/75 backdrop-blur-md">
          <LanguageSwitcher />
          <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </div>
        <Link href="/contact" className="text-sm font-medium text-white/75 transition-colors hover:text-white">
          Login
        </Link>
        <Link
          href="/casinos"
          className="hero-cta-gold rounded-full px-5 py-2 text-sm font-bold text-black"
        >
          Register Now
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 backdrop-blur-md md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-white" />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-white/15 bg-black/90 p-4 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive(item.href, item.exact) ? "text-[#f4c542]" : "text-white/75"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-center text-sm text-white/75">
              Login
            </Link>
            <Link
              href="/casinos"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-[#d4af37] py-2 text-center text-sm font-semibold text-black"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
