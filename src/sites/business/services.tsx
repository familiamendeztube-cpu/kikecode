import { useState } from "react";
import { ChevronDown, MapPinned } from "lucide-react";
import { pick } from "@/lib/i18n";
import { SiteImage, SectionHeader, Eyebrow, SampleTag, isSampleContent, type SiteProps } from "./ui";
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
              <div className="font-extrabold text-slate-900">{pick(lang, "Your local crew", "Su equipo local")}</div>
            </div>
          </div>
        </div>
        <div>
          <Eyebrow color={p.primary}>
            {pick(lang, "Meet the team", "Conozca al equipo")}
          </Eyebrow>
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 mb-4">
            {pick(lang, `The team behind ${brand.name}`, `El equipo detrás de ${brand.name}`)}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-7 text-lg">
            {pick(lang,
              `We're your neighbors in ${brand.city.split(",")[0]}, proud of our work and proud to serve our community.`,
              `Somos sus vecinos en ${brand.city.split(",")[0]}, orgullosos de nuestro trabajo y de servir a nuestra comunidad.`)}
          </p>
          {isSampleContent(template) && <SampleTag lang={lang} className="mb-3" />}
          {data && (
            <div className="grid sm:grid-cols-3 gap-4">
              {data.stats.slice(0, 3).map((s) => (
                <div key={s.value} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <div className="font-extrabold text-2xl tracking-tight" style={{ color: p.primary }}>{pick(lang, s.value, s.valueEs || s.value)}</div>
                  <div className="text-xs text-slate-600 mt-1">{pick(lang, s.labelEn, s.labelEs)}</div>
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
          eyebrow={pick(lang, "Service area", "Área de servicio")}
          title={pick(lang, `Proudly serving ${brand.city.split(",")[0]} & surrounding areas`, `Sirviendo con orgullo a ${brand.city.split(",")[0]} y áreas cercanas`)}
          blurb={pick(lang,
            "Same-day arrival across our service area. Not on the list? Call — we probably still come out.",
            "Llegada el mismo día en toda nuestra área. ¿No está en la lista? Llama — probablemente vamos.")}
          accent={p.primary}
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pick(lang, data.areasEn, data.areasEs).map((city) => (
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
