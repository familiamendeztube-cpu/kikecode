import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check, ArrowRight, MessageCircle, CheckCircle2, Send, Music2, Facebook, Instagram } from "lucide-react";
import { leadOutcomeMessage, previewNotice, useLeadForm } from "@/sites/shared/lead-form";
import { whatsappLink, WhatsAppButton } from "@/sites/shared/whatsapp";
import { pick } from "@/lib/i18n";
import { SectionHeader, FormField, Eyebrow, PRESS, scrimFor, dimmed, onColor, type SiteProps } from "./ui";
import { categoryExtraField } from "./data";

/* PROJECT SELECTOR — interactive */
export function ProjectSelector({ template, p, lang }: SiteProps) {
  const [selProject, setSelProject] = useState<number | null>(null);
  if (!template.projectSelector?.options.length) return null;
  return (
    <section id="selector" className="py-20 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={pick(lang, "Find your fit", "Encuentre su opción")}
          title={template.projectSelector.title[lang]}
          blurb={template.projectSelector.blurb[lang]}
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
                {o[lang]}
              </button>
            );
          })}
        </div>
        {selProject !== null && (
          <div className="mt-8 rounded-2xl border p-6 sm:p-8 text-center" style={{ borderColor: `${p.primary}40`, backgroundColor: `${p.primary}0D` }}>
            <div className="inline-flex items-center gap-2 font-bold mb-2" style={{ color: p.primary }}>
              <CheckCircle2 className="w-5 h-5" />
              {template.projectSelector.options[selProject]![lang]}
            </div>
            <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed">
              {template.projectSelector.recommendation[lang]}
            </p>
            <a href="#contact" className={`inline-flex items-center justify-center gap-2 mt-5 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-90 ${PRESS}`} style={{ backgroundColor: p.primary }}>
              {pick(lang, "Request a Quote", "Solicite una Cotización")} <ArrowRight className="w-4 h-4" />
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
            {pick(lang, "Hungry? Order in seconds", "¿Con hambre? Pida en segundos")}
          </h3>
          <p className="mt-1 text-white/70">
            {pick(lang, "Message us on WhatsApp to order for pickup or delivery.", "Escríbanos por WhatsApp para pedir, recoger o recibir a domicilio.")}
          </p>
        </div>
        <WhatsAppButton
          href={whatsappLink(brand, pick(lang, `Hi ${brand.name}! I'd like to place an order.`, `¡Hola ${brand.name}! Quisiera hacer un pedido.`))}
          className={`shrink-0 inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg text-white shadow-xl hover:-translate-y-0.5 ${PRESS}`}
        >
          <MessageCircle className="w-5 h-5" /> {pick(lang, "Order on WhatsApp", "Ordenar por WhatsApp")}
        </WhatsAppButton>
      </div>
    </section>
  );
}

/* INDUSTRY WOW BAND — emergency trades: reach the business now (no promise of response times) */
export function EmergencyBand({ template, brand, p, lang }: SiteProps) {
  if (template.category !== "emergency") return null;
  return (
    <section className="py-14 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/15 shrink-0"><Clock className="w-7 h-7" /></span>
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {pick(lang, "Need help urgently?", "¿Necesita ayuda urgente?")}
            </h3>
            <p className="mt-1 text-white/80">
              {pick(lang, "Call or message us now and tell us what happened.", "Llámenos o escríbanos ahora y cuéntenos qué pasó.")}
            </p>
          </div>
        </div>
        <a href={brand.phoneHref} className={`shrink-0 inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-xl hover:-translate-y-0.5 ${PRESS}`} style={{ color: p.primaryDark }}>
          <Phone className="w-5 h-5" /> {brand.phone}
        </a>
      </div>
    </section>
  );
}

export function Contact({ template, brand, p, t, lang }: SiteProps) {
  const extraField = categoryExtraField(template.category ?? "trades");
  // 16px text: a smaller input makes iOS zoom the page on focus.
  const input = "w-full h-11 rounded-lg border border-slate-300 px-3 text-base outline-none focus:ring-2";
  const ring = { ["--tw-ring-color" as never]: p.primary };
  const availability = template.availability;
  const lead = useLeadForm(template.plwSiteId, lang);
  const outcome = leadOutcomeMessage(lead.state, lang, brand.phone);
  const icon = "w-5 h-5 shrink-0 mt-px";
  // A light brand color (amber, gold, cyan) under white text gets just enough dimming to read at 4.5:1.
  const scrim = Math.max(scrimFor(p.contactFrom), scrimFor(p.contactTo));
  const ink = onColor(p.accent, [dimmed(p.contactFrom, scrim), dimmed(p.contactTo, scrim)]);
  const overlay = scrim ? `linear-gradient(rgb(0 0 0 / ${scrim.toFixed(2)}), rgb(0 0 0 / ${scrim.toFixed(2)})), ` : "";
  return (
    // Two brand hues blended in sRGB go gray in the middle; oklab keeps the blend clean.
    // The flat color is the fallback where `in oklab` is not supported.
    <section id="contact" className="py-20 sm:py-24 text-white" style={{ backgroundColor: p.contactFrom, backgroundImage: `${overlay}linear-gradient(135deg in oklab, ${p.contactFrom}, ${p.contactTo})` }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Eyebrow color={ink}>{t.nav.contact}</Eyebrow>
          <h2 className="text-balance font-extrabold text-4xl sm:text-5xl leading-tight tracking-tight mb-4">{t.contact.title}</h2>
          <p className="text-white/90 mb-8 text-lg">{t.contact.blurb}</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3"><Phone className={icon} style={{ color: ink }} /> <a href={brand.phoneHref} className="hover:underline">{brand.phone}</a></div>
            {brand.phoneAlt && (
              <div className="flex items-start gap-3"><Phone className={icon} style={{ color: ink }} /> <a href={brand.phoneAltHref ?? `tel:${brand.phoneAlt.replace(/[^\d+]/g, "")}`} className="hover:underline">{brand.phoneAlt}</a></div>
            )}
            <div className="flex items-start gap-3"><Mail className={icon} style={{ color: ink }} /> <a href={`mailto:${brand.email}`} className="hover:underline break-all">{brand.email}</a></div>
            <div className="flex items-start gap-3"><MapPin className={icon} style={{ color: ink }} /> {brand.address}</div>
            <div className="flex items-start gap-3"><Clock className={icon} style={{ color: ink }} /> {availability ? availability[lang] : t.footer.hours}</div>
          </div>
        </div>

        <form
          className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const field = (key: string) => String(form.get(key) ?? "").trim();
            const extra = field("extra");
            await lead.submit({
              form: "contact",
              name: field("name"),
              phone: field("phone"),
              service: field("service"),
              message: [extra && extraField ? `${extraField[lang]}: ${extra}` : "", field("message")].filter(Boolean).join("\n"),
            });
          }}
        >
          {lead.state.status === "sent" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <p className="font-semibold">{t.contact.success}</p>
            </div>
          ) : (
            <>
              <FormField label={t.contact.name}>
                <input name="name" required className={input} style={ring} />
              </FormField>
              <FormField label={t.contact.phone}>
                <input name="phone" required type="tel" className={input} style={ring} />
              </FormField>
              <FormField label={t.contact.service}>
                <select name="service" className="w-full h-11 rounded-lg border border-slate-300 px-3 text-base bg-white outline-none focus:ring-2" style={ring}>
                  <option value="">{t.contact.pick}</option>
                  {t.contact.services.map((s) => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              {extraField && (
                <FormField label={extraField[lang]}>
                  <input name="extra" type={extraField.type} className={input} style={ring} />
                </FormField>
              )}
              <FormField label={t.contact.message}>
                <textarea name="message" rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base outline-none focus:ring-2" style={ring} />
              </FormField>
              {lead.isPreview && (
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">{previewNotice(lang)}</p>
              )}
              {outcome && (
                <p role={lead.state.status === "failed" ? "alert" : "status"} className={`text-sm ${lead.state.status === "failed" ? "text-red-600" : "text-amber-800"}`}>
                  {outcome}
                </p>
              )}
              <button type="submit" disabled={lead.sending} aria-busy={lead.sending} className={`w-full h-12 rounded-lg text-white font-bold shadow-md hover:opacity-90 disabled:opacity-60 disabled:cursor-wait ${PRESS}`} style={{ backgroundColor: p.primary }}>
                {lead.sending ? (lang === "en" ? "Sending…" : "Enviando…") : t.contact.submit}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* The WhatsApp greeting the closing band and the phone bar start with. Neutral,
   so it fits a barbershop or a bakery as well as a roofer. */
function hello(brand: SiteProps["brand"], lang: SiteProps["lang"]): string {
  return pick(lang, `Hi ${brand.name}! I have a question.`, `¡Hola ${brand.name}! Tengo una consulta.`);
}

/* CLOSING CTA — the last ask, after the form: call or message. */
export function ClosingCta({ brand, p, lang }: SiteProps) {
  return (
    <section className="py-16 sm:py-20 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-balance font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
          {pick(lang, "Questions? Talk to us", "¿Tiene preguntas? Hablemos")}
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
          {pick(lang, `Call or message ${brand.name.replace(/\.$/, "")} today.`, `Llame o escriba hoy a ${brand.name.replace(/\.$/, "")}.`)}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={brand.phoneHref} className={`inline-flex items-center justify-center gap-2 bg-white font-bold px-7 py-4 rounded-lg shadow-2xl hover:-translate-y-0.5 ${PRESS}`} style={{ color: p.primaryDark }}>
            <Phone className="w-4 h-4" /> {pick(lang, "Call now", "Llamar ahora")}
          </a>
          <WhatsAppButton
            href={whatsappLink(brand, hello(brand, lang))}
            className={`inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-lg shadow-2xl text-white hover:-translate-y-0.5 ${PRESS}`}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

/* FOOTER */
export function Footer({ template, brand, p, t, lang }: SiteProps) {
  const availability = template.availability;
  const HeroIcon = brand.heroIcon;
  const socials = [
    { href: brand.socials?.tiktok, label: "TikTok", Icon: Music2 },
    { href: brand.socials?.facebook, label: "Facebook", Icon: Facebook },
    { href: brand.socials?.instagram, label: "Instagram", Icon: Instagram },
  ].filter((s) => s.href);
  return (
    // Under lg the fixed action bar sits over the last 5rem of the page.
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-28 lg:pb-12">
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
          {socials.length > 0 && (
            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 grid place-items-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">{t.footer.hoursLabel}</div>
          <p className="text-sm">{availability ? availability[lang] : t.footer.hours}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
        <div>© {new Date().getFullYear()} {brand.name.replace(/\.$/, "")}. {t.footer.rights}</div>
        <div>{brand.city}</div>
      </div>
    </footer>
  );
}

/* MOBILE STICKY ACTION BAR — Call / WhatsApp / Quote */
export function MobileActionBar({ brand, p, t, lang }: SiteProps) {
  const button = `text-sm font-bold py-3.5 rounded-xl shadow-2xl flex items-center justify-center gap-1.5 ${PRESS}`;
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 grid grid-cols-3 gap-2 z-40 pb-[env(safe-area-inset-bottom)]">
      <a href={brand.phoneHref} className={`text-white ${button}`} style={{ backgroundColor: p.primary, boxShadow: `0 18px 36px -12px ${p.primary}80` }}>
        <Phone className="w-4 h-4" /> {pick(lang, "Call", "Llamar")}
      </a>
      <WhatsAppButton
        href={whatsappLink(brand, hello(brand, lang))}
        className={`text-white ${button}`}
        style={{ boxShadow: "0 18px 36px -12px rgba(37,211,102,0.5)" }}
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp
      </WhatsAppButton>
      {/* "Quote" fits a roofer, not a barbershop or a bakery: the form's own name fits all. */}
      <a href="#contact" className={`text-slate-900 bg-white ring-1 ring-slate-200 ${button}`}>
        <Send className="w-4 h-4" /> {t.nav.contact}
      </a>
    </div>
  );
}
