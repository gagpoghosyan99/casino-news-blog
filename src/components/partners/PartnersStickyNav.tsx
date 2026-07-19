"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PartnersNavItem } from "@/types/partners";
import { PARTNERS_ROUTES } from "@/data/partners/content";

type PartnersStickyNavProps = {
  items: PartnersNavItem[];
  path: "company" | "customer";
};

export default function PartnersStickyNav({ items, path }: PartnersStickyNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const ids = items.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const isCompany = path === "company";

  return (
    <div className="sticky top-[88px] z-40 border-b border-gold-400/15 bg-gradient-to-b from-[#080b14]/95 to-[#05070f]/92 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:top-[132px] lg:top-[88px]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <Link
            href={PARTNERS_ROUTES.hub}
            className="text-[12px] font-semibold text-slate-400 transition hover:text-gold-300"
          >
            ← All Partners
          </Link>
          <span className="text-white/20">·</span>
          <Link
            href={PARTNERS_ROUTES.company}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
              isCompany
                ? "bg-gold-500 text-navy-950 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                : "border border-gold-400/40 bg-white/5 text-gold-200 hover:bg-white/10"
            }`}
          >
            Company Partners
          </Link>
          <Link
            href={PARTNERS_ROUTES.customer}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-bold transition ${
              !isCompany
                ? "bg-gold-500 text-navy-950 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                : "border border-gold-400/40 bg-white/5 text-gold-200 hover:bg-white/10"
            }`}
          >
            Customer Partners
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400/80 sm:block">
            Sections
          </p>
          <div className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden />
          <nav
            aria-label={isCompany ? "Company partner sections" : "Customer partner sections"}
            className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-gold-500/25 to-gold-400/10 text-gold-200 shadow-[inset_0_0_0_1px_rgba(212,175,55,0.45),0_0_24px_rgba(212,175,55,0.12)]"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
