export type PartnershipModelId =
  | "affiliate"
  | "sponsored-content"
  | "advertising"
  | "casino-listing"
  | "content-media"
  | "custom";

export type CommercialStructure =
  | "revshare"
  | "cpa"
  | "hybrid"
  | "fixed-placement"
  | "listing-fee"
  | "custom";

export type PartnerCompanyType =
  | "Casino operator"
  | "Sportsbook"
  | "Game studio"
  | "Software provider"
  | "Payment provider"
  | "Affiliate network"
  | "Marketing agency"
  | "Media company"
  | "Content creator"
  | "Investor"
  | "Event organizer"
  | "Other";

export type PartnerInquiryType =
  | "Affiliate partnership"
  | "Advertising"
  | "Sponsored content"
  | "Casino listing"
  | "Product review"
  | "Exclusive offer"
  | "Media partnership"
  | "Event partnership"
  | "Media Kit"
  | "Custom proposal";

export interface PartnersNavItem {
  id: string;
  label: string;
}

export interface TrustStripItem {
  id: string;
  label: string;
  description: string;
}

export interface AudienceCard {
  id: "business" | "players";
  /** Primary path label shown first (e.g. Company Partners). */
  badge: string;
  /** Existing section naming kept for continuity (e.g. For Businesses). */
  sectionLabel: string;
  who: string;
  title: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  href: string;
}

export interface PartnerTypeCard {
  id: string;
  title: string;
  services: string[];
  ctaLabel: string;
  href: string;
}

export interface BusinessBenefit {
  id: string;
  title: string;
  description: string;
}

export interface PartnershipModel {
  id: PartnershipModelId;
  title: string;
  summary: string;
  details: string[];
  note?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface OpportunityCard {
  id: string;
  title: string;
  description: string;
  inquiryPreset: PartnerInquiryType;
}

export interface PlayerBenefitCard {
  id: string;
  title: string;
  description: string;
}

export interface AffiliateOfferCard {
  id: string;
  operatorName: string;
  operatorLogo?: string;
  title: string;
  description: string;
  bonusType?: string;
  bonusValue?: string;
  minimumDeposit?: string;
  wageringRequirement?: string;
  promoCode?: string;
  eligibleCountries: string[];
  restrictedCountries: string[];
  customerType: "new" | "existing" | "both";
  ageRequirement: string;
  expiresAt?: string;
  lastVerifiedAt: string;
  sponsored: boolean;
  affiliateRelationship: boolean;
  termsUrl: string;
  destinationUrl: string;
  status: "active" | "expired" | "paused" | "needs_review";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MediaKitCard {
  id: string;
  title: string;
  description: string;
}

export interface DashboardPreviewTile {
  id: string;
  label: string;
  demoValue: string;
}
