import { Phone, ShieldCheck, Check, Award, MessageSquareQuote } from "lucide-react";
import { pick } from "@/lib/i18n";
import { SectionHeader, SampleTag, isSampleContent, Eyebrow, type SiteProps } from "./ui";
import { OFFER_ICONS, TRUST_SIGNALS, resolveFacts } from "./data";

/* STATS STRIP */
export function StatsStrip({ template, p, lang }: SiteProps) {
  const data = resolveFacts(template);
  return (
    <section className="bg-white border-b border-slate-200">
      {isSampleContent(template) && <div className="pt-4 text-center"><SampleTag lang={lang} /></div>}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {data.stats.map((s) => (
          <div key={s.value} className="text-center flex flex-col">
            <div className="font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight flex items-center justify-center min-h-[2.5rem] sm:min-h-[3.25rem]" style={{ color: p.primary }}>{pick(lang, s.value, s.valueEs || s.value)}</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">{pick(lang, s.labelEn, s.labelEs)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* UNIVERSAL TRUST STRIP — generic promises, tagged as samples until the business confirms them */
export function TrustStrip({ template, p, lang }: SiteProps) {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
        {isSampleContent(template) && <SampleTag lang={lang} />}
        {TRUST_SIGNALS.map((s) => (
          <div key={s.en} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="grid place-items-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${p.primary}14`, color: p.primary }}>
              <s.Icon className="w-4 h-4" />
            </span>
            {s[lang]}
          </div>
        ))}
      </div>
    </section>
  );
}

/* WHAT WE OFFER */
export function Offers({ template, p, lang }: SiteProps) {
  const offers = template.offers?.[lang];
  if (!offers) return null;
  return (
    <section id="offers" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow={pick(lang, "What we offer", "Lo que ofrecemos")}
          title={pick(lang, "Everything you need", "Todo lo que necesitas")}
          accent={p.primary}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {offers.map((o) => {
            const Icon = OFFER_ICONS[o.icon] ?? Check;
            return (
              <div key={o.title} className="rounded-2xl p-6 bg-white border border-slate-200 hover:shadow-lg transition-shadow flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl grid place-items-center" style={{ backgroundColor: `${p.primary}1A`, color: p.primary }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold tracking-tight mb-1">{o.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{o.blurb}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* GUARANTEE CALLOUT */
export function Guarantee({ template, brand, p, lang }: SiteProps) {
  const data = resolveFacts(template);
  return (
    <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${p.primaryDark}, ${p.primary})` }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
        <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/15 grid place-items-center">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <Eyebrow color={p.accent} className="mb-2">
            {pick(lang, "Our promise", "Nuestra promesa")}
          </Eyebrow>
          {isSampleContent(template) && <SampleTag lang={lang} className="mb-2" />}
          <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
            {pick(lang, data.guaranteeEn.title, data.guaranteeEs.title)}
          </h3>
          <p className="text-white/90 leading-relaxed">
            {pick(lang, data.guaranteeEn.blurb, data.guaranteeEs.blurb)}
          </p>
        </div>
        <a href={brand.phoneHref} className="shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity">
          <Phone className="w-4 h-4" /> {brand.phone}
        </a>
      </div>
    </section>
  );
}

/*
  TESTIMONIALS — only the reviews in the site's content, as written. No rating,
  platform, date, avatar or "verified" mark is ever added: the site has no
  source for any of them. A generic template's reviews (and any the AI wrote)
  are samples, tagged as such until staff confirm them with the business.
*/
export function Testimonials({ template, p, t, lang }: SiteProps) {
  const sample = isSampleContent(template);
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.testimonials} title={t.testimonials.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "testimonials"]} titlePath={["content", lang, "testimonials", "title"]} />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {t.testimonials.items.map((tt, i) => (
            <figure key={`${tt.name}-${i}`} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
              {sample && <SampleTag lang={lang} className="self-start mb-3" />}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full grid place-items-center text-white font-extrabold shrink-0" style={{ backgroundColor: p.primary }}>
                  {tt.name.trim().charAt(0).toUpperCase() || <MessageSquareQuote className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{tt.name}</div>
                  <div className="text-xs text-slate-500">{tt.role}</div>
                </div>
              </div>
              <blockquote className="text-slate-700 leading-relaxed text-sm flex-1">“{tt.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CERTIFICATIONS */
export function Certifications({ template, p, lang }: SiteProps) {
  const data = resolveFacts(template);
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <Eyebrow color={p.primary} className="mb-2">
            {pick(lang, "Why choose us", "Por qué elegirnos")}
          </Eyebrow>
          <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
            {pick(lang, "What you can count on", "Con lo que puede contar")}
          </h3>
          {isSampleContent(template) && <SampleTag lang={lang} className="mt-3" />}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pick(lang, data.certsEn, data.certsEs).map((c) => (
            <div key={c} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 flex flex-col items-center text-center gap-2 hover:bg-white hover:shadow-md transition-all">
              <Award className="w-5 h-5" style={{ color: p.primary }} />
              <span className="text-xs font-semibold text-slate-700 leading-snug">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
