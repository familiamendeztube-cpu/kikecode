import { Phone, ShieldCheck, Star, Check, BadgeCheck, Award, CheckCircle2 } from "lucide-react";
import { SectionHeader, GoogleG, YelpBadge, type SiteProps } from "./ui";
import { OFFER_ICONS, REVIEW_AVATARS, REVIEW_PLATFORMS, REVIEW_DATES, EXTRA_REVIEWS, TRUST_SIGNALS, resolveFacts } from "./data";

/* STATS STRIP */
export function StatsStrip({ template, p, lang }: SiteProps) {
  const data = resolveFacts(template);
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {data.stats.map((s) => (
          <div key={s.value} className="text-center flex flex-col">
            <div className="font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight flex items-center justify-center min-h-[2.5rem] sm:min-h-[3.25rem]" style={{ color: p.primary }}>{lang === "es" && s.valueEs ? s.valueEs : s.value}</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">{lang === "en" ? s.labelEn : s.labelEs}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* UNIVERSAL TRUST STRIP — always shown, generic & honest */
export function TrustStrip({ p, lang }: SiteProps) {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
        {TRUST_SIGNALS.map((s) => (
          <div key={s.en} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="grid place-items-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${p.primary}14`, color: p.primary }}>
              <s.Icon className="w-4 h-4" />
            </span>
            {lang === "en" ? s.en : s.es}
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
          eyebrow={lang === "en" ? "What we offer" : "Lo que ofrecemos"}
          title={lang === "en" ? "Everything you need, around the clock" : "Todo lo que necesitas, a toda hora"}
          blurb={lang === "en"
            ? "Real humans, real availability — no robots, no bots, no waiting on hold."
            : "Personas reales, disponibilidad real — sin robots, sin bots, sin esperas."}
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
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: p.accent }}>
            {lang === "en" ? "Our promise" : "Nuestra promesa"}
          </div>
          <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight mb-2">
            {lang === "en" ? data.guaranteeEn.title : data.guaranteeEs.title}
          </h3>
          <p className="text-white/90 leading-relaxed">
            {lang === "en" ? data.guaranteeEn.blurb : data.guaranteeEs.blurb}
          </p>
        </div>
        <a href={brand.phoneHref} className="shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity">
          <Phone className="w-4 h-4" /> {brand.phone}
        </a>
      </div>
    </section>
  );
}

/* TESTIMONIALS */
export function Testimonials({ template, p, t, lang }: SiteProps) {
  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow={t.nav.testimonials} title={t.testimonials.title} accent={p.primary} eyebrowPath={["content", lang, "nav", "testimonials"]} titlePath={["content", lang, "testimonials", "title"]} />

        {/* aggregate rating + platform trust — hidden for real named businesses (no fabricated ratings/counts) */}
        {!template.realBusiness && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-extrabold text-slate-900">4.9</div>
            <div>
              <div className="flex gap-0.5 text-amber-500">{[0,1,2,3,4].map((i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}</div>
              <div className="text-xs text-slate-500 mt-0.5">{lang === "en" ? "240+ verified reviews" : "240+ reseñas verificadas"}</div>
            </div>
          </div>
          <div className="hidden sm:block h-10 w-px bg-slate-200" />
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-sm text-sm font-semibold text-slate-700">
              <GoogleG /> 4.9 <span className="text-slate-400 font-normal">· Google</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5 shadow-sm text-sm font-semibold text-slate-700">
              <YelpBadge /> 4.8 <span className="text-slate-400 font-normal">· Yelp</span>
            </span>
          </div>
        </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {(template.realBusiness ? t.testimonials.items : [...t.testimonials.items, ...EXTRA_REVIEWS[lang]]).map((tt, i) => {
            const isProtectedReview = template.realBusiness;
            const avatar = REVIEW_AVATARS[i % REVIEW_AVATARS.length];
            const platform = REVIEW_PLATFORMS[i % REVIEW_PLATFORMS.length];
            const date = REVIEW_DATES[lang][i % REVIEW_DATES[lang].length];
            return (
              <figure key={tt.name} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={avatar} alt={tt.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" loading="lazy" />
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1 text-slate-900">{tt.name} {!isProtectedReview && <BadgeCheck className="w-3.5 h-3.5 text-sky-500" />}</div>
                      <div className="text-xs text-slate-500">{tt.role}</div>
                    </div>
                  </div>
                  {!isProtectedReview && (platform === "Google" ? <GoogleG className="w-5 h-5" /> : <YelpBadge />)}
                </div>
                {!isProtectedReview && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5 text-amber-500">{[0,1,2,3,4].map((s) => <Star key={s} className="w-4 h-4 fill-amber-500" />)}</div>
                  <span className="text-xs text-slate-400">{date}</span>
                </div>
                )}
                <blockquote className="text-slate-700 leading-relaxed text-sm flex-1">“{tt.quote}”</blockquote>
                <figcaption className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {isProtectedReview
                    ? (lang === "en" ? "Customer feedback" : "Comentario de cliente")
                    : (lang === "en" ? `Verified ${platform} review` : `Reseña verificada de ${platform}`)}
                </figcaption>
              </figure>
            );
          })}
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
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: p.primary }}>
            {lang === "en" ? "Trust & Credentials" : "Confianza y Credenciales"}
          </div>
          <h3 className="font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900">
            {lang === "en" ? "Licensed, insured, and proudly certified" : "Con licencia, seguro y orgullosamente certificados"}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {(lang === "en" ? data.certsEn : data.certsEs).map((c) => (
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
