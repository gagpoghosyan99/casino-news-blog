/** Shared internal links for entity/trust pages — editorial transparency and hub discovery. */
export const coreEntityLinks = [
  { href: "/about", label: "About CasinoPulse" },
  { href: "/how-we-review", label: "How We Review" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/editorial-team", label: "Editorial Team" },
  { href: "/author/casinopulse-editorial-team", label: "Author Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/responsible-gambling", label: "Responsible Gambling" },
  { href: "/blacklist", label: "Casino Blacklist" },
] as const;

export const hubDiscoveryLinks = [
  { href: "/india-casino-payments", label: "India Payments Hub" },
  { href: "/bangladesh-casino-payments", label: "Bangladesh Payments Hub" },
  { href: "/pakistan-casino-payments", label: "Pakistan Payments Hub" },
  { href: "/crypto/bitcoin-casino", label: "Bitcoin Guide" },
  { href: "/crypto/usdt-casino", label: "USDT Guide" },
  { href: "/compare", label: "Compare Casinos" },
  { href: "/blogs", label: "Casino Reviews" },
] as const;

export const fullEntityTrustLinks = [...coreEntityLinks, ...hubDiscoveryLinks];
