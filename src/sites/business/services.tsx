import { useState } from "react";
import { ChevronDown, BadgeCheck, MapPinned, CheckCircle2, X } from "lucide-react";
import { SiteImage, SectionHeader, type SiteProps } from "./ui";
import { resolveFacts } from "./data";

/* SERVICES */
export function Services({ template, p, t, lang }: SiteProps) {
  const media = template.media;
  return (
    <section id="services" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.services} title={t.services.title} blurb={t.services.blurb} accent={p.primary} eyebrowPath={["content", lang, "nav", "services"]} titlePath={["content", lang, "services", "title"]} blurbPath={["content", lang, "services", "blurb"]} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {t.services.items.map((s, i) => {
            const Icon = template.serviceIcons[i] ?? template.serviceIcons[0]!;
            const photo = media?.gallery[i] ?? media?.hero;
            return (
              <div key={s.title} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                {photo && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={photo} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>
                )}
                <div className="p-7">
                  <div className={`w-12 h-12 rounded-xl grid place-items-center mb-5 relative bg-white shadow-md ring-1 ring-slate-100 ${photo ? "-mt-12" : ""}`} style={{ color: p.primary }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.blurb}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* MEET THE CREW */
export function MeetTheCrew({ template, brand, p, lang }: SiteProps) {
  const media = template.media;
  const data = resolveFacts(template);
  if (!media?.teamPortrait) return null;
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr,1.1fr] gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <SiteImage src={media.teamPortrait} alt={brand.name} palette={p} lang={lang} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 sm:left-8 sm:right-auto bg-white rounded-2xl shadow-xl px-5 py-4 ring-1 ring-slate-100 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["A", "M", "J"].map((c) => (
                <span key={c} className="w-8 h-8 rounded-full border-2 border-white grid place-items-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>{c}</span>
              ))}
            </div>
            <div className="text-xs leading-tight">
              <div className="font-extrabold text-slate-900">{lang === "en" ? "Your local crew" : "Su equipo local"}</div>
              <div className="text-slate-500">{lang === "en" ? "ready to help today" : "listos para ayudar hoy"}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.primary }}>
            {lang === "en" ? "Meet the team" : "Conozca al equipo"}
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 mb-4">
            {lang === "en" ? "A local team that actually shows up" : "Un equipo local que sí llega"}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-7 text-lg">
            {lang === "en"
              ? `We're your neighbors in ${brand.city.split(",")[0]} — proud of our work and proud to serve our community. When you call ${brand.name}, you get real people who care about doing the job right.`
              : `Somos sus vecinos en ${brand.city.split(",")[0]} — orgullosos de nuestro trabajo y de servir a nuestra comunidad. Cuando llama a ${brand.name}, le contesta gente de verdad que se preocupa por hacer bien el trabajo.`}
          </p>
          {data && (
            <div className="grid sm:grid-cols-3 gap-4">
              {data.stats.slice(0, 3).map((s) => (
                <div key={s.value} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <div className="font-extrabold text-2xl tracking-tight" style={{ color: p.primary }}>{lang === "es" && s.valueEs ? s.valueEs : s.value}</div>
                  <div className="text-xs text-slate-600 mt-1">{lang === "en" ? s.labelEn : s.labelEs}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* WHY */
export function Why({ template, p, t, lang }: SiteProps) {
  return (
    <section id="why" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.why} title={t.why.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "why"]} titlePath={["content", lang, "why", "title"]} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {t.why.items.map((w, i) => {
            const Icon = template.whyIcons[i] ?? template.whyIcons[0]!;
            return (
              <div key={w.title} className="rounded-2xl p-6 bg-white border border-slate-200">
                <div className="w-11 h-11 rounded-lg grid place-items-center mb-4" style={{ backgroundColor: p.heroFrom, color: p.accent }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold mb-1.5">{w.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{w.blurb}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* PROCESS */
export function Process({ p, t, lang }: SiteProps) {
  return (
    <section id="process" className="py-20 sm:py-24 text-white" style={{ background: `linear-gradient(135deg, ${p.heroFrom}, ${p.heroTo})` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.process} title={t.process.title} dark accent={p.accent} eyebrowPath={["content", lang, "nav", "process"]} titlePath={["content", lang, "process", "title"]} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {t.process.items.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur">
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-xl text-white grid place-items-center font-extrabold shadow-lg" style={{ backgroundColor: p.primary }}>
                {i + 1}
              </div>
              <h4 className="font-bold mt-4 mb-1.5">{s.title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{s.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* SERVICE AREAS */
export function ServiceAreas({ template, brand, p, lang }: SiteProps) {
  const data = resolveFacts(template);
  return (
    <section id="areas" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "Service area" : "Área de servicio"}
          title={lang === "en" ? `Proudly serving ${brand.city.split(",")[0]} & surrounding areas` : `Sirviendo con orgullo a ${brand.city.split(",")[0]} y áreas cercanas`}
          blurb={lang === "en"
            ? "Same-day arrival across our service area. Not on the list? Call — we probably still come out."
            : "Llegada el mismo día en toda nuestra área. ¿No está en la lista? Llama — probablemente vamos."}
          accent={p.primary}
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {(lang === "en" ? data.areasEn : data.areasEs).map((city) => (
            <div key={city} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:shadow-md transition-shadow">
              <MapPinned className="w-4 h-4 shrink-0" style={{ color: p.primary }} />
              <span className="text-sm font-medium text-slate-700">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* WHY CHOOSE US — comparison */
export function Comparison({ brand, p, lang }: SiteProps) {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={lang === "en" ? "The difference" : "La diferencia"}
          title={lang === "en" ? `Why neighbors choose ${brand.name}` : `Por qué los vecinos eligen ${brand.name}`}
          accent={p.primary}
        />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border-2 p-7 sm:p-8 shadow-xl bg-white" style={{ borderColor: p.primary }}>
            <div className="inline-flex items-center gap-2 font-extrabold text-lg mb-5" style={{ color: p.primary }}>
              <BadgeCheck className="w-6 h-6" /> {brand.name}
            </div>
            <ul className="space-y-3.5">
              {(lang === "en"
                ? ["A real person answers 24/7 — in English or Spanish", "Upfront, written pricing before we start", "Licensed, insured & background-checked crew", "Photos and updates throughout the job", "Satisfaction guarantee on every visit", "Same-week — often same-day — scheduling"]
                : ["Una persona real contesta 24/7 — en inglés o español", "Precio claro y por escrito antes de empezar", "Equipo con licencia, seguro y antecedentes verificados", "Fotos y avisos durante todo el trabajo", "Garantía de satisfacción en cada visita", "Citas la misma semana — muchas veces el mismo día"]
              ).map((li) => (
                <li key={li} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: p.primary }} />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <div className="inline-flex items-center gap-2 font-bold text-lg mb-5 text-slate-400">
              <X className="w-6 h-6" /> {lang === "en" ? "The other guys" : "Los demás"}
            </div>
            <ul className="space-y-3.5">
              {(lang === "en"
                ? ["Voicemail, missed calls, no callback", "Surprise charges added after the work", "Unverified, uninsured subcontractors", "Radio silence once they leave", "You're on your own if something goes wrong", "Two-week waits just for an appointment"]
                : ["Buzón de voz, llamadas perdidas, sin respuesta", "Cargos sorpresa después del trabajo", "Subcontratistas sin verificar ni seguro", "Cero comunicación cuando se van", "Si algo sale mal, te dejan solo", "Esperas de dos semanas solo para una cita"]
              ).map((li) => (
                <li key={li} className="flex items-start gap-3 text-slate-400">
                  <X className="w-5 h-5 mt-0.5 shrink-0" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FAQ */
export function Faq({ p, t, lang }: SiteProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.faq} title={t.faq.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "faq"]} titlePath={["content", lang, "faq", "title"]} />
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {t.faq.items.map((it, i) => {
            const open = openFaq === i;
            return (
              <div key={it.q}>
                <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="font-semibold text-slate-900">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <p className="pb-5 text-slate-600 leading-relaxed">{it.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
