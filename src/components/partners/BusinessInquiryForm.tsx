"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import SectionReveal from "@/components/landing/SectionReveal";
import {
  budgetRangeOptions,
  commercialModelOptions,
  companyTypeOptions,
  opportunityCards,
  partnershipTypeOptions,
} from "@/data/partners/content";
import type { PartnerInquiryType } from "@/types/partners";

type Props = {
  presetType: PartnerInquiryType | "";
};

const empty = {
  fullName: "",
  workEmail: "",
  companyName: "",
  companyWebsite: "",
  companyType: "",
  jobTitle: "",
  country: "",
  targetMarkets: "",
  partnershipType: "",
  mainObjective: "",
  budgetRange: "",
  commercialModel: "",
  proposedLaunchDate: "",
  message: "",
  supportingUrl: "",
  contactPreference: "email",
  accurate: false,
  authority: false,
  privacy: false,
  noGuarantee: false,
};

export function OpportunitySubmission({
  onSelect,
}: {
  onSelect: (preset: PartnerInquiryType) => void;
}) {
  return (
    <section id="submit-opportunity" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Opportunities</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">What would you like to offer ZeoneBet?</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Businesses can approach us with their own proposal. Select a card to prefill the inquiry form.
        </p>
      </SectionReveal>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {opportunityCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.inquiryPreset)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-gold-400/35 hover:bg-gold-500/5"
          >
            <h3 className="font-display text-base font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.description}</p>
            <span className="mt-4 inline-block text-xs font-semibold text-gold-400">
              Submit Your Opportunity →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function BusinessInquiryForm({ presetType }: Props) {
  const [form, setForm] = useState({ ...empty, partnershipType: presetType || "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (presetType) {
      setForm((f) => ({ ...f, partnershipType: presetType }));
    }
  }, [presetType]);

  function update<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.accurate || !form.authority || !form.privacy || !form.noGuarantee) {
      setError("Please confirm all consent checkboxes before submitting.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/partners/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          honeypot: "", // spam-protection-ready field
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Submission failed. Please try again.");
        return;
      }
      setSuccess(true);
      setForm(empty);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const field =
    "mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-base text-white placeholder:text-slate-600 focus:border-gold-400/50 focus:outline-none focus:ring-2 focus:ring-gold-500/20";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionReveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Business inquiry</p>
        <h2 className="mt-2 zb-headline text-2xl md:text-3xl">Contact the partnerships desk</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Submitting a request does not guarantee acceptance or publication. Required fields are marked.
        </p>
      </SectionReveal>

      <div className="mt-8 overflow-hidden rounded-3xl border border-gold-400/25 bg-gradient-to-br from-gold-500/8 via-black/50 to-black/40 p-6 sm:p-8">
        {success ? (
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">Inquiry received</p>
            <p className="mt-3 text-sm text-slate-400">
              Thank you. Our partnerships team will review your submission and respond using your preferred
              contact method when appropriate.
            </p>
            <button type="button" className="zb-btn-ghost mt-6" onClick={() => setSuccess(false)}>
              Submit another inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            {/* Honeypot */}
            <div className="hidden" aria-hidden>
              <label htmlFor="partner-website-hp">Website</label>
              <input id="partner-website-hp" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {error && (
              <div role="alert" className="rounded-xl border border-danger-500/40 bg-danger-500/10 px-4 py-3 text-sm text-danger-300">
                {error}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">
                  Full name *
                </label>
                <input id="fullName" required className={field} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <label htmlFor="workEmail" className="block text-sm font-medium text-slate-300">
                  Work email *
                </label>
                <input id="workEmail" type="email" required className={field} value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-300">
                  Company name *
                </label>
                <input id="companyName" required className={field} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
              </div>
              <div>
                <label htmlFor="companyWebsite" className="block text-sm font-medium text-slate-300">
                  Company website *
                </label>
                <input id="companyWebsite" type="url" required placeholder="https://" className={field} value={form.companyWebsite} onChange={(e) => update("companyWebsite", e.target.value)} />
              </div>
              <div>
                <label htmlFor="companyType" className="block text-sm font-medium text-slate-300">
                  Company type *
                </label>
                <select id="companyType" required className={field} value={form.companyType} onChange={(e) => update("companyType", e.target.value)}>
                  <option value="">Select…</option>
                  {companyTypeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-slate-300">
                  Job title
                </label>
                <input id="jobTitle" className={field} value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-300">
                  Country *
                </label>
                <input id="country" required className={field} value={form.country} onChange={(e) => update("country", e.target.value)} />
              </div>
              <div>
                <label htmlFor="targetMarkets" className="block text-sm font-medium text-slate-300">
                  Target markets *
                </label>
                <input id="targetMarkets" required className={field} placeholder="e.g. India, Bangladesh, Global" value={form.targetMarkets} onChange={(e) => update("targetMarkets", e.target.value)} />
              </div>
              <div>
                <label htmlFor="partnershipType" className="block text-sm font-medium text-slate-300">
                  Partnership type *
                </label>
                <select id="partnershipType" required className={field} value={form.partnershipType} onChange={(e) => update("partnershipType", e.target.value)}>
                  <option value="">Select…</option>
                  {partnershipTypeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mainObjective" className="block text-sm font-medium text-slate-300">
                  Main objective *
                </label>
                <input id="mainObjective" required className={field} placeholder="Traffic, awareness, launch…" value={form.mainObjective} onChange={(e) => update("mainObjective", e.target.value)} />
              </div>
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-300">
                  Estimated budget range
                </label>
                <select id="budgetRange" className={field} value={form.budgetRange} onChange={(e) => update("budgetRange", e.target.value)}>
                  <option value="">Select…</option>
                  {budgetRangeOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="commercialModel" className="block text-sm font-medium text-slate-300">
                  Preferred commercial model
                </label>
                <select id="commercialModel" className={field} value={form.commercialModel} onChange={(e) => update("commercialModel", e.target.value)}>
                  <option value="">Select…</option>
                  {commercialModelOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="proposedLaunchDate" className="block text-sm font-medium text-slate-300">
                  Proposed launch date
                </label>
                <input id="proposedLaunchDate" type="date" className={field} value={form.proposedLaunchDate} onChange={(e) => update("proposedLaunchDate", e.target.value)} />
              </div>
              <div>
                <label htmlFor="supportingUrl" className="block text-sm font-medium text-slate-300">
                  Supporting URL
                </label>
                <input id="supportingUrl" type="url" className={field} placeholder="https://" value={form.supportingUrl} onChange={(e) => update("supportingUrl", e.target.value)} />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                Message *
              </label>
              <textarea id="message" required rows={5} className={field} value={form.message} onChange={(e) => update("message", e.target.value)} />
            </div>

            <div>
              <label htmlFor="filePlaceholder" className="block text-sm font-medium text-slate-300">
                File upload
              </label>
              <input
                id="filePlaceholder"
                type="file"
                disabled
                className={`${field} opacity-60`}
                title="File uploads will be enabled with storage integration"
              />
              <p className="mt-1 text-xs text-slate-500">
                File upload placeholder — share media kit links in Supporting URL for now.
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-slate-300">Contact preference</legend>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-300">
                {["email", "call", "both"].map((opt) => (
                  <label key={opt} className="inline-flex items-center gap-2 capitalize">
                    <input
                      type="radio"
                      name="contactPreference"
                      checked={form.contactPreference === opt}
                      onChange={() => update("contactPreference", opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2 text-sm text-slate-300">
              {(
                [
                  ["accurate", "I confirm that the submitted information is accurate."],
                  ["authority", "I have authority to contact ZeoneBet on behalf of this company."],
                  ["privacy", "I agree to the Privacy Policy."],
                  ["noGuarantee", "I understand that submitting a request does not guarantee acceptance or publication."],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={form[key]}
                    onChange={(e) => update(key, e.target.checked)}
                    required
                  />
                  <span>
                    {label}{" "}
                    {key === "privacy" && (
                      <Link href="/privacy" className="text-gold-400 hover:text-gold-300">
                        Read policy
                      </Link>
                    )}
                  </span>
                </label>
              ))}
            </div>

            <button type="submit" disabled={loading} className="zb-btn-gold zb-shine w-full sm:w-auto">
              {loading ? "Sending…" : "Submit partnership inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
