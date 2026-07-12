/**
 * Editorial ranking display meta — payments and score splits used on the
 * homepage Top 10 table (and reusable for the full Top 40 directory).
 * Scores are /5, aligned with pillar review ratings where available.
 */

export type CasinoRankingMeta = {
  trustScore: number;
  userScore: number;
  bonusScore: number;
  payments: string[];
  mobile: boolean;
  premium?: boolean;
};

/** Per-slug overrides keyed by casino slug from `top40Casinos`. */
export const casinoRankingMetaBySlug: Record<string, CasinoRankingMeta> = {
  stake: {
    trustScore: 4.4,
    userScore: 4.5,
    bonusScore: 4.2,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
    premium: true,
  },
  bet365: {
    trustScore: 4.7,
    userScore: 4.6,
    bonusScore: 4.4,
    payments: ["Visa", "Mastercard", "NetBanking"],
    mobile: true,
    premium: true,
  },
  roobet: {
    trustScore: 4.5,
    userScore: 4.6,
    bonusScore: 4.3,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
    premium: true,
  },
  "bc-game": {
    trustScore: 4.4,
    userScore: 4.5,
    bonusScore: 4.6,
    payments: ["BTC", "ETH", "USDT", "SOL"],
    mobile: true,
  },
  rollbit: {
    trustScore: 4.3,
    userScore: 4.4,
    bonusScore: 4.5,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  leovegas: {
    trustScore: 4.7,
    userScore: 4.6,
    bonusScore: 4.5,
    payments: ["Visa", "Skrill", "Trustly"],
    mobile: true,
  },
  betway: {
    trustScore: 4.5,
    userScore: 4.4,
    bonusScore: 4.3,
    payments: ["Visa", "Skrill", "Neteller"],
    mobile: true,
  },
  "pokerstars-casino": {
    trustScore: 4.6,
    userScore: 4.5,
    bonusScore: 4.2,
    payments: ["Visa", "Neteller", "Skrill"],
    mobile: true,
  },
  "888-casino": {
    trustScore: 4.5,
    userScore: 4.4,
    bonusScore: 4.4,
    payments: ["Visa", "Mastercard", "PayPal"],
    mobile: true,
  },
  "draftkings-casino": {
    trustScore: 4.3,
    userScore: 4.2,
    bonusScore: 4.1,
    payments: ["Visa", "Mastercard", "PayPal"],
    mobile: true,
  },
  "fanduel-casino": {
    trustScore: 4.2,
    userScore: 4.3,
    bonusScore: 4.0,
    payments: ["Visa", "Mastercard", "PayPal"],
    mobile: true,
  },
  cloudbet: {
    trustScore: 4.5,
    userScore: 4.4,
    bonusScore: 4.3,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  bitcasino: {
    trustScore: 4.3,
    userScore: 4.2,
    bonusScore: 4.1,
    payments: ["BTC", "ETH", "LTC"],
    mobile: true,
  },
  bovada: {
    trustScore: 3.6,
    userScore: 3.5,
    bonusScore: 3.8,
    payments: ["BTC", "Visa", "Cashier"],
    mobile: true,
  },
  "1xbet": {
    trustScore: 2.8,
    userScore: 3.0,
    bonusScore: 3.4,
    payments: ["UPI", "BTC", "Skrill"],
    mobile: true,
  },
  parimatch: {
    trustScore: 2.6,
    userScore: 2.8,
    bonusScore: 3.2,
    payments: ["UPI", "Visa", "USDT"],
    mobile: true,
  },
  "22bet": {
    trustScore: 2.5,
    userScore: 2.7,
    bonusScore: 3.1,
    payments: ["Visa", "Skrill", "BTC"],
    mobile: true,
  },
  "wild-casino": {
    trustScore: 2.9,
    userScore: 3.0,
    bonusScore: 3.3,
    payments: ["BTC", "Visa", "Mastercard"],
    mobile: true,
  },
  mostbet: {
    trustScore: 2.9,
    userScore: 3.1,
    bonusScore: 3.4,
    payments: ["UPI", "BTC", "Visa"],
    mobile: true,
  },
  "pin-up-casino": {
    trustScore: 3.9,
    userScore: 3.8,
    bonusScore: 4.0,
    payments: ["Visa", "USDT", "Skrill"],
    mobile: true,
  },
  melbet: {
    trustScore: 3.1,
    userScore: 3.0,
    bonusScore: 3.3,
    payments: ["UPI", "Visa", "BTC"],
    mobile: true,
  },
  betwinner: {
    trustScore: 2.9,
    userScore: 3.0,
    bonusScore: 3.2,
    payments: ["Visa", "Skrill", "BTC"],
    mobile: true,
  },
  vave: {
    trustScore: 2.6,
    userScore: 2.7,
    bonusScore: 3.0,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  thunderpick: {
    trustScore: 4.2,
    userScore: 4.3,
    bonusScore: 4.1,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  fairspin: {
    trustScore: 3.8,
    userScore: 3.7,
    bonusScore: 4.0,
    payments: ["BTC", "USDT", "Visa"],
    mobile: true,
  },
  megapari: {
    trustScore: 3.0,
    userScore: 3.1,
    bonusScore: 3.4,
    payments: ["Visa", "BTC", "Skrill"],
    mobile: true,
  },
  "7bit-casino": {
    trustScore: 3.7,
    userScore: 3.6,
    bonusScore: 3.9,
    payments: ["BTC", "ETH", "LTC"],
    mobile: true,
  },
  "casino-extreme": {
    trustScore: 3.2,
    userScore: 3.1,
    bonusScore: 3.5,
    payments: ["Visa", "BTC", "Wire"],
    mobile: true,
  },
  jackbit: {
    trustScore: 3.9,
    userScore: 4.0,
    bonusScore: 4.1,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  duelbits: {
    trustScore: 4.2,
    userScore: 4.3,
    bonusScore: 4.2,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  "sportsbet-io": {
    trustScore: 4.3,
    userScore: 4.4,
    bonusScore: 4.2,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  "ignition-casino": {
    trustScore: 4.1,
    userScore: 4.0,
    bonusScore: 3.9,
    payments: ["BTC", "Visa", "Cashier"],
    mobile: true,
  },
  mystake: {
    trustScore: 3.5,
    userScore: 3.6,
    bonusScore: 3.8,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  betus: {
    trustScore: 4.0,
    userScore: 3.9,
    bonusScore: 3.8,
    payments: ["Visa", "BTC", "Wire"],
    mobile: true,
  },
  "tg-casino": {
    trustScore: 4.0,
    userScore: 4.1,
    bonusScore: 4.2,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  shuffle: {
    trustScore: 4.1,
    userScore: 4.2,
    bonusScore: 4.3,
    payments: ["BTC", "ETH", "SOL"],
    mobile: true,
  },
  fortunejack: {
    trustScore: 4.4,
    userScore: 4.3,
    bonusScore: 4.2,
    payments: ["BTC", "LTC", "USDT"],
    mobile: true,
  },
  gamdom: {
    trustScore: 4.1,
    userScore: 4.2,
    bonusScore: 4.0,
    payments: ["BTC", "ETH", "USDT"],
    mobile: true,
  },
  rabona: {
    trustScore: 3.4,
    userScore: 3.3,
    bonusScore: 3.6,
    payments: ["Visa", "Skrill", "BTC"],
    mobile: true,
  },
  nitrobetting: {
    trustScore: 3.3,
    userScore: 3.2,
    bonusScore: 3.5,
    payments: ["Visa", "BTC", "Skrill"],
    mobile: true,
  },
};

export function getCasinoRankingMeta(
  slug: string,
  fallbackRating: number,
  rankIndex: number
): CasinoRankingMeta {
  const known = casinoRankingMetaBySlug[slug];
  if (known) return known;

  return {
    trustScore: Math.min(4.9, Number((fallbackRating + 0.1).toFixed(1))),
    userScore: Math.min(4.8, Number(fallbackRating.toFixed(1))),
    bonusScore: Math.min(4.7, Number((fallbackRating - 0.1 + (rankIndex % 3) * 0.05).toFixed(1))),
    payments: ["BTC", "Visa", "Skrill"],
    mobile: true,
  };
}
