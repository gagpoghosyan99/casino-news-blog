"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/components/auth/AuthProvider";

export const SITE_NAV_ITEMS = [
  { href: "/", label: "Home", exact: true },
  { href: "/casinos", label: "Casinos" },
  { href: "/news", label: "News" },
  { href: "/bonuses", label: "Bonuses" },
  { href: "/crypto", label: "Crypto" },
  { href: "/jackpots", label: "Jackpots" },
  { href: "/partners", label: "Partners" },
] as const;

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
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

  async function onLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  const navLinkClass = (href: string, exact?: boolean) => {
    const active = isActive(href, exact);
    return [
      "rounded-full px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors",
      "text-white hover:bg-white hover:text-navy-950",
      active ? "bg-gold-500/25 text-gold-300 ring-1 ring-gold-400/40 hover:bg-white hover:text-navy-950 hover:ring-0" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const authLinks = loading ? null : user ? (
    <>
      <Link
        href="/account"
        className="text-[15px] font-medium text-gold-300 transition-colors hover:text-gold-200"
      >
        {user.name.split(" ")[0]}
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="text-[15px] font-medium text-white/80 transition-colors hover:text-white"
      >
        Login
      </Link>
      <Link href="/register" className="zb-btn-gold !px-5 !py-2.5 text-sm">
        Register Now
      </Link>
    </>
  );

  const authLinksMobile = loading ? null : user ? (
    <>
      <Link href="/account" className="text-center text-sm text-gold-300">
        Account ({user.name.split(" ")[0]})
      </Link>
      <button type="button" onClick={onLogout} className="text-center text-sm text-white/75">
        Logout
      </button>
    </>
  ) : (
    <>
      <Link href="/login" className="text-center text-sm text-white/75">
        Login
      </Link>
      <Link href="/register" className="zb-btn-gold text-center text-sm">
        Register Now
      </Link>
    </>
  );

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-navy-950/92 shadow-lg shadow-black/30 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:min-h-[88px] sm:px-6 lg:px-8">
        <BrandLogo size="lg" />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-2 backdrop-blur-md lg:flex">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(item.href, "exact" in item ? item.exact : false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          {authLinks}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Tablet pages row — Partners lives with the other pages */}
      <div className="hidden border-t border-white/10 bg-navy-950/80 md:block lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(item.href, "exact" in item ? item.exact : false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {SITE_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors hover:bg-white hover:text-navy-950 ${
                isActive(item.href, "exact" in item ? item.exact : false)
                  ? "text-gold-300"
                  : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            <div className="flex justify-center pb-1">
              <LanguageSwitcher variant="compact" />
            </div>
            {authLinksMobile}
          </div>
        </div>
      )}
    </nav>
  );
}
