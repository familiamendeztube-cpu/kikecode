import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence, useSpring } from "framer-motion";
import type { BusinessTemplate } from "@/templates/types";
import { leadOutcomeMessage, previewNotice, useLeadForm } from "@/sites/shared/lead-form";
import { SampleTag, isSampleContent } from "@/sites/business/ui";
import { TEMPLATE_ASSETS } from "@/lib/plw";
import { pick } from "@/lib/i18n";

type GalleryCategory = "all" | "branding" | "web" | "content";

type GalleryItem = {
  src: string;
  category: GalleryCategory;
  altEn: string;
};

const LABELS = {
  filters: {
    en: { all: "All", branding: "Branding", web: "Web", content: "Content" },
    es: { all: "Todo", branding: "Branding", web: "Web", content: "Contenido" },
  },
  gallery: {
    en: "Our Work",
    es: "Nuestro Trabajo",
  },
  showcase: {
    en: ["Limitless Branding", "Sites that come alive", "Content at any scale"],
    es: ["Branding sin límites", "Sitios que cobran vida", "Contenido a cualquier escala"]
  },
  stats: {
    en: { left: "120+ BRANDS LAUNCHED", right: "2 LANGUAGES EN+ES" },
    es: { left: "120+ MARCAS LANZADAS", right: "2 IDIOMAS EN+ES" },
  },
  makers: {
    en: ["BUILT", "FOR", "CREATORS"],
    es: ["HECHO", "PARA", "CREADORES"],
  },
  storiesBand: {
    en: ["REAL", "STORIES"],
    es: ["HISTORIAS", "REALES"],
  },
  galleryCards: {
    en: [
      { model: "LUMINA Diffusion", prompt: "Ethereal portrait with butterfly wings emerging from flowing hair" },
      { model: "Estudio v2", prompt: "Mecha samurai warrior in neon-lit cyberpunk streets" },
      { model: "LUMINA Diffusion", prompt: "Majestic dragon soaring through storm clouds" },
      { model: "Estudio v2", prompt: "Anime character with luminous eyes in moonlight" },
      { model: "LUMINA Diffusion", prompt: "Surreal desert landscape with floating clock fragments" },
      { model: "Estudio v2", prompt: "Astronaut drifting alongside bioluminescent jellyfish" },
      { model: "LUMINA Diffusion", prompt: "Royal fox in ornate Renaissance oil painting style" },
      { model: "Estudio v2", prompt: "Ice phoenix rising from frozen crystalline peaks" },
    ],
    es: [
      { model: "LUMINA Diffusion", prompt: "Retrato etéreo con alas de mariposa emergiendo del cabello" },
      { model: "Estudio v2", prompt: "Guerrero samurái mecha en calles cyberpunk de neón" },
      { model: "LUMINA Diffusion", prompt: "Dragón majestuoso volando entre nubes de tormenta" },
      { model: "Estudio v2", prompt: "Personaje anime con ojos luminosos bajo la luna" },
      { model: "LUMINA Diffusion", prompt: "Paisaje desértico surrealista con fragmentos de reloj flotantes" },
      { model: "Estudio v2", prompt: "Astronauta flotando junto a medusas bioluminiscentes" },
      { model: "LUMINA Diffusion", prompt: "Zorro real en estilo óleo renacentista ornamentado" },
      { model: "Estudio v2", prompt: "Fénix de hielo elevándose desde picos cristalinos congelados" },
    ],
  }
};

const DEFAULT_GALLERY: GalleryItem[] = [
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g1.jpg`, category: "content", altEn: "Ethereal portrait with butterfly wings" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g2.jpg`, category: "branding", altEn: "Mecha samurai warrior in cyberpunk streets" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g3.jpg`, category: "content", altEn: "Majestic dragon in storm clouds" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g4.jpg`, category: "content", altEn: "Anime character with luminous eyes" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g5.jpg`, category: "branding", altEn: "Surreal desert with floating clocks" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g6.jpg`, category: "content", altEn: "Astronaut with bioluminescent jellyfish" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g7.jpg`, category: "branding", altEn: "Royal fox Renaissance oil painting" },
  { src: `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_g8.jpg`, category: "content", altEn: "Ice phoenix over frozen peaks" },
];

const DEFAULT_SHOWCASE_IMAGES = [
  `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_show1.jpg`,
  `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_show2.jpg`,
  `${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_show3.jpg`
];

/**
 * Cinematic dark-canvas editorial renderer (Leonardo.ai-inspired).
 * Full implementation of the LUMINA studio site with sculptural 3D typography,
 * pill navigation, tight gallery grids, and Leonardo's visual system.
 */
export default function LeonardoSite({ template }: { template: BusinessTemplate }) {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  
  const content = template.content[lang];
  const prefersReducedMotion = useReducedMotion();
  
  // Hero Dolly Setup
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  
  // The dolly runs over the whole (short) scroll track, so no screen of it is dead.
  const roomScale = useTransform(heroProgress, [0, 1], [1, 4]);
  const roomZ = useTransform(heroProgress, [0, 1], [0, 800]);
  const roomOpacity = useTransform(heroProgress, [0, 0.875, 1], [1, 1, 0]);

  const centerOpacity = useTransform(heroProgress, [0, 0.85, 1], [1, 1, 0.4]);
  const centerScale = useTransform(heroProgress, [0, 1], [1, 0.85]);

  const ceilingY = useTransform(heroProgress, [0, 1], [0, -200]);
  const floorY = useTransform(heroProgress, [0, 1], [0, 200]);
  const leftX = useTransform(heroProgress, [0, 1], [0, -300]);
  const rightX = useTransform(heroProgress, [0, 1], [0, 300]);

  // Mouse Parallax
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });
  
  const roomRotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const roomRotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth) * 2 - 1);
    mouseY.set((e.clientY / innerHeight) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Build gallery from template.media.gallery or fall back to defaults
  const galleryItems: GalleryItem[] = template.media?.gallery && template.media.gallery.length > 0
    ? template.media.gallery.map((src, i) => ({
        src,
        category: DEFAULT_GALLERY[i % DEFAULT_GALLERY.length].category,
        altEn: `LUMINA portfolio work ${i + 1}`,
      }))
    : DEFAULT_GALLERY;

  const filteredGallery = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const lead = useLeadForm(template.plwSiteId, lang);
  const leadOutcome = leadOutcomeMessage(lead.state, lang, template.brand.phone);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const field = (key: string) => String(form.get(key) ?? "").trim();
    const result = await lead.submit({
      form: "quote",
      name: field("name"),
      phone: field("phone"),
      service: field("service"),
      message: field("message"),
    });
    if (result?.status === "sent") formEl.reset();
  };

  // Showcase backgrounds: the stock template ships its default gallery in
  // media.gallery, so only derive showcase images from the gallery when it's
  // a genuine custom override (different from the stock set). Otherwise use
  // the dedicated cinematic 16:9 showcase set.
  const len = galleryItems.length;
  const isStockGallery =
    len === DEFAULT_GALLERY.length &&
    galleryItems.every((item, i) => item.src === DEFAULT_GALLERY[i].src);
  const showcaseImages = len > 0 && !isStockGallery
    ? [
        galleryItems[0].src,
        galleryItems[Math.floor(len / 2)]?.src || galleryItems[0].src,
        galleryItems[len - 1]?.src || galleryItems[0].src,
      ]
    : DEFAULT_SHOWCASE_IMAGES;

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] overflow-x-clip" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#e5e5e5]/10">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="text-[16px] font-bold tracking-tight" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            {template.brand.name}
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: content.nav.services, href: "#services" },
              { label: content.nav.why, href: "#studio" },
              { label: content.nav.process, href: "#process" },
              { label: content.nav.testimonials, href: "#clients" },
              { label: content.nav.faq, href: "#faq" },
              { label: content.nav.contact, href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] text-[#999999] hover:text-[#ffffff] transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="h-11 px-5 rounded-full border border-[#e5e5e5] text-[14px] text-[#ffffff] hover:border-[#ffffff] transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {lang === "en" ? "ES" : "EN"}
            </motion.button>
            <motion.a
              href="#contact"
              className="h-11 px-7 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[14px] font-medium inline-flex items-center"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {content.nav.contact}
            </motion.a>
          </div>
        </div>
      </nav>

      {/* 1. Hero — Sculptural 3D Dolly */}
      <section 
        ref={heroRef} 
        className={`relative bg-[#000000] ${prefersReducedMotion ? "h-screen" : "h-[180vh]"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center">
          {/* Optional subtle hero backdrop */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src={`${TEMPLATE_ASSETS}/lumina-studio/lumina_v2_hero.jpg`} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* 3D Perspective Room made of giant violet words */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none" 
            style={{ 
              perspective: "1200px",
              opacity: prefersReducedMotion ? 1 : roomOpacity
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                scale: prefersReducedMotion ? 1 : roomScale,
                z: prefersReducedMotion ? 0 : roomZ,
                rotateX: prefersReducedMotion ? 0 : roomRotateX,
                rotateY: prefersReducedMotion ? 0 : roomRotateY,
              }}
            >
              {/* Ceiling word */}
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : ceilingY }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[#6e60ee] pointer-events-none select-none"
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(80px, 12vw, 165px)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.02em",
                    transform: "rotateX(65deg) scale(1.4)",
                  }}
                >
                  LUMINA
                </div>
              </motion.div>

              {/* Left wall word */}
              <motion.div
                style={{ x: prefersReducedMotion ? 0 : leftX }}
                className="hidden md:block absolute left-[-15%] top-1/2 -translate-y-1/2 text-[#6e60ee] pointer-events-none select-none"
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(70px, 10vw, 140px)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.02em",
                    transform: "rotateY(55deg) rotateZ(-90deg) scale(1.6)",
                  }}
                >
                  CREATIVE
                </div>
              </motion.div>

              {/* Right wall word */}
              <motion.div
                style={{ x: prefersReducedMotion ? 0 : rightX }}
                className="hidden md:block absolute right-[-15%] top-1/2 -translate-y-1/2 text-[#6e60ee] pointer-events-none select-none"
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(70px, 10vw, 140px)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.02em",
                    transform: "rotateY(-55deg) rotateZ(90deg) scale(1.6)",
                  }}
                >
                  STUDIO
                </div>
              </motion.div>

              {/* Floor word */}
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : floorY }}
                className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-[#6e60ee] pointer-events-none select-none"
              >
                <div
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(80px, 12vw, 165px)",
                    lineHeight: 0.8,
                    letterSpacing: "-0.02em",
                    transform: "rotateX(-65deg) scale(1.4)",
                  }}
                >
                  LUMINA
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Centered white headline + CTAs */}
          <motion.div 
            className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20"
            style={{ 
              opacity: prefersReducedMotion ? 1 : centerOpacity,
              scale: prefersReducedMotion ? 1 : centerScale,
            }}
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <p className="text-[14px] text-[#999999] mb-4 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                {content.hero.eyebrow}
              </p>
              <h1
                className="text-[#ffffff] mb-6"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(34px, 6vw, 78px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                }}
              >
                {content.hero.title1}
                <br />
                {content.hero.title2}
              </h1>
              <p className="text-[18px] text-[#999999] mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {content.hero.subtitle}
              </p>

              {/* Pill CTAs */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <motion.a
                  href="#contact"
                  className="px-8 py-3 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[16px] inline-block font-medium"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {content.hero.cta1}
                </motion.a>
                <motion.a
                  href="#work"
                  className="px-8 py-3 rounded-full border border-[#e5e5e5] text-[#ffffff] text-[16px] inline-block font-medium hover:border-[#ffffff] transition-colors"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {content.hero.cta2}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Pinned Full-Screen Feature Showcase */}
      <FeatureShowcase 
        content={content} 
        lang={lang} 
        showcaseImages={showcaseImages}
        prefersReducedMotion={prefersReducedMotion} 
      />

      {/* 3. Giant 3D Stats */}
      <Giant3DStats lang={lang} prefersReducedMotion={prefersReducedMotion} />

      {/* 4. Built for Makers */}
      <BuiltForMakers lang={lang} />

      {/* 5. Prompt-Card Gallery Grid */}
      <section id="work" className="max-w-[1440px] mx-auto px-6 py-20 relative z-20 bg-[#000000]">
        <div className="mb-12 border-t border-[#e5e5e5]/10 pt-20">
          <SectionHeader title={LABELS.gallery[lang]} />

          {/* Pill Filter Tabs */}
          <div className="flex items-center justify-center gap-x-4 gap-y-3 flex-wrap mt-10 mb-12">
            {(["all", "branding", "web", "content"] as GalleryCategory[]).map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-[16px] transition-colors border ${
                  activeFilter === filter
                    ? "bg-[#6e60ee] text-[#ffffff] border-[#6e60ee] shadow-[0_0_24px_rgba(110,96,238,0.45)]"
                    : "bg-transparent text-[#999999] hover:text-[#ffffff] border-transparent hover:border-[#ffffff]/20"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {LABELS.filters[lang][filter]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Four columns on desktop so the default eight works fill two whole rows. */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, i) => (
              <PromptCard
                key={item.src}
                item={item}
                index={i}
                lang={lang}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 6. Color Card Carousel */}
      <ColorCardCarousel content={content} />

      {/* 7. Artist Stories Band */}
      <ArtistStoriesBand lang={lang} prefersReducedMotion={prefersReducedMotion} />

      {/* 8. Testimonials */}
      <section id="clients" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <SectionHeader title={content.testimonials.title} />
        {isSampleContent(template) && <div className="mt-6 flex justify-center"><SampleTag lang={lang} /></div>}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {content.testimonials.items.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <SectionHeader title={content.faq.title} />
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          {content.faq.items.map((item, i) => (
            <FaqItem key={i} item={item} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </section>

      {/* 10. Contact Form */}
      <section id="contact" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title={content.contact.title} blurb={content.contact.blurb} />
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                {content.contact.name}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder={content.contact.name}
                required
                className="w-full px-6 py-4 rounded-lg bg-[#353535] border border-[#e5e5e5]/10 text-[#ffffff] text-[16px] focus:outline-none focus:border-[#6e60ee] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="sr-only">
                {content.contact.phone}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder={content.contact.phone}
                required
                className="w-full px-6 py-4 rounded-lg bg-[#353535] border border-[#e5e5e5]/10 text-[#ffffff] text-[16px] focus:outline-none focus:border-[#6e60ee] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>
            <div>
              <label htmlFor="contact-service" className="sr-only">
                {content.contact.service}
              </label>
              <select
                id="contact-service"
                name="service"
                required
                className="w-full px-6 py-4 rounded-lg bg-[#353535] border border-[#e5e5e5]/10 text-[#ffffff] text-[16px] focus:outline-none focus:border-[#6e60ee] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              >
                <option value="">{content.contact.pick}</option>
                {content.contact.services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                {content.contact.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={content.contact.message}
                required
                rows={6}
                className="w-full px-6 py-4 rounded-lg bg-[#353535] border border-[#e5e5e5]/10 text-[#ffffff] text-[16px] focus:outline-none focus:border-[#6e60ee] transition-colors resize-none"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>
            {lead.isPreview && (
              <p className="text-[#e5e5e5]/70 text-center text-[13px]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {previewNotice(lang)}
              </p>
            )}
            <motion.button
              type="submit"
              disabled={lead.sending}
              aria-busy={lead.sending}
              className="w-full px-8 py-4 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[16px] block font-medium disabled:opacity-60 disabled:cursor-wait"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {lead.sending ? (lang === "en" ? "Sending…" : "Enviando…") : content.contact.submit}
            </motion.button>
            {lead.state.status === "sent" && (
              <p role="status" className="text-[#03e65b] text-center text-[14px]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {content.contact.success}
              </p>
            )}
            {leadOutcome && (
              <p role={lead.state.status === "failed" ? "alert" : "status"} className={`${lead.state.status === "failed" ? "text-red-400" : "text-amber-300"} text-center text-[14px]`} style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {leadOutcome}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-[#e5e5e5]/10 bg-[#0a0a0a] py-16 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-[20px] font-bold mb-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                {template.brand.name}
              </div>
              <p className="text-[14px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {content.footer.tagline}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[14px] text-[#ffffff] font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                {pick(lang, "Contact", "Contacto")}
              </h4>
              <div className="space-y-2 text-[14px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                <a href={template.brand.phoneHref} className="block hover:text-[#ffffff] transition-colors">{template.brand.phone}</a>
                <a href={`mailto:${template.brand.email}`} className="block hover:text-[#ffffff] transition-colors">{template.brand.email}</a>
                <p>{template.brand.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-[14px] text-[#ffffff] font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                {content.footer.hoursLabel}
              </h4>
              <p className="text-[14px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {content.footer.hours}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[14px] text-[#ffffff] font-bold mb-4 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                {pick(lang, "Quick Links", "Enlaces")}
              </h4>
              <div className="space-y-2">
                {[
                  { label: content.nav.services, href: "#services" },
                  { label: content.nav.why, href: "#studio" },
                  { label: content.nav.contact, href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-[14px] text-[#999999] hover:text-[#ffffff] transition-colors duration-300"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#e5e5e5]/10 text-center text-[12px] text-[#666666]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
            © {new Date().getFullYear()} {template.brand.name}. {content.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function FeatureShowcase({ content, lang, showcaseImages, prefersReducedMotion }: { content: any, lang: "en" | "es", showcaseImages: string[], prefersReducedMotion: boolean | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const slides = LABELS.showcase[lang];
  const items = content.services.items;

  // Background Img Opacities: each crossfade sits inside the short gap between
  // two slides' copy, so no stretch of scroll shows a blended image with no text.
  const img1Op = useTransform(scrollYProgress, [0, 0.31, 0.35, 1], [1, 1, 0, 0]);
  const img2Op = useTransform(scrollYProgress, [0, 0.31, 0.35, 0.62, 0.66, 1], [0, 0, 1, 1, 0, 0]);
  const img3Op = useTransform(scrollYProgress, [0, 0.62, 0.66, 1], [0, 0, 1, 1]);

  // Background Img Scales (Ken Burns)
  const img1Scale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1.1, 1.1]);
  const img2Scale = useTransform(scrollYProgress, [0, 0.31, 0.66, 1], [1, 1, 1.1, 1.1]);
  const img3Scale = useTransform(scrollYProgress, [0, 0.62, 1], [1, 1, 1.1]);

  // Text Y sliding
  const t1Y = useTransform(scrollYProgress, [0, 0.27, 0.31, 1], [0, 0, -100, -100]);
  const t2Y = useTransform(scrollYProgress, [0, 0.35, 0.39, 0.58, 0.62, 1], [100, 100, 0, 0, -100, -100]);
  const t3Y = useTransform(scrollYProgress, [0, 0.66, 0.70, 0.92, 0.97, 1], [100, 100, 0, 0, -100, -100]);

  // Text Opacities
  const t1Op = useTransform(scrollYProgress, [0, 0.27, 0.31, 1], [1, 1, 0, 0]);
  const t2Op = useTransform(scrollYProgress, [0, 0.35, 0.39, 0.58, 0.62, 1], [0, 0, 1, 1, 0, 0]);
  const t3Op = useTransform(scrollYProgress, [0, 0.66, 0.70, 0.92, 0.97, 1], [0, 0, 1, 1, 0, 0]);

  // Pointer events mapping to only be "auto" when text is visible
  const t1Pointer = useTransform(scrollYProgress, (p) => p < 0.29 ? "auto" : "none");
  const t2Pointer = useTransform(scrollYProgress, (p) => p >= 0.37 && p <= 0.60 ? "auto" : "none");
  const t3Pointer = useTransform(scrollYProgress, (p) => p >= 0.68 && p <= 0.95 ? "auto" : "none");

  const imgOps = [img1Op, img2Op, img3Op];
  const imgScales = [img1Scale, img2Scale, img3Scale];
  const tYs = [t1Y, t2Y, t3Y];
  const tOps = [t1Op, t2Op, t3Op];
  const tPointers = [t1Pointer, t2Pointer, t3Pointer];

  if (prefersReducedMotion) {
    return (
      <section id="services" className="relative bg-[#000000] z-20 flex flex-col">
        {slides.map((title, i) => (
          <div key={`slide-${i}`} className="relative min-h-[70vh] flex flex-col justify-end p-8 md:p-20 pb-20">
            <div className="absolute inset-0">
              <img 
                src={showcaseImages[i]} 
                alt={title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-[clamp(44px,6vw,65px)] font-black text-white leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                {title}
              </h2>
              <p className="text-[16px] md:text-[19px] text-[#e5e5e5] mb-8 leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {items[i]?.blurb}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[16px] inline-block font-medium hover:opacity-90 transition-opacity"
                >
                  {content.hero.cta1}
                </a>
                <a
                  href="#work"
                  className="px-8 py-3 rounded-full border border-[#e5e5e5] text-[#ffffff] text-[16px] inline-block font-medium hover:bg-[#ffffff]/10 transition-colors"
                >
                  {content.hero.cta2}
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} id="services" className="relative h-[350vh] bg-[#000000] z-20">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#000000]" />
        
        {/* Background Images */}
        {slides.map((_, i) => (
          <motion.div 
            key={`bg-${i}`} 
            className="absolute inset-0"
            style={{ opacity: imgOps[i] }}
          >
            <motion.img 
              src={showcaseImages[i]} 
              alt={slides[i]}
              className="w-full h-full object-cover" 
              style={{ scale: imgScales[i] }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          </motion.div>
        ))}

        {/* Text Content */}
        {slides.map((title, i) => (
          <motion.div 
            key={`text-${i}`}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 pointer-events-none pb-32 md:pb-20"
            style={{ 
              y: tYs[i], 
              opacity: tOps[i] 
            }}
          >
            <motion.div 
              className="max-w-2xl"
              style={{ pointerEvents: tPointers[i] }}
            >
              <h2 className="text-[clamp(44px,6vw,65px)] font-black text-white leading-[0.9] tracking-tight mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                {title}
              </h2>
              <p className="text-[16px] md:text-[19px] text-[#e5e5e5] mb-8 leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {items[i]?.blurb}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <motion.a
                  href="#contact"
                  className="px-8 py-3 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[16px] inline-block font-medium"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {content.hero.cta1}
                </motion.a>
                <motion.a
                  href="#work"
                  className="px-8 py-3 rounded-full border border-[#e5e5e5] text-[#ffffff] text-[16px] inline-block font-medium hover:border-[#ffffff] transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {content.hero.cta2}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Giant3DStats({ lang, prefersReducedMotion }: { lang: "en" | "es", prefersReducedMotion: boolean | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Tilts as it passes through the screen, without pinning: a pinned stage
  // that flew the words away left a blank black screen behind it, and pulling
  // the section up over the showcase laid these words on the last slide's copy.
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 35]);

  const words = LABELS.stats[lang];

  return (
    <section ref={ref} id="studio" className="relative z-30 py-24 md:py-32 overflow-hidden pointer-events-none">
      <div className="w-full flex items-center justify-center" style={{ perspective: "1200px" }}>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full max-w-[1440px] px-6"
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Left Stat */}
          <div 
            className="flex-1 text-[#33d0ff] text-center md:text-right"
            style={{ transform: "rotateY(25deg)", transformOrigin: "right center" }}
          >
            <div className="text-[clamp(52px,7vw,104px)] font-black leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              {words.left.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            </div>
          </div>
          
          {/* Right Stat */}
          <div 
            className="flex-1 text-[#03e65b] text-center md:text-left"
            style={{ transform: "rotateY(-25deg)", transformOrigin: "left center" }}
          >
            <div className="text-[clamp(52px,7vw,104px)] font-black leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              {words.right.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BuiltForMakers({ lang }: { lang: "en" | "es" }) {
  const words = LABELS.makers[lang];
  return (
    <section className="py-20 md:py-28 bg-[#000000] overflow-hidden relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-wrap gap-x-6 gap-y-4 justify-center items-center">
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[0]}</span>
        <div className="w-[clamp(40px,8vw,80px)] h-[clamp(40px,8vw,80px)] rounded-full bg-[#6e60ee]" />
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[1]}</span>
        <div className="w-[clamp(40px,8vw,80px)] h-[clamp(40px,8vw,80px)] bg-[#03e65b]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[2]}</span>
      </div>
    </section>
  );
}

function ColorCardCarousel({ content }: { content: any }) {
  const colors = ["#03e65b", "#ffc533", "#ff3386", "#33d0ff"];

  return (
    <section id="process" className="py-24 bg-[#000000] relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 mb-16">
        <SectionHeader title={content.process.title} />
      </div>
      {/* A plain grid: a hidden-scrollbar carousel hid the last steps from mouse users. */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {content.process.items.map((item: any, i: number) => (
            <div
              key={i}
              className="@container min-h-[280px] md:min-h-[420px] rounded-[24px] p-8 md:p-10 flex flex-col justify-between gap-8"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <p className="text-[18px] md:text-[24px] text-black/80 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>0{i+1}</p>
              <div>
                {/* Sized to the card (cqi), so a long step like CONCEPTUALIZAR fits on one line. */}
                <h3 className="font-black text-black leading-[0.9] tracking-tight uppercase mb-4 break-words" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(28px, 10cqi, 80px)" }}>
                  {item.title}
                </h3>
                <p className="text-[16px] md:text-[20px] text-black/80 leading-relaxed font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtistStoriesBand({ lang, prefersReducedMotion }: { lang: "en" | "es", prefersReducedMotion: boolean | null }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [100, -300]);

  const words = LABELS.storiesBand[lang];

  return (
    <section className="py-24 bg-[#000000] relative z-20 overflow-hidden flex items-center border-y border-[#e5e5e5]/10">
      <motion.div ref={ref} style={{ x }} className="flex items-center gap-12 whitespace-nowrap">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-[clamp(60px,10vw,120px)] font-black text-white leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[0]}</span>
            <div className="w-16 h-16 flex items-center justify-center text-[#6e60ee]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <span className="text-[clamp(60px,10vw,120px)] font-black text-white leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[1]}</span>
            <div className="w-16 h-16 flex items-center justify-center text-[#6e60ee]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/** Static on purpose: the scroll parallax these headings had pushed them into
 *  the filter pills below on phones. */
function SectionHeader({ title, blurb }: { title: string; blurb?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto relative z-10">
      <h2
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(44px, 6vw, 78px)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
        }}
        className="text-[#6e60ee] text-balance"
      >
        {title}
      </h2>
      {blurb && (
        <p className="mt-4 text-[18px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          {blurb}
        </p>
      )}
    </div>
  );
}

function PromptCard({ item, index, prefersReducedMotion, lang }: { item: GalleryItem; index: number; prefersReducedMotion: boolean | null; lang: "en" | "es" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardData = LABELS.galleryCards[lang][index % 8] || LABELS.galleryCards[lang][0];

  return (
    <motion.div
      ref={ref}
      layout
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
      className="relative overflow-hidden rounded-[8px] bg-[#353535] flex flex-col"
      style={{
        boxShadow: "0 0 0 1px rgba(229,229,229,0.06), 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.altEn}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover origin-center"
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
        />
      </div>
      
      {/* Prompt card footer */}
      <div className="p-4 bg-[#353535] flex flex-col gap-2">
        <div className="inline-block px-3 py-1 rounded-full bg-[#6e60ee]/20 text-[12px] text-[#6e60ee] self-start" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
          {cardData.model}
        </div>
        <p className="text-[13px] text-[#999999] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          {cardData.prompt}
        </p>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ item, index, prefersReducedMotion }: { item: { name: string; role: string; quote: string }; index: number; prefersReducedMotion: boolean | null }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      className="p-8 rounded-lg bg-[#353535] border border-[#e5e5e5]/10"
    >
      <p className="text-[16px] text-[#ffffff] leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
        “{item.quote}”
      </p>
      <div>
        <p className="text-[14px] text-[#ffffff] font-bold" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
          {item.name}
        </p>
        <p className="text-[12px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          {item.role}
        </p>
      </div>
    </motion.div>
  );
}

function FaqItem({ item, index, prefersReducedMotion }: { item: { q: string; a: string }; index: number; prefersReducedMotion: boolean | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
      className="p-6 rounded-lg bg-[#353535] border border-[#e5e5e5]/10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <h3 className="text-[18px] text-[#ffffff] font-bold group-hover:text-[#6e60ee] transition-colors" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
          {item.q}
        </h3>
        <span 
          className="text-[#6e60ee] text-[24px] font-light leading-none transform transition-transform duration-300" 
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-[16px] text-[#999999] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
