import type {
  AffiliateOfferCard,
  AudienceCard,
  BusinessBenefit,
  DashboardPreviewTile,
  FaqItem,
  MediaKitCard,
  OpportunityCard,
  PartnersNavItem,
  PartnershipModel,
  PartnerTypeCard,
  PlayerBenefitCard,
  ProcessStep,
  TrustStripItem,
} from "@/types/partners";

/** Future page routes — currently map to /partners anchors. */
export const PARTNERS_ROUTES = {
  hub: "/partners",
  business: "/partners/business",
  affiliate: "/partners/affiliate",
  advertise: "/partners/advertise",
  listCasino: "/partners/list-your-casino",
  content: "/partners/content-partnerships",
  playerBenefits: "/partners/player-benefits",
  referral: "/partners/referral-program",
  contact: "/partners/contact",
  disclosure: "/affiliate-disclosure",
  responsibleGambling: "/responsible-gambling",
} as const;

export const partnersNav: PartnersNavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "choose-path", label: "Choose Path" },
  { id: "for-businesses", label: "For Businesses" },
  { id: "partnership-models", label: "Partnership Models" },
  { id: "advertising", label: "Advertising" },
  { id: "submit-opportunity", label: "Submit an Opportunity" },
  { id: "for-players", label: "For Players" },
  { id: "referral-benefits", label: "Referral Benefits" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const partnersHero = {
  eyebrow: "ZEONEBET PARTNERS",
  title: "Where iGaming brands, publishers and players grow together.",
  description:
    "Start by choosing your path: company partners get business offers, customer partners get player benefits and referral options.",
  primaryCta: { label: "Company Partners", href: "#for-businesses" },
  secondaryCta: { label: "Customer Partners", href: "#for-players" },
  tertiaryCta: { label: "Submit an Opportunity", href: "#submit-opportunity" },
};

export const trustStrip: TrustStripItem[] = [
  {
    id: "editorial",
    label: "Editorial-first platform",
    description: "Commercial relationships do not purchase ratings.",
  },
  {
    id: "flexible",
    label: "Flexible partnership models",
    description: "Affiliate, advertising, sponsored content, and custom deals.",
  },
  {
    id: "international",
    label: "International audience",
    description: "Editorial coverage and guides for multiple markets.",
  },
  {
    id: "tracking",
    label: "Transparent tracking",
    description: "Campaign parameters and tracked links where agreed.",
  },
  {
    id: "rg",
    label: "Responsible promotion",
    description: "Age gating, disclosures, and safer-gambling messaging.",
  },
];

export const audienceCards: AudienceCard[] = [
  {
    id: "business",
    badge: "Company Partners",
    sectionLabel: "For Businesses",
    who: "Casinos, operators, agencies, media & brands",
    title: "Grow your brand with ZeoneBet",
    description:
      "Choose this if you represent a company. Explore affiliate deals, advertising, listings, sponsored content and custom business partnerships.",
    benefits: [
      "Brand visibility",
      "Qualified traffic",
      "Editorial opportunities",
      "Product exposure",
      "Market expansion",
      "Performance tracking",
    ],
    ctaLabel: "See company offers",
    href: "#for-businesses",
  },
  {
    id: "players",
    badge: "Customer Partners",
    sectionLabel: "For Players",
    who: "Players looking for offers, referrals & benefits",
    title: "Get more value from your casino journey",
    description:
      "Choose this if you play or gamble. Explore reviewed casinos, tracked offers, referral benefits and clearer promotion details.",
    benefits: [
      "Curated casino options",
      "Exclusive or tracked offers",
      "Clear bonus information",
      "Referral opportunities",
      "Educational guides",
      "Safer decision-making resources",
    ],
    ctaLabel: "See player options",
    href: "#for-players",
  },
];

export const partnerTypeCards: PartnerTypeCard[] = [
  {
    id: "operators",
    title: "Casino and sportsbook operators",
    services: [
      "Casino review consideration",
      "Brand profile creation",
      "Bonus and promotion listings",
      "Comparison-table placement",
      "New-market launch coverage",
      "Editorial interviews",
      "Product announcements",
      "Performance campaigns",
    ],
    ctaLabel: "List Your Casino",
    href: "#contact",
  },
  {
    id: "studios",
    title: "Game studios and software providers",
    services: [
      "Game launch coverage",
      "Studio profile",
      "Product reviews",
      "Technology features",
      "Developer interviews",
      "Sponsored editorial campaigns",
      "Demo or showcase integrations",
    ],
    ctaLabel: "Showcase Your Product",
    href: "#contact",
  },
  {
    id: "payments",
    title: "Payment and technology companies",
    services: [
      "Payment-method guides",
      "Product explainers",
      "Industry interviews",
      "B2B thought leadership",
      "Technology comparisons",
      "Sponsored reports",
    ],
    ctaLabel: "Present Your Solution",
    href: "#contact",
  },
  {
    id: "agencies",
    title: "Agencies and affiliate networks",
    services: [
      "Campaign collaboration",
      "Custom traffic partnerships",
      "Multi-brand agreements",
      "Sponsored placements",
      "Content production",
      "Performance reporting",
    ],
    ctaLabel: "Discuss a Campaign",
    href: "#contact",
  },
  {
    id: "creators",
    title: "Experts, creators and media partners",
    services: [
      "Guest articles",
      "Expert commentary",
      "Interviews",
      "Research collaboration",
      "Podcast appearances",
      "Co-branded content",
      "Event coverage",
    ],
    ctaLabel: "Propose a Collaboration",
    href: "#contact",
  },
];

export const businessBenefits: BusinessBenefit[] = [
  {
    id: "visibility",
    title: "Targeted visibility",
    description:
      "Present brands to users actively researching casinos, games, offers, payments, and industry developments.",
  },
  {
    id: "storytelling",
    title: "Editorial storytelling",
    description:
      "Turn product updates, company milestones, and expertise into clear, engaging content.",
  },
  {
    id: "performance",
    title: "Performance opportunities",
    description:
      "Use tracked links, campaign parameters, referral codes, and measurable conversion actions where appropriate.",
  },
  {
    id: "commercial",
    title: "Flexible commercial models",
    description:
      "Support different commercial arrangements based on the partner, market, traffic source, and campaign objective.",
  },
  {
    id: "expansion",
    title: "International expansion",
    description:
      "Prepare content and landing experiences for different languages, countries, and audience segments.",
  },
  {
    id: "reporting",
    title: "Transparent reporting",
    description:
      "Provide campaign reporting based on available impressions, clicks, registrations, deposits, or agreed KPIs.",
  },
  {
    id: "evergreen",
    title: "Long-term presence",
    description:
      "Create evergreen profiles, reviews, guides, comparisons, and updates instead of relying only on temporary ads.",
  },
  {
    id: "brand-safe",
    title: "Brand-safe presentation",
    description:
      "Place partners within a professional editorial environment with clear disclosures and responsible promotion.",
  },
];

export const partnershipModels: PartnershipModel[] = [
  {
    id: "affiliate",
    title: "Affiliate partnership",
    summary:
      "ZeoneBet may receive compensation when users follow tracked links and complete qualifying actions.",
    details: [
      "Revenue Share",
      "CPA",
      "Hybrid",
      "Fixed placement",
      "Listing fee",
      "Custom performance agreement",
    ],
    note: "Commercial terms are agreed per partner and market. No commission rates are published on this page.",
  },
  {
    id: "sponsored-content",
    title: "Sponsored content",
    summary: "Labeled campaigns that communicate brand stories through editorial formats.",
    details: [
      "Sponsored articles",
      "Interviews",
      "Brand stories",
      "Product announcements",
      "Research reports",
      "Market guides",
      "Video content",
      "Social media distribution",
    ],
    note: "Sponsored content is visibly labeled.",
  },
  {
    id: "advertising",
    title: "Advertising",
    summary: "Placement-based visibility across high-intent ZeoneBet surfaces.",
    details: [
      "Homepage banners",
      "Category sponsorships",
      "Featured casino placements",
      "Newsletter placements",
      "Review-page placements",
      "Comparison-table visibility",
      "Native advertising",
      "Social campaigns",
    ],
  },
  {
    id: "casino-listing",
    title: "Casino listing and review",
    summary: "Submit an operator for editorial consideration — not a paid rating.",
    details: [
      "Submission does not guarantee approval",
      "Does not guarantee a positive review",
      "Does not guarantee a particular rating",
      "Does not guarantee a top ranking",
      "Does not guarantee permanent placement",
    ],
    note: "Listings are subject to editorial, licensing, safety, market, and quality checks.",
  },
  {
    id: "content-media",
    title: "Content and media partnership",
    summary: "Collaborate on distribution, commentary, events, and research.",
    details: [
      "News exchanges",
      "Guest commentary",
      "Event partnerships",
      "Podcast appearances",
      "Data collaborations",
      "Research projects",
      "Co-branded campaigns",
    ],
  },
  {
    id: "custom",
    title: "Custom strategic partnership",
    summary:
      "For complex agreements spanning markets, brands, content formats, or multi-quarter campaign goals.",
    details: ["Multi-market packages", "Multi-brand agreements", "Integrated creative", "Shared roadmaps"],
  },
];

export const partnershipProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Submit your company",
    description: "Provide basic company, brand, licensing, market, and contact information.",
  },
  {
    step: 2,
    title: "Select your objective",
    description:
      "Traffic, awareness, registrations, product launch, market entry, SEO visibility, thought leadership, or content distribution.",
  },
  {
    step: 3,
    title: "Compliance and quality review",
    description:
      "ZeoneBet evaluates the company, product, target markets, offer conditions, licensing information, and promotional suitability.",
  },
  {
    step: 4,
    title: "Partnership proposal",
    description:
      "Define deliverables, placement, commercial model, tracking method, timeline, target markets, and reporting metrics.",
  },
  {
    step: 5,
    title: "Campaign launch",
    description:
      "Publish approved content, listings, tracking links, creatives, or promotional placements.",
  },
  {
    step: 6,
    title: "Reporting and optimization",
    description: "Review available campaign data and optimize the partnership where appropriate.",
  },
];

export const opportunityCards: OpportunityCard[] = [
  {
    id: "casino-partnership",
    title: "Casino or sportsbook partnership",
    description: "Operator listing, review consideration, or performance campaigns.",
    inquiryPreset: "Casino listing",
  },
  {
    id: "advertising",
    title: "Advertising campaign",
    description: "Banners, sponsorships, and native placements.",
    inquiryPreset: "Advertising",
  },
  {
    id: "sponsored",
    title: "Sponsored article",
    description: "Labeled editorial storytelling and distribution.",
    inquiryPreset: "Sponsored content",
  },
  {
    id: "guest",
    title: "Guest contribution",
    description: "Expert commentary, interviews, or co-authored guides.",
    inquiryPreset: "Media partnership",
  },
  {
    id: "launch",
    title: "Game or product launch",
    description: "Studio or product launch coverage packages.",
    inquiryPreset: "Product review",
  },
  {
    id: "affiliate",
    title: "Affiliate agreement",
    description: "Tracked links and performance-based partnerships.",
    inquiryPreset: "Affiliate partnership",
  },
  {
    id: "exclusive",
    title: "Exclusive player offer",
    description: "Region-specific or time-limited tracked promotions.",
    inquiryPreset: "Exclusive offer",
  },
  {
    id: "event",
    title: "Event or conference partnership",
    description: "Coverage, sponsorship, or speaking collaboration.",
    inquiryPreset: "Event partnership",
  },
  {
    id: "tech",
    title: "Technology integration",
    description: "Payment, compliance, or tooling collaborations.",
    inquiryPreset: "Custom proposal",
  },
  {
    id: "investment",
    title: "Investment or strategic proposal",
    description: "Longer-term strategic conversations.",
    inquiryPreset: "Custom proposal",
  },
  {
    id: "other",
    title: "Other opportunity",
    description: "Tell us what you would like to explore.",
    inquiryPreset: "Custom proposal",
  },
];

export const playerJourney: ProcessStep[] = [
  {
    step: 1,
    title: "Explore",
    description: "Browse news, guides, casino profiles, reviews, comparisons, and available promotions.",
  },
  {
    step: 2,
    title: "Compare",
    description:
      "Review licensing, availability, bonus terms, wagering, payments, verification, support, and responsible-gambling tools.",
  },
  {
    step: 3,
    title: "Choose an offer",
    description: "Select an available offer suitable for your location and eligibility.",
  },
  {
    step: 4,
    title: "Follow the tracked link",
    description:
      "Visit the external casino through ZeoneBet’s tracked link or enter an applicable referral code.",
  },
  {
    step: 5,
    title: "Complete the casino’s requirements",
    description: "Register and complete any qualifying requirements directly with the casino operator.",
  },
];

export const playerBenefitCards: PlayerBenefitCard[] = [
  {
    id: "welcome",
    title: "Welcome bonus",
    description: "May be available where operators run welcome campaigns for eligible new customers.",
  },
  {
    id: "deposit",
    title: "Deposit match",
    description: "Where available, subject to eligibility, country, and wagering terms.",
  },
  {
    id: "spins",
    title: "Free spins",
    description: "Promotional spins may apply to selected games only. Terms apply.",
  },
  {
    id: "cashback",
    title: "Cashback",
    description: "Ongoing or limited cashback missions where the operator offers them.",
  },
  {
    id: "reload",
    title: "Reload offer",
    description: "Returning-player promotions where supported by the operator.",
  },
  {
    id: "referral",
    title: "Referral reward",
    description: "Some programs may reward qualified referrals under separate terms.",
  },
  {
    id: "compare",
    title: "Easier offer comparison",
    description: "Editorial summaries help you compare conditions before you click through.",
  },
  {
    id: "education",
    title: "Educational guidance",
    description: "Guides on wagering, payments, KYC, and responsible play.",
  },
];

/**
 * Example offer cards derived carefully from editorial bonus review status.
 * Values that are unverified remain descriptive — not invented headline amounts.
 */
export const affiliateOfferCards: AffiliateOfferCard[] = [
  {
    id: "offer-stake",
    operatorName: "Stake",
    title: "Crypto welcome desk + ongoing rakeback",
    description:
      "Open Stake’s live offers desk via ZeoneBet’s tracked path. Exact headline values vary by region and product.",
    bonusType: "Welcome & rakeback",
    bonusValue: "Live on operator offers page",
    wageringRequirement: "Promotion-specific",
    eligibleCountries: ["Varies by region"],
    restrictedCountries: [],
    customerType: "both",
    ageRequirement: "18+",
    lastVerifiedAt: "2026-07-06",
    sponsored: false,
    affiliateRelationship: true,
    termsUrl: "https://stake.com/policies/terms",
    destinationUrl: "/go/stake",
    status: "needs_review",
  },
  {
    id: "offer-bcgame",
    operatorName: "BC.Game",
    title: "Layered welcome bonuses + cashback missions",
    description:
      "Welcome package and cashback tasks where eligible. Confirm rules after login on the operator site.",
    bonusType: "Welcome + cashback",
    bonusValue: "Offer-specific",
    wageringRequirement: "Task & deposit rules vary",
    eligibleCountries: ["Varies by region"],
    restrictedCountries: [],
    customerType: "both",
    ageRequirement: "18+",
    lastVerifiedAt: "2026-07-06",
    sponsored: false,
    affiliateRelationship: true,
    termsUrl: "/bonuses",
    destinationUrl: "/go/bc-game",
    status: "needs_review",
  },
];

export const mediaKitCards: MediaKitCard[] = [
  {
    id: "audience",
    title: "Audience overview",
    description: "Editorial readers researching casinos, crypto, payments, and promotions.",
  },
  {
    id: "markets",
    title: "Available markets",
    description: "Campaigns can be scoped by region and language where inventory allows.",
  },
  {
    id: "formats",
    title: "Content formats",
    description: "Reviews, guides, interviews, sponsored stories, and native placements.",
  },
  {
    id: "placements",
    title: "Advertising placements",
    description: "Homepage, category, review, comparison, and newsletter opportunities.",
  },
  {
    id: "timeline",
    title: "Campaign timeline",
    description: "From inquiry and compliance review through launch and reporting.",
  },
  {
    id: "reporting",
    title: "Reporting options",
    description: "Agree KPIs and reporting cadence based on available tracking.",
  },
  {
    id: "brand",
    title: "Brand guidelines",
    description: "Share logos and creative standards for approved brand-safe presentation.",
  },
];

export const dashboardPreviewTiles: DashboardPreviewTile[] = [
  { id: "clicks", label: "Clicks", demoValue: "Example metric" },
  { id: "regs", label: "Registrations", demoValue: "Example metric" },
  { id: "cvr", label: "Conversion rate", demoValue: "Example metric" },
  { id: "campaigns", label: "Active campaigns", demoValue: "Demo campaign" },
  { id: "content", label: "Published content", demoValue: "Demo item" },
  { id: "links", label: "Tracked links", demoValue: "Demo link" },
  { id: "markets", label: "Markets", demoValue: "Sample market" },
  { id: "devices", label: "Devices", demoValue: "Sample mix" },
  { id: "creatives", label: "Creative assets", demoValue: "Demo asset" },
  { id: "invoices", label: "Invoices", demoValue: "Coming soon" },
  { id: "messages", label: "Messages", demoValue: "Coming soon" },
  { id: "compliance", label: "Compliance documents", demoValue: "Coming soon" },
];

export const businessFaq: FaqItem[] = [
  {
    question: "Who can partner with ZeoneBet?",
    answer:
      "Casino and sportsbook operators, game studios, software and payment providers, affiliate networks, agencies, creators, media partners, event organizers, and other industry companies with a clear commercial or editorial fit.",
  },
  {
    question: "Can we list a new casino?",
    answer:
      "Yes — you can request listing consideration. Submission does not guarantee publication, a positive review, a specific rating, or ranking placement.",
  },
  {
    question: "Do you accept sponsored content?",
    answer:
      "Yes. Sponsored articles, interviews, brand stories, and related formats are available and must be visibly labeled as sponsored.",
  },
  {
    question: "Can we purchase a positive review?",
    answer:
      "No. Commercial partnerships may influence visibility or placement opportunities, but they do not buy editorial conclusions or ratings.",
  },
  {
    question: "Which partnership models are available?",
    answer:
      "Affiliate, advertising, sponsored content, casino listing consideration, content/media collaboration, and custom strategic partnerships.",
  },
  {
    question: "Can we run a country-specific campaign?",
    answer:
      "Often yes, subject to inventory, compliance review, and local promotional suitability. Share your target markets in the inquiry form.",
  },
  {
    question: "How do you track campaign performance?",
    answer:
      "Through agreed tracked links, campaign parameters, referral codes, and reporting on available impressions, clicks, registrations, deposits, or other KPIs.",
  },
  {
    question: "Can we provide an exclusive player offer?",
    answer:
      "Yes, where legally and commercially appropriate. Offer terms, eligibility, and last-verified details should be supplied clearly.",
  },
  {
    question: "How long does partnership review take?",
    answer:
      "Timing depends on completeness of information, compliance checks, and campaign complexity. Typical first responses follow internal review of your submission.",
  },
  {
    question: "What information must operators provide?",
    answer:
      "Company details, website, markets, licensing information where available, offer terms, tracking requirements, and a clear campaign objective.",
  },
];

export const playerFaq: FaqItem[] = [
  {
    question: "Is ZeoneBet an online casino?",
    answer:
      "No. ZeoneBet is an independent casino media, reviews, and comparison platform. We do not operate casino games or hold player balances.",
  },
  {
    question: "Does ZeoneBet hold player funds?",
    answer:
      "No. Deposits, withdrawals, accounts, and customer support are handled by the third-party casino operator you join.",
  },
  {
    question: "How do referral links work?",
    answer:
      "Some links are tracked. When you follow them and complete qualifying actions with an operator, ZeoneBet may receive compensation. You do not pay more because of the tracking.",
  },
  {
    question: "Do I pay more when using an affiliate link?",
    answer:
      "Using an affiliate or tracked link should not increase your cost. Always compare the operator’s official terms before depositing.",
  },
  {
    question: "Are bonuses guaranteed?",
    answer:
      "No. Offers depend on country, eligibility, account history, and operator rules. Terms can change. Never assume a bonus will be credited.",
  },
  {
    question: "Why are offers different by country?",
    answer:
      "Operators restrict products and promotions by market, regulation, and product availability. Always check eligibility after landing on the operator site.",
  },
  {
    question: "Who manages my casino account?",
    answer:
      "The casino operator manages registration, KYC, bonuses, games, payments, and support.",
  },
  {
    question: "What should I check before accepting a bonus?",
    answer:
      "Wagering, max bet, eligible games, expiry, country rules, KYC requirements, and withdrawal conditions.",
  },
  {
    question: "How do I report incorrect offer information?",
    answer:
      "Contact our editorial desk via the Contact page with the offer URL, screenshot if possible, and the date you checked the operator terms.",
  },
  {
    question: "Where can I get responsible-gambling support?",
    answer:
      "Visit our Responsible Gambling page and organizations such as BeGambleAware. 18+ only. Set limits and stop if gambling stops being entertainment.",
  },
];

export const companyTypeOptions = [
  "Casino operator",
  "Sportsbook",
  "Game studio",
  "Software provider",
  "Payment provider",
  "Affiliate network",
  "Marketing agency",
  "Media company",
  "Content creator",
  "Investor",
  "Event organizer",
  "Other",
] as const;

export const partnershipTypeOptions = [
  "Affiliate partnership",
  "Advertising",
  "Sponsored content",
  "Casino listing",
  "Product review",
  "Exclusive offer",
  "Media partnership",
  "Event partnership",
  "Media Kit",
  "Custom proposal",
] as const;

export const budgetRangeOptions = [
  "Not decided",
  "Under $5k",
  "$5k–$15k",
  "$15k–$50k",
  "$50k+",
  "Performance-only discussion",
] as const;

export const commercialModelOptions = [
  "Not sure yet",
  "Revenue Share",
  "CPA",
  "Hybrid",
  "Fixed placement",
  "Listing fee",
  "Sponsored content package",
  "Custom",
] as const;
