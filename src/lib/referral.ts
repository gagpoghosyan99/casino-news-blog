import { Casino } from "@/types";
import { getOfficialCasinoUrl } from "@/data/casino-official-urls";

/**
 * Reads referral / affiliate URL from environment variables.
 * Add keys in .env like: REFERRAL_STAKE=https://stake.com/?c=YOUR_CODE
 * The envKey on each casino maps to REFERRAL_{ENVKEY}.
 *
 * Priority:
 * 1. REFERRAL_* (or NEXT_PUBLIC_REFERRAL_*) — your tracked affiliate link
 * 2. Official casino homepage — so Register still opens the right brand
 * 3. /contact — only if neither exists
 */
export function getReferralUrl(casino: Casino): string | null {
  const key = `REFERRAL_${casino.envKey}`;
  const value = process.env[key] || process.env[`NEXT_PUBLIC_${key}`] || null;
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function hasAffiliateReferral(casino: Casino): boolean {
  return Boolean(getReferralUrl(casino));
}

export function buildReferralRedirectUrl(casino: Casino): string {
  const referral = getReferralUrl(casino);
  if (referral) return referral;

  const official = getOfficialCasinoUrl(casino.slug);
  if (official) return official;

  return "/contact";
}
