import { useEffect, useState } from "react";
import { Menu, X, MapPin, Check, MessageCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { waLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";

/*
  The PLW tourism demo site: premium editorial Costa Rica travel direction.
  Full-bleed hero, warm off-white typography, forest green, generous spacing.

  Honesty rules this file enforces:
  - It shows only what the draft supplies (brand + overrides.tourismDemo) and
    neutral copy. No invented prices, reviews, amenities or hours.
  - Contact actions appear only when the draft has a confirmed public phone.
    Without one, the CTAs become "ask for a quote" lines that do not pretend
    to be a booking and never lead anywhere dead.
  - Gallery photos from the stock library carry an "illustrative" note until
    the business's own photos replace them.
*/

/** The tourism data a saved draft carries, read safely. */
function tourismDemo(t: BusinessTemplate): { services: string[]; highlight: string } {
  const d = t.tourismDemo;
  const services = Array.isArray(d?.services) ? d.services.filter((s): s is string => typeof s === "string" && s.trim().length > 0) : [];
  const highlight = typeof d?.highlight === "string" ? d.highlight.trim() : "";
  return { services, highlight };
}

/** A phone only when the draft confirmed a public one (blank means none). */
function publicPhone(brand: BusinessTemplate["brand"]): { phone: string; href: string } | null {
  if (!brand.phone.trim() || !brand.phoneHref.trim()) return null;
  return { phone: brand.phone, href: brand.phoneHref };
}

export default function TourismSite({ template }: { template: BusinessTemplate }) {
  const lang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuFocus = useReturnFocus();
  const { brand, media } = template;
  const demo = tourismDemo(template);
  const phone = publicPhone(brand);
  const t = template.content[lang];
  const hero = media?.hero || "";
  const gallery = media?.gallery ?? [];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div
      className="min-h-dvh bg-[#FAF7F0] text-[#1C241E] antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <style>{`
        .tourism-display { font-family: 'Playfair Display', Georgia, serif; }
        @media (prefers-reduced-motion: no-preference) {
          .tourism-reveal { opacity: 0; transform: translateY(14px); animation: tourismReveal .7s cubic-bezier(.23,1,.32,1) forwards; }
          .tourism-reveal:nth-child(2) { animation-delay: .08s; }
        }
        @keyframes tourismReveal { to { opacity: 1; transform: none; } }
      `}</style>

      {/* Header — transparent over the hero, solid once scrolled */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="absolute inset-0 bg-[#0A1F13]/80 backdrop-blur-md" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-wide">
            {brand.logo ? (
              <img src={brand.logo} alt="" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <span className="w-8 h-8 rounded-full bg-[#E8B04B] grid place-items-center text-[#0A1F13] font-bold">P</span>
            )}
            {brand.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/85">
            <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
            <a href="#gallery" className="hover:text-white transition-colors">{t.nav.faq === "FAQ" ? "Gallery" : "Galería"}</a>
            <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
            {phone && (
              <a href={phone.href} className="rounded-full bg-[#E8B04B] text-[#0A1F13] px-4 py-1.5 font-bold hover:bg-[#f2c065] transition-colors">
                {phone.phone}
              </a>
            )}
          </nav>
          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(true)} aria-label={pick(lang, "Open menu", "Abrir menú")} aria-expanded={menuOpen}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-[60]" />
          <Dialog.Content {...menuFocus} className="fixed inset-x-0 top-0 z-[70] bg-[#0A1F13] text-white px-6 pb-6 pt-20 md:hidden">
            <Dialog.Title className="sr-only">{pick(lang, "Menu", "Menú")}</Dialog.Title>
            <Dialog.Close aria-label={pick(lang, "Close menu", "Cerrar menú")} className="absolute top-5 right-5 p-2 text-white">
              <X className="w-6 h-6" />
            </Dialog.Close>
            <nav className="flex flex-col gap-5 text-lg">
              <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
              <a href="#gallery" onClick={() => setMenuOpen(false)}>{t.nav.faq === "FAQ" ? "Gallery" : "Galería"}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
              {phone && <a href={phone.href} onClick={() => setMenuOpen(false)}>{phone.phone}</a>}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Hero — full-bleed photo, editorial copy */}
      <section id="top" className="relative min-h-[92svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {hero ? (
            <img src={hero} alt="" className="w-full h-full object-cover" loading="eager" />
          ) : (
            <div className="w-full h-full bg-[#12301E]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08150E] via-[#08150E]/55 to-[#08150E]/20" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 pt-32">
          <div className="tourism-reveal max-w-2xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-4">{t.hero.eyebrow}</p>
            <h1 className="tourism-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
              {brand.name}
              <span className="mt-2 block text-2xl sm:text-3xl lg:text-4xl font-normal italic text-white/90">{t.hero.title1} {t.hero.title2}</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">{t.hero.subtitle}</p>
            {demo.highlight && (
              <p className="mt-6 inline-block rounded-full border border-[#E8B04B]/40 bg-[#E8B04B]/15 text-[#F5E3BE] px-4 py-2 text-sm font-medium">
                {demo.highlight}
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="tourism-reveal inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-7 py-4 text-[#0A1F13] font-bold transition-colors">
                <MessageCircle className="w-5 h-5" /> {t.hero.cta1}
              </a>
              <a href="#gallery" className="tourism-reveal inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur px-7 py-4 text-white font-semibold transition-colors">
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Highlight — only what the draft supplies */}
      <section id="services" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1F5E3B] mb-3">{t.nav.services}</p>
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.services.title}</h2>
            <p className="mt-4 text-[#3D4A40] leading-relaxed">{t.services.blurb}</p>
          </div>
          {demo.services.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {demo.services.map((s, i) => (
                <li key={`${s}-${i}`} className="tourism-reveal group rounded-xl border border-[#1F5E3B]/15 bg-white hover:border-[#1F5E3B]/40 hover:shadow-lg transition-all p-6">
                  <Check className="w-5 h-5 text-[#1F5E3B] mb-3" />
                  <div className="font-semibold text-[#1C241E]">{s}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-[#3D4A40]/70 italic">{pick(lang, "Services to be confirmed with the business.", "Servicios por confirmar con el negocio.")}</p>
          )}
        </div>
      </section>

      {/* Gallery — verified imagery, honest label while it is stock */}
      <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.nav.faq === "FAQ" ? "Gallery" : "Galería"}</h2>
          <p className="mt-3 text-sm text-[#3D4A40]/70">{pick(lang, "Illustrative photos of Costa Rica.", "Fotos ilustrativas de Costa Rica.")}</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {gallery.slice(0, 3).map((src, i) => (
              <figure key={src} className="tourism-reveal overflow-hidden rounded-xl">
                <img src={src} alt={(template.galleryCaptions?.[lang]?.[i]) ?? brand.name} className="w-full h-64 sm:h-80 object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                <figcaption className="pt-3 text-sm text-[#3D4A40]">{template.galleryCaptions?.[lang]?.[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-3 text-[#3D4A40]">
          <MapPin className="w-5 h-5 text-[#1F5E3B]" />
          <span className="font-medium">{brand.address || brand.city}</span>
        </div>
      </section>

      {/* Contact — actions only when there is a confirmed public phone */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0A1F13] text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8B04B] mb-3">{t.nav.contact}</p>
            <h2 className="tourism-display text-3xl sm:text-4xl tracking-tight">{t.contact.title}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">{t.contact.blurb}</p>
            <div className="mt-6 flex items-center gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4" /> {brand.address || brand.city}
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            {phone ? (
              <div className="flex flex-col gap-4">
                <a href={phone.href} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8B04B] hover:bg-[#f2c065] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
                  {pick(lang, "Call", "Llamar")} {phone.phone}
                </a>
                <a href={waLink(brand.whatsapp || phone.href, pick(lang, "Hello! I'd like to ask about a tour.", "¡Hola! Me gustaría consultar por un tour."))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#3ce77f] px-6 py-4 text-[#0A1F13] font-bold transition-colors">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <p className="text-xs text-white/60">{pick(lang, "We answer during the day. No online payment.", "Respondemos durante el día. Sin pago en línea.")}</p>
              </div>
            ) : (
              <div className="text-white/80 leading-relaxed">
                <p className="font-semibold text-white">{pick(lang, "Contact details coming soon", "Datos de contacto próximamente")}</p>
                <p className="mt-2 text-sm">{pick(lang, "This is a preview — the business's phone is not published yet. Ask your designer for the details.", "Esto es una vista previa — el teléfono del negocio aún no está publicado. Pida los datos a su diseñador.")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 bg-[#050C08] text-white/60 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 justify-between">
          <span>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</span>
          <span>{brand.address || brand.city}</span>
        </div>
      </footer>
    </div>
  );
}
