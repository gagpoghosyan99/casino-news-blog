"use client";

import Link from "next/link";
import { PARTNERS_ROUTES } from "@/data/partners/content";

/** Simple back link — no sticky bar covering page content. */
export default function PartnersBackLink({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-2 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <Link
        href={PARTNERS_ROUTES.hub}
        className="inline-flex text-sm font-semibold text-slate-400 transition hover:text-gold-300"
      >
        ← All Partners
      </Link>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-gold-400">{label}</p>
    </div>
  );
}
