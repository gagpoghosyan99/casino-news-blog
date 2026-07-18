"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { localeNames, locales, type Locale } from "@/lib/i18n";

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
        className={`group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 text-sm font-medium text-white/80 backdrop-blur-md transition-all hover:border-gold-400/40 hover:bg-white/15 hover:text-white ${
          open ? "border-gold-400/40 bg-white/15 text-white" : ""
        } ${isCompact ? "px-2.5 py-1.5" : "px-3 py-2"}`}
      >
        <Globe2 className="h-3.5 w-3.5 text-gold-400" />
        <span className="tracking-wide">{localeShort[locale]}</span>
        {!isCompact && (
          <span className="hidden text-white/40 sm:inline">·</span>
        )}
        {!isCompact && (
          <span className="hidden max-w-[72px] truncate text-white/65 sm:inline">
            {localeNames[locale]}
          </span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${open ? "rotate-180 text-gold-300" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 z-[120] mt-2 min-w-[168px] overflow-hidden rounded-2xl border border-white/15 bg-[#060912]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
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
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "bg-gradient-to-r from-gold-500/20 to-gold-500/5 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold tracking-wider ${
                    active
                      ? "bg-gold-500 text-navy-950"
                      : "bg-white/10 text-gold-300/80"
                  }`}
                >
                  {localeShort[loc]}
                </span>
                <span className="flex-1 font-medium">{localeNames[loc]}</span>
                {active && <Check className="h-3.5 w-3.5 text-gold-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
