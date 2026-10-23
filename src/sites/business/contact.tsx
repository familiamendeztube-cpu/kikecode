import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, MessageCircle, CheckCircle2, Send, Music2, Facebook, Instagram } from "lucide-react";
import { submitLead } from "@/lib/plw";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { SectionHeader, FormField, type SiteProps } from "./ui";
import { categoryExtraField } from "./data";

/* MID CTA BANNER */
export function MidCta({ template, brand, p, t, lang }: SiteProps) {
  const media = template.media;
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(115deg, ${p.heroFrom}, ${p.heroVia}, ${p.heroTo})` }}>
      {media?.hero && (
        <img src={media.hero} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
      )}
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${p.heroFrom}f2, ${p.heroTo}b3)` }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-white">
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
          {lang === "en" ? "Ready when you are — day or night" : "Listos cuando usted quiera — de día o de noche"}
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          {lang === "en"
            ? "Get a free, no-obligation estimate in minutes. Real people, real answers, in your language."
            : "Reciba un estimado gratis y sin compromiso en minutos. Personas reales, respuestas reales, en su idioma."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px] bg-white" style={{ color: p.primaryDark }}>
            {t.hero.cta1} <ArrowRight className="w-4 h-4" />
          </a>
          <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
            <Phone className="w-4 h-4" /> {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* PROJECT SELECTOR — interactive */
export function ProjectSelector({ template, p, lang }: SiteProps) {
  const [selProject, setSelProject] = useState<number | null>(null);
  if (!template.projectSelector?.options.length) return null;
  return (
    <section id="selector" className="py-20 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "Find your fit" : "Encuentre su opción"}
          title={lang === "en" ? template.projectSelector.title.en : template.projectSelector.title.es}
          blurb={lang === "en" ? template.projectSelector.blurb.en : template.projectSelector.blurb.es}
          accent={p.primary}
        />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {template.projectSelector.options.map((o, i) => {
            const active = selProject === i;
            return (
              <button
                key={o.en}
                type="button"
                aria-pressed={active}
                onClick={() => setSelProject(i)}
                className="text-sm font-semibold px-4 py-2.5 rounded-full border transition-colors"
                style={active
                  ? { backgroundColor: p.primary, borderColor: p.primary, color: "#fff" }
                  : { backgroundColor: "#fff", borderColor: "#e2e8f0", color: "#334155" }}
              >
                {lang === "en" ? o.en : o.es}
              </button>
            );
          })}
        </div>
        {selProject !== null && (
          <div className="mt-8 rounded-2xl border p-6 sm:p-8 text-center" style={{ borderColor: `${p.primary}40`, backgroundColor: `${p.primary}0D` }}>
            <div className="inline-flex items-center gap-2 font-bold mb-2" style={{ color: p.primary }}>
              <CheckCircle2 className="w-5 h-5" />
              {lang === "en" ? template.projectSelector.options[selProject]!.en : template.projectSelector.options[selProject]!.es}
            </div>
            <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
              {lang === "en" ? template.projectSelector.recommendation.en : template.projectSelector.recommendation.es}
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 mt-5 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
              {lang === "en" ? "Get a Free Estimate" : "Estimado Gratis"} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* INDUSTRY WOW BAND — food: order by WhatsApp */
export function FoodBand({ template, brand, lang }: SiteProps) {
  if (template.category !== "food") return null;
  return (
    <section className="py-14 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            {lang === "en" ? "Hungry? Order or reserve in seconds" : "¿Con hambre? Ordene o reserve en segundos"}
          </h3>
          <p className="mt-1 text-white/70">
            {lang === "en" ? "Message us on WhatsApp for pickup, delivery, or a table." : "Escríbanos por WhatsApp para recoger, entrega o una mesa."}
          </p>
        </div>
        <a
          href={whatsappLink(brand, lang === "en" ? `Hi ${brand.name}! I'd like to place an order.` : `¡Hola ${brand.name}! Quisiera hacer un pedido.`)}
          target="_blank" rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg text-white shadow-xl transition-transform hover:translate-y-[-2px]"
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="w-5 h-5" /> {lang === "en" ? "Order on WhatsApp" : "Ordenar por WhatsApp"}
        </a>
      </div>
    </section>
  );
}

/* INDUSTRY WOW BAND — emergency trades: 24/7 service */
export function EmergencyBand({ template, brand, p, lang }: SiteProps) {
  if (template.category !== "emergency") return null;
  return (
    <section className="py-14 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/15 shrink-0"><Clock className="w-7 h-7" /></span>
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {lang === "en" ? "Emergency? We answer fast" : "¿Emergencia? Respondemos rápido"}
            </h3>
            <p className="mt-1 text-white/80">
              {lang === "en" ? "Same-day and urgent service available — call or message now." : "Servicio el mismo día y urgencias disponibles — llame o escriba ahora."}
            </p>
          </div>
        </div>
        <a href={brand.phoneHref} className="shrink-0 inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-xl transition-transform hover:translate-y-[-2px]" style={{ color: p.primaryDark }}>
          <Phone className="w-5 h-5" /> {brand.phone}
        </a>
      </div>
    </section>
  );
}

export function Contact({ template, brand, p, t, lang }: SiteProps) {
  const extraField = categoryExtraField(template.category ?? "trades");
  const availability = template.availability;
  const [submitted, setSubmitted] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  return (
    <section id="contact" className="py-20 sm:py-24 text-white" style={{ background: `linear-gradient(135deg, ${p.contactFrom}, ${p.contactTo})` }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>{t.nav.contact}</div>
          <h2 className="font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight mb-4">{t.contact.title}</h2>
          <p className="text-white/90 mb-8 text-lg">{t.contact.blurb}</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><Phone className="w-5 h-5" style={{ color: p.accent }} /> <a href={brand.phoneHref} className="hover:underline">{brand.phone}</a></div>
            {brand.phoneAlt && (
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" style={{ color: p.accent }} /> <a href={brand.phoneAltHref ?? `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`} className="hover:underline">{brand.phoneAlt}</a></div>
            )}
            <div className="flex items-center gap-3"><Mail className="w-5 h-5" style={{ color: p.accent }} /> <a href={`mailto:${brand.email}`} className="hover:underline">{brand.email}</a></div>
            <div className="flex items-center gap-3"><MapPin className="w-5 h-5" style={{ color: p.accent }} /> {brand.address}</div>
            <div className="flex items-center gap-3"><Clock className="w-5 h-5" style={{ color: p.accent }} /> {availability ? availability[lang] : t.footer.hours}</div>
          </div>
        </div>

        <form
          className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const field = (key: string) => String(form.get(key) ?? "").trim();
            const extra = field("extra");
            const ok = await submitLead(template.plwSiteId, {
              name: field("name"),
              phone: field("phone"),
              service: field("service"),
              message: [extra && extraField ? `${extraField[lang]}: ${extra}` : "", field("message")].filter(Boolean).join("\n"),
            }, lang);
            setSendFailed(!ok);
            if (ok) setSubmitted(true);
          }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <p className="font-semibold">{t.contact.success}</p>
            </div>
          ) : (
            <>
              <FormField label={t.contact.name}>
                <input name="name" required className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
              </FormField>
              <FormField label={t.contact.phone}>
                <input name="phone" required type="tel" className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
              </FormField>
              <FormField label={t.contact.service}>
                <select name="service" className="w-full h-11 rounded-lg border border-slate-300 px-3 bg-white outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }}>
                  <option value="">{t.contact.pick}</option>
                  {t.contact.services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              {extraField && (
                <FormField label={lang === "en" ? extraField.en : extraField.es}>
                  <input name="extra" type={extraField.type} className="w-full h-11 rounded-lg border border-slate-300 px-3 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
                </FormField>
              )}
              <FormField label={t.contact.message}>
                <textarea name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2" style={{ ["--tw-ring-color" as never]: `${p.primary}40` }} />
              </FormField>
              {sendFailed && (
                <p className="text-sm text-red-600">
                  {lang === "en" ? "We couldn't send your request. Please call us instead." : "No pudimos enviar su solicitud. Por favor llámenos."}
                </p>
              )}
              <button type="submit" className="w-full h-12 rounded-lg text-white font-bold shadow-md transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
                {t.contact.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* CLOSING CTA — strong final ask on every template */
export function ClosingCta({ brand, p, lang }: SiteProps) {
  return (
    <section className="py-16 sm:py-20 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
          {lang === "en" ? "Ready to get started?" : "¿Listo para empezar?"}
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          {lang === "en"
            ? `Talk to ${brand.name} today — in English or Spanish. Free quote, no obligation.`
            : `Hable hoy con ${brand.name} — en inglés o español. Cotización gratis, sin compromiso.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={brand.phoneHref} className="inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-2xl transition-all hover:translate-y-[-2px]" style={{ color: p.primaryDark }}>
            <Phone className="w-4 h-4" /> {lang === "en" ? "Call now" : "Llamar ahora"}
          </a>
          <a
            href={whatsappLink(brand, lang === "en" ? `Hi! I'd like a free quote from ${brand.name}.` : `¡Hola! Quisiera una cotización gratis de ${brand.name}.`)}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg shadow-2xl text-white transition-all hover:translate-y-[-2px]"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-7 py-4 rounded-lg transition-colors">
            {lang === "en" ? "Request a quote" : "Solicitar cotización"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
export function Footer({ template, brand, p, t, lang }: SiteProps) {
  const availability = template.availability;
  const HeroIcon = brand.heroIcon;
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="w-11 h-11 rounded-full object-contain bg-white" />
            ) : (
              <div className="w-9 h-9 rounded-lg grid place-items-center text-white" style={{ backgroundColor: p.primary }}><HeroIcon className="w-5 h-5" /></div>
            )}
            <span className="font-bold text-white">{brand.name}</span>
          </div>
          <p className="text-sm text-slate-400">{t.footer.tagline}</p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.nav.services}</div>
          <ul className="space-y-2 text-sm">
            {t.services.items.map((s) => <li key={s.title}>{s.title}</li>)}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.nav.contact}</div>
          <ul className="space-y-2 text-sm">
            <li><a href={brand.phoneHref} className="hover:text-white">{brand.phone}</a></li>
            {brand.phoneAlt && (
              <li><a href={brand.phoneAltHref ?? `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`} className="hover:text-white">{brand.phoneAlt}</a></li>
            )}
            <li><a href={`mailto:${brand.email}`} className="hover:text-white">{brand.email}</a></li>
            <li>{brand.address}</li>
          </ul>
          {brand.socials && (brand.socials.tiktok || brand.socials.facebook || brand.socials.instagram) && (
            <div className="flex items-center gap-3 mt-4">
              {brand.socials.tiktok && (
                <a href={brand.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                  <Music2 className="w-4 h-4" />
                </a>
              )}
              {brand.socials.facebook && (
                <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {brand.socials.instagram && (
                <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.footer.hoursLabel}</div>
          <p className="text-sm">{availability ? availability[lang] : t.footer.hours}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
        <div>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</div>
        <div>{brand.city}</div>
      </div>
    </footer>
  );
}

/* MOBILE STICKY ACTION BAR — Call / WhatsApp / Quote */
export function MobileActionBar({ brand, p, lang }: SiteProps) {
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 grid grid-cols-3 gap-2 z-40">
      <a href={brand.phoneHref} className="text-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5" style={{ backgroundColor: p.primary, boxShadow: `0 18px 36px -12px ${p.primary}80` }}>
        <Phone className="w-4 h-4" /> {lang === "en" ? "Call" : "Llamar"}
      </a>
      <a
        href={whatsappLink(brand, lang === "en" ? `Hi! I'd like a free quote from ${brand.name}.` : `¡Hola! Quisiera una cotización gratis de ${brand.name}.`)}
        target="_blank" rel="noopener noreferrer"
        className="text-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5"
        style={{ backgroundColor: "#25D366", boxShadow: "0 18px 36px -12px rgba(37,211,102,0.5)" }}
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </a>
      <a href="#contact" className="text-slate-900 bg-white text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5 ring-1 ring-slate-200">
        <Send className="w-4 h-4" /> {lang === "en" ? "Quote" : "Cotizar"}
      </a>
    </div>
  );
}
