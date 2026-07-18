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
    <div className="sticky top-[64px] z-40 border-b border-white/10 bg-[#04060d]/90 backdrop-blur-xl">
      <nav
        aria-label="Partners sections"
        className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {partnersNav.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm ${
                isActive
                  ? "bg-gold-500/20 text-gold-300 ring-1 ring-gold-400/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
