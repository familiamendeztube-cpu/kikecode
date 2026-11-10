import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Pause, X, Instagram, Menu, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { BusinessTemplate } from "@/templates/types";
import { TEMPLATE_ASSETS } from "@/lib/plw";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { FenixCatalog, useConsulta } from "./fenix-catalog";
import { FENIX_PRODUCTS, type FenixCategory } from "./products";

function BackgroundVideo({ src, poster, reducedMotion, ariaLabel }: { src: string, poster: string, reducedMotion: boolean | null, ariaLabel: string }) {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.play().catch(() => setPlaying(false));
    else videoRef.current.pause();
  }, [playing]);

  if (reducedMotion) {
    return <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />;
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <button
        onClick={() => setPlaying(!playing)}
        className="fx-press absolute bottom-6 right-6 z-30 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm border border-white/10"
        aria-label={playing ? `Pausar ${ariaLabel}` : `Reproducir ${ariaLabel}`}
      >
        {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
      </button>
    </>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div className="border-b border-[var(--border-subtle)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full py-5 text-left flex justify-between items-center group"
      >
        <span className="font-bold text-base md:text-lg pr-8 text-white group-hover:text-[var(--premium-gold)] transition-colors">{q}</span>
        <ChevronRight className={`w-5 h-5 shrink-0 text-[var(--premium-gold)] transition-transform duration-200 ease-out ${open ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 1, height: "auto" } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1, height: "auto" } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FenixSite({ template }: { template: BusinessTemplate }) {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuFocus = useReturnFocus();
  // Shared with the catalog: the header and menu open "Mi consulta", the category tiles filter it.
  const [consulta, setConsulta] = useConsulta();
  const [consultaOpen, setConsultaOpen] = useState(false);
  const [category, setCategory] = useState<FenixCategory | "all">("all");

  const lang = template.lockedLang ?? "es";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = whatsappLink(template.brand);

  const heroPoster = template.media?.heroPoster || template.media?.hero || `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_hero.jpg`;
  const heroVideo = template.media?.heroVideo;
  const isCustomHero = template.media?.hero && !template.media.hero.includes("fenix_hero.jpg");
  const activeHeroVideo = isCustomHero && !template.media?.heroVideo ? undefined : heroVideo;
  const shopImg = `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_shop2.jpg`;

  const categoryMap: { id: FenixCategory; title: string; img: string }[] = [
    { id: "maquinas", title: "Máquinas", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_clipper_kit.jpg` },
    { id: "trimmers", title: "Trimmers", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_clipper_box.jpg` },
    { id: "shavers", title: "Shavers", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_shaver_black.jpg` },
    { id: "secadoras", title: "Secadoras", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_dryer.jpg` },
    { id: "accesorios", title: "Accesorios", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_accesorios.jpg` },
    { id: "sillas", title: "Sillas de Barbero", img: `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_shop.jpg` },
  ];

  const catCounts = categoryMap.map(c => ({
    ...c,
    count: FENIX_PRODUCTS.filter(p => p.category === c.id).length
  })).filter(c => c.count > 0);

  return (
    <div className="fenix-theme min-h-[100dvh] bg-[var(--background-primary)] text-[var(--text-primary)] font-sans overflow-x-clip selection:bg-[var(--premium-gold)] selection:text-black pb-[calc(4rem+env(safe-area-inset-bottom))] md:!pb-0">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap');
        .fenix-theme {
          --background-primary: #000000;
          --background-secondary: #0D0D0D;
          --surface-primary: #121212;
          --surface-elevated: #181818;
          --premium-gold: #D4AF37;
          --premium-gold-dark: #A98323;
          --premium-gold-soft: rgba(212, 175, 55, 0.16);
          --text-primary: #F5F2EA;
          --text-secondary: #A8A8A8;
          --text-muted: #8A8A8A;
          --border-subtle: rgba(255, 255, 255, 0.10);
          --border-gold: rgba(212, 175, 55, 0.55);
        }
        /* Buttons answer the press; colour changes stay quick. */
        .fenix-theme .fx-press {
          transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms ease, border-color 150ms ease, color 150ms ease;
        }
        .fenix-theme .fx-press:active:not(:disabled) { transform: scale(0.97); }
        @media (prefers-reduced-motion: reduce) {
          .fenix-theme .fx-press:active:not(:disabled) { transform: none; }
        }
        .fenix-theme :is(a, button):focus-visible {
          outline: 2px solid var(--premium-gold);
          outline-offset: 2px;
        }
        .fenix-theme h1, .fenix-theme h2, .fenix-theme h3, .fenix-theme .font-display {
          font-family: 'Oswald', 'Inter', sans-serif;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .fenix-theme body {
          background-image: none !important;
        }
      `}} />

      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-[background-color,border-color,padding] duration-200 ease-out ${scrolled ? 'bg-[var(--background-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] py-3' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 z-50">
            <img src={template.brand.logo || `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_logo.jpg`} alt={template.brand.name} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border border-[var(--premium-gold)]" />
            <span className="font-display font-bold tracking-wide text-lg md:text-xl hidden sm:block">SUPLIDORA FÉNIX</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--text-secondary)]">
            <a href="#productos" className="py-3 hover:text-[var(--premium-gold)] transition-colors">Catálogo</a>
            <a href="#comprar" className="py-3 hover:text-[var(--premium-gold)] transition-colors">Cómo comprar</a>
            <a href="#faq" className="py-3 hover:text-[var(--premium-gold)] transition-colors">FAQ</a>
            <button
              onClick={() => setConsultaOpen(true)}
              className="fx-press bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 rounded-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Mi Consulta
              {consulta.length > 0 && <span className="bg-black text-[var(--premium-gold)] px-1.5 py-0.5 rounded-full text-[10px]">{consulta.length}</span>}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-[var(--text-primary)] p-2 z-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <Dialog.Content {...menuFocus} forceMount asChild aria-describedby={undefined}>
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, transition: { duration: 0.15, ease: "easeOut" } }}
                className="fixed inset-0 z-[55] bg-[var(--background-primary)] flex flex-col pt-24 px-6 md:hidden overflow-y-auto pb-[calc(4rem+env(safe-area-inset-bottom))]"
              >
                {/* The menu covers the header and closes from inside: a modal dialog blocks taps on the header's button. */}
                <Dialog.Close aria-label="Cerrar menú" className="fx-press absolute top-4 right-4 p-2 text-[var(--text-primary)]">
                  <X className="w-7 h-7" />
                </Dialog.Close>
                <Dialog.Title className="sr-only">Menú</Dialog.Title>
                <nav className="flex flex-col gap-6 text-xl font-bold font-display text-[var(--text-primary)]">
                  <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Inicio</a>
                  <a href="#productos" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Catálogo</a>
                  <a href="#categorias" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Categorías</a>
                  <a href="#comprar" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Cómo comprar</a>
                  <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Preguntas frecuentes</a>
                  <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Ubicación</a>
                  <a href={template.brand.socials?.instagram || "#"} onClick={() => setMobileMenuOpen(false)} target="_blank" className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">Instagram</a>
                  <a href={whatsappUrl} onClick={() => setMobileMenuOpen(false)} target="_blank" className="hover:text-[var(--premium-gold)] border-b border-[var(--border-subtle)] pb-4">WhatsApp</a>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setConsultaOpen(true);
                    }}
                    className="text-left uppercase hover:text-[var(--premium-gold-dark)] text-[var(--premium-gold)] pb-4"
                  >
                    Mi consulta
                  </button>
                </nav>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Root>

      {/* 1. HERO */}
      <section className="relative min-h-[90dvh] md:min-h-[100dvh] w-full flex flex-col justify-end pb-24 md:pb-0 md:justify-center overflow-hidden bg-[var(--background-primary)]">
        <div className="absolute inset-0 z-0">
          {activeHeroVideo ? (
            <BackgroundVideo src={activeHeroVideo} poster={heroPoster} reducedMotion={prefersReducedMotion} ariaLabel="hero" />
          ) : (
            <img src={heroPoster} alt="" className="w-full h-full object-cover opacity-60" />
          )}
          {/* Darkest behind the copy: the bottom on phones, the left on desktop. */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-[var(--background-primary)] via-[var(--background-primary)]/70 md:via-[var(--background-primary)]/50 to-[var(--background-primary)]/10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pointer-events-none">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-auto max-w-2xl"
          >
            <div className="text-[var(--premium-gold)] text-[10px] md:text-xs font-bold tracking-[0.15em] mb-4 uppercase inline-block border border-[var(--border-gold)] bg-[var(--premium-gold-soft)] px-3 py-1">
              Equipamiento Profesional
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-[var(--text-primary)] leading-[1.1] mb-5">
              Elevá tu barbería con equipo profesional.
            </h1>
            
            <p className="text-[var(--text-secondary)] text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
              Explorá máquinas, trimmers, shavers, accesorios y mobiliario. Coordiná tu compra directamente con nuestro equipo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <a href="#productos" className="fx-press w-full sm:w-auto bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black px-6 py-4 md:py-3 text-sm font-bold uppercase tracking-wide text-center">
                Ver catálogo
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fx-press w-full sm:w-auto border border-[var(--text-secondary)] text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:bg-[var(--surface-primary)] px-6 py-4 md:py-3 text-sm font-bold uppercase tracking-wide text-center">
                Consultar por WhatsApp
              </a>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] tracking-wider">
              Precios y disponibilidad sujetos a confirmación. Venta exclusiva a través de atención personalizada por WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section id="categorias" className="py-12 md:py-24 px-4 md:px-8 bg-[var(--background-secondary)] border-b border-[var(--border-subtle)]">
        {/* 76rem = the header's max-w-7xl minus its padding, so every section shares the same left and right edge. */}
        <div className="max-w-[76rem] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {catCounts.map((cat, i) => {
              // The first tile is wide; with an even count the last one is too, so no row ends half empty.
              const wide = i === 0 || (i === catCounts.length - 1 && catCounts.length % 2 === 0);
              return (
              <a
                key={cat.id}
                href={`#productos`}
                onClick={() => setCategory(cat.id)}
                className={`group relative overflow-hidden bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-end ${wide ? 'col-span-2 aspect-[2/1] md:aspect-auto' : 'aspect-square'}`}
              >
                <img src={cat.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-[1.03] group-hover:opacity-80 transition-[transform,opacity] duration-300 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
                <div className="relative p-3 md:p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-sm md:text-2xl font-display font-bold text-white mb-1 group-hover:text-[var(--premium-gold)] transition-colors leading-tight">{cat.title}</h3>
                      <p className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-wider">{cat.count} {cat.count === 1 ? "producto" : "productos"}</p>
                    </div>
                    <ArrowRight className="hidden md:block w-5 h-5 text-[var(--premium-gold)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 ease-out" />
                  </div>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATALOG INTRO */}
      <section className="py-12 px-4 bg-[var(--background-primary)] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">Catálogo Profesional</h2>
          <div className="w-12 h-[2px] bg-[var(--premium-gold)] mx-auto mb-4" />
          <p className="text-[var(--text-secondary)] text-sm md:text-base mb-6">Encontrá el equipo y los productos que necesitás para tu barbería.</p>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
            <span>Productos profesionales</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Marcas seleccionadas</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Atención por WhatsApp</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Catalog Integration) */}
      <section id="productos" className="bg-[var(--background-primary)]">
        <FenixCatalog
          brand={template.brand}
          consulta={consulta}
          setConsulta={setConsulta}
          consultaOpen={consultaOpen}
          setConsultaOpen={setConsultaOpen}
          category={category}
          setCategory={setCategory}
          menuOpen={mobileMenuOpen}
        />
      </section>

      {/* 4. CÓMO COMPRAR */}
      <section id="comprar" className="py-16 md:py-24 px-4 md:px-8 bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-[76rem] mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">Proceso de Compra</h2>
            <div className="w-12 h-[2px] bg-[var(--premium-gold)] mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-[var(--border-gold)]" />

            {[
              ["01", "Explorá el catálogo", "Revisá productos, características y opciones disponibles."],
              ["02", "Agregá productos a Mi consulta", "Seleccioná los productos de tu interés a la lista de consulta."],
              ["03", "Enviá la lista por WhatsApp", "Nuestro equipo confirmará disponibilidad y método de pago."],
            ].map(([n, title, body]) => (
              <div key={n} className="relative bg-[var(--background-primary)] p-6 md:p-8 border border-[var(--border-subtle)]">
                <div aria-hidden className="text-4xl md:text-5xl font-display font-black text-[var(--premium-gold-soft)] absolute top-4 right-4 leading-none">{n}</div>
                {/* pr-12 keeps long titles clear of the step number in the corner. */}
                <h3 className="text-lg md:text-xl font-bold mb-2 pr-12 text-[var(--premium-gold)] relative z-10">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] relative z-10">{body}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-[10px] md:text-[11px] text-[var(--text-muted)] tracking-wider">
            Precios, disponibilidad, pago y entrega se confirman directamente con Suplidora Fénix.
          </div>
        </div>
      </section>

      {/* 5. STORE SECTION */}
      <section id="ubicacion" className="py-0 bg-[var(--background-primary)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* The photo is portrait: absolute, so it fills the row instead of setting a 1000px+ row height. */}
          <div className="relative h-[30vh] lg:h-auto lg:min-h-[600px] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]">
            <img src={shopImg} alt="Suplidora Fénix" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-20 flex flex-col justify-center bg-[var(--surface-primary)]">
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-6">Visitá Suplidora Fénix</h2>
            
            <div className="space-y-6 text-sm text-[var(--text-secondary)] mb-8">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[var(--premium-gold)] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[var(--text-primary)] text-base mb-1">Mall San Pedro</strong>
                  <p>Estamos ubicados en Mall San Pedro. Visitá nuestra tienda para ver el equipo profesional en persona.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.google.com/maps/search/Suplidora+Fenix+Mall+San+Pedro" target="_blank" rel="noreferrer" className="fx-press w-full sm:w-auto bg-[var(--surface-elevated)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-6 py-4 md:py-3 text-sm font-bold uppercase tracking-wide text-center flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Cómo llegar
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fx-press w-full sm:w-auto bg-[var(--premium-gold)] hover:bg-[var(--premium-gold-dark)] text-black px-6 py-4 md:py-3 text-sm font-bold uppercase tracking-wide text-center">
                Contactar Tienda
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faq" className="py-16 md:py-24 px-4 md:px-8 bg-[var(--background-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-3">{template.content[lang].faq.title}</h2>
            <div className="w-12 h-[2px] bg-[var(--premium-gold)] mx-auto" />
          </div>
          <div className="bg-[var(--surface-primary)] px-6 py-2 border border-[var(--border-subtle)]">
            {template.content[lang].faq.items.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-[var(--background-primary)] py-16 px-4 md:px-8 pb-32 md:pb-16 text-center md:text-left border-t border-[var(--border-subtle)]">
        <div className="max-w-[76rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <img src={template.brand.logo || `${TEMPLATE_ASSETS}/suplidora-fenix/fenix_logo.jpg`} alt={template.brand.name} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-[var(--premium-gold)]" />
              <span className="font-display font-bold tracking-wide text-xl uppercase">Suplidora Fénix</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto md:mx-0 leading-relaxed mb-6">
              Equipamiento profesional para barberías. Máquinas, trimmers, shavers y accesorios de alta calidad.
            </p>
            <div className="text-[10px] text-[var(--text-muted)] tracking-wider max-w-xs mx-auto md:mx-0 border-t border-[var(--border-subtle)] pt-4">
              Precios y disponibilidad sujetos a confirmación. La compra se gestiona directamente con nuestro equipo.
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-4 uppercase text-xs tracking-wider">Navegación</h4>
            <ul className="md:space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="#productos" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors">Catálogo</a></li>
              <li><a href="#categorias" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors">Categorías</a></li>
              <li><a href="#comprar" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors">Proceso de compra</a></li>
              <li><a href="#faq" className="inline-flex items-center min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[var(--text-primary)] mb-4 uppercase text-xs tracking-wider">Contacto</h4>
            <ul className="md:space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href={whatsappUrl} target="_blank" className="inline-flex items-center gap-2 min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors"><ArrowRight className="w-3 h-3" /> WhatsApp</a></li>
              <li><a href={template.brand.socials?.instagram || "#"} target="_blank" className="inline-flex items-center gap-2 min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors"><Instagram className="w-3 h-3" /> Instagram</a></li>
              <li><a href="#ubicacion" className="inline-flex items-center gap-2 min-h-11 lg:min-h-0 hover:text-[var(--premium-gold)] transition-colors"><MapPin className="w-3 h-3" /> Mall San Pedro</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[76rem] mx-auto mt-12 pt-8 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] uppercase tracking-wider flex flex-col md:flex-row justify-center items-center">
          <p>&copy; {new Date().getFullYear()} Suplidora Fénix. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
