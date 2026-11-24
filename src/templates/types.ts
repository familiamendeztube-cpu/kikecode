import type { LucideIcon } from "lucide-react";

export type Lang = "en" | "es";

export type BrandPalette = {
  primary: string;
  primaryDark: string;
  accent: string;
  heroFrom: string;
  heroVia: string;
  heroTo: string;
  heroGlow1: string;
  heroGlow2: string;
  heroIconFrom: string;
  heroIconTo: string;
  contactFrom: string;
  contactTo: string;
};

export type BrandSocials = {
  tiktok?: string;
  facebook?: string;
  instagram?: string;
};

export type BrandConfig = {
  name: string;
  city: string;
  phone: string;
  phoneHref: string;
  /** Optional secondary phone (some businesses publish two numbers). */
  phoneAlt?: string;
  phoneAltHref?: string;
  /** Digits WhatsApp buttons open. PLW sets it to the typed number when the
   *  site's phone becomes the client's PLW number, so chats still reach the
   *  business itself. */
  whatsapp?: string;
  email: string;
  address: string;
  heroIcon: LucideIcon;
  palette: BrandPalette;
  /** Optional social profile URLs, rendered in the footer when present. */
  socials?: BrandSocials;
  /** Optional brand logo image URL. When present it replaces the lucide
   *  heroIcon in the header and footer (object-contain, never distorted). */
  logo?: string;
};

export type LocalizedNav = {
  services: string; why: string; process: string;
  testimonials: string; faq: string; contact: string; call: string;
};

export type LocalizedHero = {
  eyebrow: string; title1: string; title2: string; subtitle: string;
  cta1: string; cta2: string; badges: string[];
  ratingTitle: string; ratingSubtitle: string;
  trustTitle: string; trustSubtitle: string;
};

export type LocalizedSection<Item> = {
  title: string;
  blurb?: string;
  items: Item[];
};

export type ServiceItem = { title: string; blurb: string };
export type WhyItem = { title: string; blurb: string };
export type ProcessStep = { title: string; blurb: string };
export type TestimonialItem = { name: string; role: string; quote: string };
export type FaqItem = { q: string; a: string };

export type LocalizedContact = {
  title: string; blurb: string; name: string; phone: string;
  service: string; message: string; submit: string; success: string;
  pick: string; services: string[];
};

export type LocalizedFooter = {
  tagline: string; hours: string; rights: string; hoursLabel: string;
};

export type LocalizedContent = {
  nav: LocalizedNav;
  hero: LocalizedHero;
  services: LocalizedSection<ServiceItem>;
  why: LocalizedSection<WhyItem>;
  process: LocalizedSection<ProcessStep>;
  testimonials: LocalizedSection<TestimonialItem>;
  faq: LocalizedSection<FaqItem>;
  contact: LocalizedContact;
  footer: LocalizedFooter;
};

export type TemplateMedia = {
  hero: string;
  /** Optional muted, looping background video for the hero. */
  heroVideo?: string;
  /** Poster frame for the hero video (falls back to `hero`). */
  heroPoster?: string;
  /** Where the hero photo's subject sits, as CSS object-position ("70% 50%"), so a phone's narrow crop keeps it. */
  heroFocus?: string;
  gallery: string[];
  teamPortrait: string;
  /** Optional cinematic brand-film loop shown full-bleed under the hero. */
  video?: string;
};

export type HeritageImage = {
  src: string;
  en: string;
  es: string;
};

/** A single milestone in a heritage history timeline. */
export type HeritageMilestone = {
  /** Short badge label (e.g. a year). Localized so non-numeric labels
   *  like "Today" / "Hoy" read correctly in both languages. */
  year: { en: string; es: string };
  title: { en: string; es: string };
  text: { en: string; es: string };
};

/** Optional cultural/heritage gallery (country + history) for templates that
 *  want to celebrate their roots. Rendered only when present. */
export type TemplateHeritage = {
  title: { en: string; es: string };
  blurb: { en: string; es: string };
  images: HeritageImage[];
  /** Optional short history timeline shown as a nice presentation. */
  history?: {
    title: { en: string; es: string };
    milestones: HeritageMilestone[];
  };
};

export type TemplateAssistant = {
  name: string;
  /** Greeting text. Use the `{business}` placeholder to interpolate the
   *  current brand name at render time so it stays in sync with edits. */
  en: string;
  es: string;
  roleEn: string;
  roleEs: string;
};

export type OfferIconKey =
  | "Clock" | "DollarSign" | "Banknote" | "ShieldCheck" | "Languages" | "BadgeCheck"
  | "Truck" | "Wrench" | "Star" | "Leaf" | "Sparkles" | "Heart";

export type OfferItem = { icon: OfferIconKey; title: string; blurb: string };

/** A simple bilingual string used across the optional premium sections. */
export type LocalizedText = { en: string; es: string };

/** A single video card in the optional video gallery. */
export type VideoGalleryItem = {
  src: string;
  poster?: string;
  title: LocalizedText;
  caption: LocalizedText;
};
export type TemplateVideoGallery = {
  title: LocalizedText;
  blurb: LocalizedText;
  items: VideoGalleryItem[];
  /** Optional override for the small eyebrow above the title (defaults to generic "Real work, on video"). */
  eyebrow?: LocalizedText;
  /** Optional override for each video card's CTA label (defaults to "Get a Similar Project"). */
  ctaLabel?: LocalizedText;
};

/** One step of an optional before / during / after transformation story. */
export type TransformationStep = {
  src: string;
  phase: LocalizedText;
  label: LocalizedText;
  caption: LocalizedText;
};
export type TemplateTransformation = {
  title: LocalizedText;
  blurb: LocalizedText;
  steps: TransformationStep[];
};

export type CaptionedImage = { src: string; caption: LocalizedText };
/** Optional "real people / trusted by local clients" proof section. */
export type TemplateClientTrust = {
  title: LocalizedText;
  blurb: LocalizedText;
  images: CaptionedImage[];
};

/** Optional interactive "what project do you need?" selector. */
export type TemplateProjectSelector = {
  title: LocalizedText;
  blurb: LocalizedText;
  options: LocalizedText[];
  recommendation: LocalizedText;
};

/** A single vehicle in the optional dealership inventory. Model names
 *  (e.g. "Toyota RAV4") are universal, but every descriptive field the
 *  customer reads is bilingual. `images` is [exterior, interior, ...] so
 *  the detail view can let shoppers "look inside". */
export type InventoryVehicle = {
  id: string;
  /** Make + model, e.g. "Toyota RAV4 XLE". */
  name: string;
  /** Optional model year — omit when unknown (e.g. classics). */
  year?: number;
  bodyStyle: "SUV" | "Pickup" | "Sedan";
  /** Display price, e.g. "₡17 900 000" (es-CR: no-break spaces) or "Consultar" when price is on request. */
  price: string;
  /** Optional approximate USD price, e.g. "$33,800". */
  priceUsd?: string;
  /** Optional display mileage, e.g. "82 000 km". */
  mileage?: string;
  transmission?: LocalizedText;
  fuel?: LocalizedText;
  drivetrain?: LocalizedText;
  images: string[];
  highlights: { en: string[]; es: string[] };
  /** Optional status badge (defaults to "Available"/"Disponible"). */
  status?: LocalizedText;
  featured?: boolean;
};

export type TemplateInventory = {
  title: LocalizedText;
  blurb: LocalizedText;
  vehicles: InventoryVehicle[];
};

/** Stats, service areas, certifications and guarantee on the business site.
 *  Templates without them get generic, honest defaults. */
export type TemplateFacts = {
  stats: { value: string; valueEs?: string; labelEn: string; labelEs: string }[];
  /** Omit for a real business: it gets its city plus generic areas, never an invented suburb list. */
  areasEn?: string[]; areasEs?: string[];
  certsEn: string[]; certsEs: string[];
  guaranteeEn: { title: string; blurb: string };
  guaranteeEs: { title: string; blurb: string };
};

/** Broad industry group: picks the quote form's extra field and the industry band. */
export type TemplateCategory = "food" | "auto" | "moving" | "beauty" | "emergency" | "events" | "trades";

/**
 * What a PLW tour-demo draft supplies on top of the brand (overrides.tourismDemo).
 * services/highlight are required (may be empty); the rest are optional
 * additions PLW captures with the client. The renderer ignores fields that do
 * not match these shapes, and never shows anything else a draft may carry
 * (research notes, source URLs): those stay in PLW.
 */
export type TourismDemo = {
  services: string[];
  highlight: string;
  /** Confirmed description of the business, in the site's language(s). */
  description?: string;
  /** Confirmed facts, e.g. { label: "Established", value: "2019" }. PLW also
   *  sends this field under the name `facts`; both are accepted. */
  details?: { label: string; value: string }[];
  /** PLW's name for the confirmed-facts list (same shape as `details`). */
  facts?: { label: string; value: string }[];
  /** Confirmed questions and answers the assistant may quote. */
  faqs?: { question: string; answer: string }[];
  /** Trusted HTTPS hero image (Kike media or an approved source). */
  heroImage?: string;
  /**
   * Up to 4 approved images PLW selected for this draft: AI-generated
   * ("generated", labeled as such on the site) or the business's own
   * ("business"). Only the approved URLs render — never the candidate pool
   * or anything about how they were produced.
   */
  approvedImages?: { url: string; alt: string; kind: "generated" | "business" }[];
  /** Optional Secretaria IA presentation overrides; sanitized before display. */
  secretary?: { businessType?: string; businessName?: string };
};

export type BusinessTemplate = {
  slug: string;
  industry: string;
  industryEs: string;
  websiteType: string;
  defaultServicesField: string;
  brand: BrandConfig;
  serviceIcons: LucideIcon[];
  whyIcons: LucideIcon[];
  content: Record<Lang, LocalizedContent>;
  /** When set, the site renders only in this language and hides the EN/ES toggle. */
  lockedLang?: Lang;
  /** The language a site opens in when it is not locked. Clients are Costa Rican,
   *  so Spanish unless set; only the real US businesses open in English. */
  defaultLang?: Lang;
  /** Custom full-page renderer instead of the shared BusinessSite (see sites/site-renderer.tsx). */
  siteVariant?: "leonardo" | "oryzo" | "rym" | "fenix" | "tourism";
  /** PLW tour-demo data (services + highlight). Empty arrays/strings allowed. */
  tourismDemo?: TourismDemo;
  /** PLW samples (siteVariant "tourism"): what this business type asks visitors to do. */
  plwSite?: {
    /** Main call to action first; each opens WhatsApp with its message when the draft has a phone. */
    ctas: { label: string; message: string }[];
    /** What the chat says it can answer about ("el menú, las reservaciones o cómo contactarnos"). */
    chatTopics: string;
  };
  /** A real, named business: never show fabricated ratings, extra reviews or
   *  invented service-area lists for it. */
  realBusiness?: boolean;
  /** Staff checked with the business that the reviews and claims on this site
   *  (stats, guarantee, credentials, trust strip) are true. Until then a
   *  generic template's reviews and claims carry a visible "Sample" tag. Saved
   *  with the site, so it is part of every version. */
  contentConfirmed?: boolean;
  /** The site has the Secretaria IA section (shared business site only): the
   *  live demo on its preview link, an invitation to call once published.
   *  Turned on from the gallery's "Con Secretaria IA" or the editor; saved with the site. */
  secretaria?: boolean;
  /** Defaults to "trades". */
  category?: TemplateCategory;
  facts?: TemplateFacts;
  media?: TemplateMedia;
  assistant?: TemplateAssistant;
  availability?: { en: string; es: string };
  offers?: { en: OfferItem[]; es: OfferItem[] };
  galleryCaptions?: { en: string[]; es: string[] };
  /** Optional premium sections (rendered only when present). */
  videoGallery?: TemplateVideoGallery;
  transformation?: TemplateTransformation;
  clientTrust?: TemplateClientTrust;
  projectSelector?: TemplateProjectSelector;
  inventory?: TemplateInventory;
  /** Optional cultural/heritage gallery (country + history). */
  heritage?: TemplateHeritage;
  /** Set only on a published site loaded from PLW (never on a bare template or
   *  in the editor): its forms send leads to PLW under this id. */
  plwSiteId?: string;
};
