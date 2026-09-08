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

export type BrandOverride = Partial<BrandConfig>;

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
  | "Clock" | "DollarSign" | "ShieldCheck" | "Languages" | "BadgeCheck"
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
  /** Display price, e.g. "₡17.900.000" or "Consultar" when price is on request. */
  price: string;
  /** Optional approximate USD price, e.g. "$33,800". */
  priceUsd?: string;
  /** Optional display mileage, e.g. "82,000 km". */
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

export type TemplateEnrichment = {
  phone?: string;
  phoneHref?: string;
  phoneAlt?: string;
  phoneAltHref?: string;
  address?: string;
  email?: string;
  availability?: { en: string; es: string };
  assistant?: TemplateAssistant;
  media: TemplateMedia;
  offers?: { en: OfferItem[]; es: OfferItem[] };
  galleryCaptions?: { en: string[]; es: string[] };
  videoGallery?: TemplateVideoGallery;
  transformation?: TemplateTransformation;
  clientTrust?: TemplateClientTrust;
  projectSelector?: TemplateProjectSelector;
  inventory?: TemplateInventory;
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
  /** Custom full-page renderer. "leonardo" = cinematic dark-canvas editorial site (leonardo-site.tsx) instead of the shared BusinessSite. */
  siteVariant?: "leonardo" | "oryzo" | "rym" | "fenix";
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
};
