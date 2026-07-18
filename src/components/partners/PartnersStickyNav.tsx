"use client";

import { useEffect, useState } from "react";
import { partnersNav } from "@/data/partners/content";

export default function PartnersStickyNav() {
  const [active, setActive] = useState(partnersNav[0]?.id ?? "overview");

  useEffect(() => {
    const ids = partnersNav.map((n) => n.id);
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
  }, []);

  return (
    <div className="sticky top-[64px] z-40 border-b border-gold-400/15 bg-gradient-to-b from-[#080b14]/95 to-[#05070f]/92 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <p className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400/80 sm:block">
            Sections
          </p>
          <div className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden />
          <nav
            aria-label="Partners sections"
            className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {partnersNav.map((item) => {
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
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[1px] h-px bg-gradient-to-r from-transparent via-gold-300/80 to-transparent sm:hidden" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
