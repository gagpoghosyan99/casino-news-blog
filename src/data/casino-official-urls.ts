/**
 * Official casino destinations used when REFERRAL_* env vars are empty.
 * When you receive affiliate/referral links, set REFERRAL_{ENVKEY} in .env —
 * those always win over these fallbacks.
 */
export const casinoOfficialUrls: Record<string, string> = {
  stake: "https://stake.com",
  bet365: "https://www.bet365.com",
  roobet: "https://roobet.com",
  "bc-game": "https://bc.game",
  rollbit: "https://rollbit.com",
  leovegas: "https://www.leovegas.com",
  betway: "https://www.betway.com",
  "pokerstars-casino": "https://www.pokerstars.com",
  "888-casino": "https://www.888casino.com",
  "draftkings-casino": "https://www.draftkings.com",
  "fanduel-casino": "https://www.fanduel.com",
  cloudbet: "https://www.cloudbet.com",
  bitcasino: "https://www.bitcasino.io",
  bovada: "https://www.bovada.lv",
  "1xbet": "https://1xbet.com",
  parimatch: "https://parimatch.com",
  "22bet": "https://22bet.com",
  "wild-casino": "https://www.wildcasino.ag",
  mostbet: "https://mostbet.com",
  "pin-up-casino": "https://pin-up.casino",
  melbet: "https://melbet.com",
  betwinner: "https://betwinner.com",
  vave: "https://vave.com",
  thunderpick: "https://thunderpick.com",
  fairspin: "https://fairspin.io",
  megapari: "https://megapari.com",
  "7bit-casino": "https://7bitcasino.com",
  "casino-extreme": "https://www.casinoextreme.eu",
  jackbit: "https://jackbit.com",
  duelbits: "https://duelbits.com",
  "sportsbet-io": "https://sportsbet.io",
  "ignition-casino": "https://www.ignition.casino",
  mystake: "https://mystake.com",
  betus: "https://www.betus.com.pa",
  "tg-casino": "https://tg.casino",
  shuffle: "https://shuffle.com",
  fortunejack: "https://fortunejack.com",
  gamdom: "https://gamdom.com",
  rabona: "https://rabona.com",
  nitrobetting: "https://nitrobetting.eu",
};

export function getOfficialCasinoUrl(slug: string): string | null {
  return casinoOfficialUrls[slug] ?? null;
}
