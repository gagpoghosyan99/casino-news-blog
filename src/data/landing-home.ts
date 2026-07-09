import { top40Casinos } from "./casinos";

export const GLOBAL_JACKPOT_TOTAL = 15_493_821;

export const trustIndicators = [
  { icon: "shield", title: "Verified Casino Operators", desc: "Editorial checks on licensing claims and payout patterns." },
  { icon: "license", title: "Licensed Platforms", desc: "We flag operators with unclear or disputed credentials." },
  { icon: "trophy", title: "Real Winner Reports", desc: "Jackpot feed highlights verified-style win narratives." },
  { icon: "star", title: "Expert Reviews", desc: "Structured methodology across 40+ ranked casinos." },
  { icon: "lock", title: "Secure Payments", desc: "UPI, crypto, and wallet guides for South Asia." },
  { icon: "heart", title: "Responsible Gambling", desc: "18+ resources, limits, and self-exclusion links." },
] as const;

export const rankedCasinos = top40Casinos.slice(0, 10).map((casino, i) => ({
  rank: casino.rank,
  name: casino.name,
  slug: casino.slug,
  blogSlug: casino.blogSlug,
  trustScore: Math.min(9.9, Number((casino.rating + 0.5 - i * 0.05).toFixed(1))),
  userScore: Math.min(9.8, Number((casino.rating + 0.3 - i * 0.04).toFixed(1))),
  bonusScore: Math.min(9.7, Number((4.5 - i * 0.08 + (casino.rank % 3) * 0.1).toFixed(1))),
  payments: i % 3 === 0 ? ["BTC", "ETH", "UPI"] : i % 3 === 1 ? ["USDT", "Visa", "Skrill"] : ["BTC", "USDT", "NetBanking"],
  mobile: true,
  premium: i < 3,
}));

export const cryptoGuideCards = [
  { title: "Best Crypto Casinos", desc: "Bitcoin, Ethereum, and USDT deposit guides for fast play.", href: "/crypto/bitcoin-casino" },
  { title: "Fast Withdrawals", desc: "Compare on-chain payout speeds and KYC checkpoints.", href: "/crypto/usdt-trc20-casino" },
  { title: "Secure Wallet Payments", desc: "Network selection and wallet safety for South Asia.", href: "/crypto/usdt-casino" },
  { title: "Low Fee Deposits", desc: "TRC-20 and Lightning options to reduce transfer costs.", href: "/crypto/tron-casino" },
] as const;

export const cryptoAssets = [
  { symbol: "BTC", name: "Bitcoin", href: "/crypto/bitcoin-casino" },
  { symbol: "ETH", name: "Ethereum", href: "/crypto/ethereum-casino" },
  { symbol: "USDT", name: "Tether", href: "/crypto/usdt-casino" },
  { symbol: "SOL", name: "Solana", href: "/crypto/solana-casino" },
] as const;

export const footerSocial = [
  { label: "X", href: "https://x.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Telegram", href: "https://telegram.org" },
] as const;

export const countryFlags: Record<string, string> = {
  BD: "🇧🇩",
  IN: "🇮🇳",
  PK: "🇵🇰",
  LK: "🇱🇰",
  CA: "🇨🇦",
  US: "🇺🇸",
  GB: "🇬🇧",
  GLOBAL: "🌐",
};
