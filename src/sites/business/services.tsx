import { useState } from "react";
import { ChevronDown, MapPinned } from "lucide-react";
import { pick } from "@/lib/i18n";
import { SiteImage, SectionHeader, Eyebrow, CARD_ROW, type SiteProps } from "./ui";
import { resolveFacts } from "./data";

/* SERVICES */
export function Services({ template, p, t, lang }: SiteProps) {
  const media = template.media;
  return (
    <section id="services" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.services} title={t.services.title} blurb={t.services.blurb} accent={p.primary} eyebrowPath={["content", lang, "nav", "services"]} titlePath={["content", lang, "services", "title"]} blurbPath={["content", lang, "services", "blurb"]} />
        <div className={`${CARD_ROW} gap-6 mt-12`}>
          {t.services.items.map((s, i) => {
            const Icon = template.serviceIcons[i] ?? template.serviceIcons[0]!;
            const photo = media?.gallery[i] ?? media?.hero;
            return (
              <div key={s.title} className="group w-full md:w-[calc((100%-3rem)/3)] bg-white rounded-2xl overflow-hidden border border-slate-200">
                {photo && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={photo} alt={s.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
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
/* The facts strip near the top already shows the stats, so the crew section is
   the photo and its words only. No made-up initials standing in for real staff. */
export function MeetTheCrew({ template, brand, p, lang }: SiteProps) {
  const media = template.media;
  if (!media?.teamPortrait) return null;
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
          <SiteImage src={media.teamPortrait} alt={brand.name} palette={p} lang={lang} className="w-full h-full object-cover" />
        </div>
        <div>
          <Eyebrow color={p.primary}>
            {pick(lang, "Meet the team", "Conozca al equipo")}
          </Eyebrow>
          <h2 className="text-balance font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 mb-4">
            {pick(lang, `The team behind ${brand.name}`, `El equipo detrás de ${brand.name}`)}
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {pick(lang,
              `We're your neighbors in ${brand.city.split(",")[0]}, proud of our work and proud to serve our community.`,
              `Somos sus vecinos en ${brand.city.split(",")[0]}, orgullosos de nuestro trabajo y de servir a nuestra comunidad.`)}
          </p>
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
        <ol className={`${CARD_ROW} gap-x-5 gap-y-9 mt-12`}>
          {t.process.items.map((s, i) => (
            <li key={s.title} className="relative w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)] rounded-2xl p-6 bg-white/5 border border-white/10">
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
  // Only a template's own places: the default list fits no real town.
  const data = resolveFacts(template);
  if (!data || !template.facts?.areasEs) return null;
  const town = brand.city.split(",")[0]!.trim().replace(/ /g, "\u00a0"); // never "Santo / Domingo"
  return (
    <section id="areas" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={pick(lang, "Service area", "Área de servicio")}
          title={pick(lang, `Proudly serving ${town} & surrounding areas`, `Sirviendo con orgullo a ${town} y áreas cercanas`)}
          blurb={pick(lang,
            "Not on the list? Call and ask.",
            "¿No está en la lista? Llámenos y pregunte.")}
          accent={p.primary}
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {pick(lang, data.areasEn, data.areasEs).map((city) => (
            <div key={city} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
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
                <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="font-semibold text-slate-900">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`} />
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
