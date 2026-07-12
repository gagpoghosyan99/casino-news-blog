"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { useTranslation } from "@/lib/useTranslation";
import PageShell from "@/components/ui/PageShell";
import PageHero from "@/components/ui/PageHero";

export default function ContactPage() {
  const { locale } = useLocale();
  const { t } = useTranslation(locale);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        kicker="Support"
        title={t("contactTitle")}
        description={t("contactSubtitle")}
        badges={["Editorial desk", "Corrections welcome"]}
        tone="gold"
        actions={
          <Link href="/about" className="zb-btn-cyan">
            About ZEONEBET
          </Link>
        }
      />

      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-black/50 to-gold-500/5 p-8 text-center shadow-[0_0_40px_rgba(52,211,153,0.12)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40">
              ✓
            </div>
            <p className="mt-4 font-medium text-white">{t("contactSuccess")}</p>
            <button type="button" onClick={() => setSubmitted(false)} className="zb-btn-ghost mt-6">
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/10 via-black/50 to-cyan-500/5 p-6 shadow-[0_0_40px_rgba(212,175,55,0.1)] backdrop-blur-xl sm:p-8"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                {t("contactName")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white placeholder:text-slate-600 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                {t("contactEmail")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white placeholder:text-slate-600 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                {t("contactMessage")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-white placeholder:text-slate-600 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <button type="submit" disabled={loading} className="zb-btn-gold zb-shine w-full">
              {loading ? "Sending..." : t("contactSend")}
            </button>
          </form>
        )}
      </div>
    </PageShell>
  );
}
