"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { locales, type Locale } from "@/lib/i18n";

const localeShort: Record<Locale, string> = {
  en: "EN",
  hi: "HI",
};

interface LanguageSwitcherProps {
  variant?: "nav" | "compact";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "nav",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selectLocale = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  const isCompact = variant === "compact";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-gold-400/40 hover:bg-white hover:text-navy-950 ${
          open ? "border-gold-400/40 bg-white text-navy-950" : ""
        } ${isCompact ? "px-3 py-2 text-sm" : "px-3.5 py-2.5 text-[15px]"}`}
      >
        <span>{localeShort[locale]}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : "opacity-70"}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 z-[120] mt-2 min-w-[104px] overflow-hidden rounded-xl border border-white/15 bg-[#060912]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          {locales.map((loc) => {
            const active = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => selectLocale(loc)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  active
                    ? "bg-gold-500/20 text-gold-200"
                    : "text-white/80 hover:bg-white hover:text-navy-950"
                }`}
              >
                <span>{localeShort[loc]}</span>
                {active && <Check className="h-3.5 w-3.5 text-gold-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
