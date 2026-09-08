import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion, AnimatePresence, useSpring } from "framer-motion";
import type { BusinessTemplate } from "@/lib/templates/types";

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
  { src: "/template-assets/lumina-studio/lumina_v2_g1.jpg", category: "content", altEn: "Ethereal portrait with butterfly wings" },
  { src: "/template-assets/lumina-studio/lumina_v2_g2.jpg", category: "branding", altEn: "Mecha samurai warrior in cyberpunk streets" },
  { src: "/template-assets/lumina-studio/lumina_v2_g3.jpg", category: "content", altEn: "Majestic dragon in storm clouds" },
  { src: "/template-assets/lumina-studio/lumina_v2_g4.jpg", category: "content", altEn: "Anime character with luminous eyes" },
  { src: "/template-assets/lumina-studio/lumina_v2_g5.jpg", category: "branding", altEn: "Surreal desert with floating clocks" },
  { src: "/template-assets/lumina-studio/lumina_v2_g6.jpg", category: "content", altEn: "Astronaut with bioluminescent jellyfish" },
  { src: "/template-assets/lumina-studio/lumina_v2_g7.jpg", category: "branding", altEn: "Royal fox Renaissance oil painting" },
  { src: "/template-assets/lumina-studio/lumina_v2_g8.jpg", category: "content", altEn: "Ice phoenix over frozen peaks" },
];

const DEFAULT_SHOWCASE_IMAGES = [
  "/template-assets/lumina-studio/lumina_v2_show1.jpg",
  "/template-assets/lumina-studio/lumina_v2_show2.jpg",
  "/template-assets/lumina-studio/lumina_v2_show3.jpg"
];

/**
 * Cinematic dark-canvas editorial renderer (Leonardo.ai-inspired).
 * Full implementation of the LUMINA studio site with sculptural 3D typography,
 * pill navigation, tight gallery grids, and Leonardo's visual system.
 */
export default function LeonardoSite({ template }: { template: BusinessTemplate }) {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  
  const content = template.content[lang];
  const prefersReducedMotion = useReducedMotion();
  
  // Hero Dolly Setup
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  
  const roomScale = useTransform(heroProgress, [0, 0.4, 1], [1, 4, 4]);
  const roomZ = useTransform(heroProgress, [0, 0.4, 1], [0, 800, 800]);
  const roomOpacity = useTransform(heroProgress, [0, 0.35, 0.4, 1], [1, 1, 0, 0]);
  
  const centerOpacity = useTransform(heroProgress, [0, 0.85, 1], [1, 1, 0.4]);
  const centerScale = useTransform(heroProgress, [0, 0.4, 1], [1, 0.85, 0.85]);

  const ceilingY = useTransform(heroProgress, [0, 0.4, 1], [0, -200, -200]);
  const floorY = useTransform(heroProgress, [0, 0.4, 1], [0, 200, 200]);
  const leftX = useTransform(heroProgress, [0, 0.4, 1], [0, -300, -300]);
  const rightX = useTransform(heroProgress, [0, 0.4, 1], [0, 300, 300]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
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
    <div className="min-h-screen bg-[#000000] text-[#ffffff] overflow-x-clip">
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
              className="px-5 py-2 rounded-full border border-[#e5e5e5] text-[14px] text-[#ffffff] hover:border-[#ffffff] transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {lang === "en" ? "ES" : "EN"}
            </motion.button>
            <motion.a
              href="#contact"
              className="px-7 py-2.5 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[14px] font-medium hover:bg-[#ffffff] transition-colors inline-block"
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
        className="relative h-[300vh] bg-[#000000]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center">
          {/* Optional subtle hero backdrop */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src="/template-assets/lumina-studio/lumina_v2_hero.jpg" 
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
                className="absolute left-[-15%] top-1/2 -translate-y-1/2 text-[#6e60ee] pointer-events-none select-none"
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
                className="absolute right-[-15%] top-1/2 -translate-y-1/2 text-[#6e60ee] pointer-events-none select-none"
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
      <BuiltForMakers lang={lang} prefersReducedMotion={prefersReducedMotion} />

      {/* 5. Prompt-Card Gallery Grid */}
      <section id="work" className="max-w-[1440px] mx-auto px-6 py-20 relative z-20 bg-[#000000]">
        <div className="mb-12 border-t border-[#e5e5e5]/10 pt-20">
          <ParallaxHeading prefersReducedMotion={prefersReducedMotion}>
            {LABELS.gallery[lang]}
          </ParallaxHeading>

          {/* Pill Filter Tabs */}
          <div className="flex items-center justify-center gap-6 flex-wrap mb-12">
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

        {/* Tight 3-column grid with AnimatePresence for filter transitions */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
      <ColorCardCarousel content={content} prefersReducedMotion={prefersReducedMotion} />

      {/* 7. Artist Stories Band */}
      <ArtistStoriesBand lang={lang} prefersReducedMotion={prefersReducedMotion} />

      {/* 8. Testimonials */}
      <section id="clients" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <SectionHeader title={content.testimonials.title} prefersReducedMotion={prefersReducedMotion} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {content.testimonials.items.map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <SectionHeader title={content.faq.title} prefersReducedMotion={prefersReducedMotion} />
        <div className="max-w-3xl mx-auto mt-12 space-y-6">
          {content.faq.items.map((item, i) => (
            <FaqItem key={i} item={item} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>
      </section>

      {/* 10. Contact Form */}
      <section id="contact" className="max-w-[1440px] mx-auto px-6 py-24 relative z-20 bg-[#000000]">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title={content.contact.title} blurb={content.contact.blurb} prefersReducedMotion={prefersReducedMotion} />
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                {content.contact.name}
              </label>
              <input
                id="contact-name"
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
                placeholder={content.contact.message}
                required
                rows={6}
                className="w-full px-6 py-4 rounded-lg bg-[#353535] border border-[#e5e5e5]/10 text-[#ffffff] text-[16px] focus:outline-none focus:border-[#6e60ee] transition-colors resize-none"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full px-8 py-4 rounded-full bg-[#ffffff] text-[#0a0a0a] text-[16px] block font-medium"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {content.contact.submit}
            </motion.button>
            {formSuccess && (
              <p className="text-[#03e65b] text-center text-[14px]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                {content.contact.success}
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
                {lang === "en" ? "Contact" : "Contacto"}
              </h4>
              <div className="space-y-2 text-[14px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                <p>{template.brand.phone}</p>
                <p>{template.brand.email}</p>
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
                {lang === "en" ? "Quick Links" : "Enlaces"}
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

  // Background Img Opacities
  const img1Op = useTransform(scrollYProgress, [0, 0.3, 0.4, 1], [1, 1, 0, 0]);
  const img2Op = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.55, 0.65, 1], [0, 0, 1, 1, 0, 0]);
  const img3Op = useTransform(scrollYProgress, [0, 0.6, 0.7, 1], [0, 0, 1, 1]);

  // Background Img Scales (Ken Burns)
  const img1Scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1.1, 1.1]);
  const img2Scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 1.1, 1.1]);
  const img3Scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 1.1]);

  // Text Y sliding
  const t1Y = useTransform(scrollYProgress, [0, 0.25, 0.30, 1], [0, 0, -100, -100]);
  const t2Y = useTransform(scrollYProgress, [0, 0.38, 0.43, 0.55, 0.60, 1], [100, 100, 0, 0, -100, -100]);
  const t3Y = useTransform(scrollYProgress, [0, 0.68, 0.73, 0.92, 0.97, 1], [100, 100, 0, 0, -100, -100]);

  // Text Opacities
  const t1Op = useTransform(scrollYProgress, [0, 0.25, 0.30, 1], [1, 1, 0, 0]);
  const t2Op = useTransform(scrollYProgress, [0, 0.38, 0.43, 0.55, 0.60, 1], [0, 0, 1, 1, 0, 0]);
  const t3Op = useTransform(scrollYProgress, [0, 0.68, 0.73, 0.92, 0.97, 1], [0, 0, 1, 1, 0, 0]);

  // Pointer events mapping to only be "auto" when text is visible
  const t1Pointer = useTransform(scrollYProgress, (p) => p < 0.28 ? "auto" : "none");
  const t2Pointer = useTransform(scrollYProgress, (p) => p >= 0.38 && p <= 0.60 ? "auto" : "none");
  const t3Pointer = useTransform(scrollYProgress, (p) => p >= 0.68 && p <= 0.97 ? "auto" : "none");

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
                  className="px-8 py-3 rounded-full border border-[#e5e5e5] text-[#ffffff] text-[16px] inline-block font-medium hover:border-[#ffffff]/20 transition-colors"
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, 60]);
  const y = useTransform(scrollYProgress, [0.5, 1], [0, -800]);

  const words = LABELS.stats[lang];

  return (
    <section ref={ref} id="studio" className="relative h-[200vh] z-30 -mt-[50vh] pointer-events-none">
      <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full max-w-[1440px] px-6"
          style={{ 
            rotateX: prefersReducedMotion ? 0 : rotateX, 
            y: prefersReducedMotion ? 0 : y, 
            transformStyle: "preserve-3d" 
          }}
        >
          {/* Left Stat */}
          <div 
            className="flex-1 text-[#33d0ff] text-center md:text-right"
            style={{ transform: "rotateY(25deg)", transformOrigin: "right center" }}
          >
            <div className="text-[clamp(60px,8vw,120px)] font-black leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              {words.left.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            </div>
          </div>
          
          {/* Right Stat */}
          <div 
            className="flex-1 text-[#03e65b] text-center md:text-left"
            style={{ transform: "rotateY(-25deg)", transformOrigin: "left center" }}
          >
            <div className="text-[clamp(60px,8vw,120px)] font-black leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              {words.right.split(' ').map((word, i) => <div key={i}>{word}</div>)}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BuiltForMakers({ lang, prefersReducedMotion }: { lang: "en" | "es", prefersReducedMotion: boolean | null }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [100, -100]);

  const words = LABELS.makers[lang];
  return (
    <section className="py-32 md:py-48 bg-[#000000] overflow-hidden relative z-20">
      <motion.div ref={ref} style={{ y }} className="max-w-[1440px] mx-auto px-6 flex flex-wrap gap-x-6 gap-y-4 justify-center items-center">
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[0]}</span>
        <div className="w-[clamp(40px,8vw,80px)] h-[clamp(40px,8vw,80px)] rounded-full bg-[#6e60ee]" />
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[1]}</span>
        <div className="w-[clamp(40px,8vw,80px)] h-[clamp(40px,8vw,80px)] bg-[#03e65b]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <span className="text-[clamp(50px,12vw,165px)] font-black text-[#ffffff] leading-[0.8] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>{words[2]}</span>
      </motion.div>
    </section>
  );
}

function ColorCardCarousel({ content, prefersReducedMotion }: { content: any, prefersReducedMotion: boolean | null }) {
  const colors = ["#03e65b", "#ffc533", "#ff3386", "#33d0ff"];
  
  return (
    <section id="process" className="py-24 bg-[#000000] relative z-20 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="max-w-[1440px] mx-auto px-6 mb-16 text-center">
        <ParallaxHeading prefersReducedMotion={prefersReducedMotion}>
          {content.process.title}
        </ParallaxHeading>
      </div>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 hide-scrollbar">
          {content.process.items.map((item: any, i: number) => (
            <div 
              key={i} 
              className="flex-none w-[85vw] md:w-[500px] h-[400px] md:h-[450px] rounded-[24px] p-8 md:p-10 flex flex-col justify-between snap-center"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <div className="flex justify-between items-start">
                <p className="text-[18px] md:text-[24px] text-black/80 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>0{i+1}</p>
                {/* Arrow icon mock */}
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>
              <div>
                <h3 className="text-[clamp(40px,8vw,80px)] font-black text-black leading-[0.9] tracking-tight uppercase mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
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

function SectionHeader({ title, blurb, prefersReducedMotion }: { title: string; blurb?: string; prefersReducedMotion: boolean | null }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [60, -60]);

  return (
    <div className="text-center max-w-3xl mx-auto relative z-10">
      <motion.h2
        ref={ref}
        style={{
          y,
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(44px, 6vw, 78px)",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
        }}
        className="text-[#6e60ee] mb-4"
      >
        {title}
      </motion.h2>
      {blurb && (
        <p className="text-[18px] text-[#999999]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          {blurb}
        </p>
      )}
    </div>
  );
}

function ParallaxHeading({ children, prefersReducedMotion }: { children: React.ReactNode; prefersReducedMotion: boolean | null }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [60, -60]);

  return (
    <motion.h2
      ref={ref}
      style={{
        y,
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(44px, 6vw, 78px)",
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
      }}
      className="text-[#6e60ee] text-center relative z-10"
    >
      {children}
    </motion.h2>
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
      className="relative overflow-hidden rounded-[8px] bg-[#353535] group cursor-pointer flex flex-col"
      style={{
        boxShadow: "0 0 0 1px rgba(229,229,229,0.06), 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.altEn}
          className="w-full h-full object-cover origin-center"
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
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

function GalleryCard({ item, index, prefersReducedMotion, lang }: { item: GalleryItem; index: number; prefersReducedMotion: boolean | null; lang: "en" | "es" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      layout
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
      className="relative overflow-hidden rounded-[8px] bg-[#353535] aspect-[4/5] group cursor-pointer"
      style={{
        boxShadow: "0 0 0 1px rgba(229,229,229,0.06), 0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      <motion.img
        src={item.src}
        alt={item.altEn}
        className="w-full h-full object-cover origin-center"
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 pointer-events-none">
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out delay-75">
          <span className="inline-block px-3 py-1 rounded-full bg-[#6e60ee] text-[12px] text-[#ffffff]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
            {LABELS.filters[lang][item.category]}
          </span>
        </div>
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
        "{item.quote}"
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
