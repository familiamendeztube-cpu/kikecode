import { useState } from "react";
import { Phone, Check, ArrowRight, MessageCircle, Calendar, CalendarCheck, Gauge, Fuel, Cog, Compass, Car, ChevronLeft, ChevronRight, Banknote, Search, RotateCw } from "lucide-react";
import type { BrandConfig, BrandPalette, Lang, TemplateInventory, InventoryVehicle } from "@/templates/types";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { whatsappLink } from "@/sites/shared/whatsapp";
import type { SiteProps } from "./ui";

/* ---------------------------------------------------------------- */
/* Dealership inventory — grid + "look inside" detail dialog          */
/* ---------------------------------------------------------------- */
function bodyLabel(b: InventoryVehicle["bodyStyle"], lang: Lang): string {
  const map = {
    SUV: { en: "SUV", es: "SUV" },
    Pickup: { en: "Pickup", es: "Pick-up" },
    Sedan: { en: "Sedan", es: "Sedán" },
  } as const;
  return map[b][lang];
}

export function InventorySection({ inv, lang, p, brand }: {
  inv: TemplateInventory; lang: Lang; p: BrandPalette; brand: BrandConfig;
}) {
  const [filter, setFilter] = useState<"all" | InventoryVehicle["bodyStyle"]>("all");
  const [selected, setSelected] = useState<InventoryVehicle | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const bodyTypes = Array.from(new Set(inv.vehicles.map((v) => v.bodyStyle)));
  const chips: ("all" | InventoryVehicle["bodyStyle"])[] = ["all", ...bodyTypes];
  const vehicles = filter === "all" ? inv.vehicles : inv.vehicles.filter((v) => v.bodyStyle === filter);

  const L = {
    eyebrow: lang === "en" ? "Our inventory" : "Nuestro inventario",
    all: lang === "en" ? "All" : "Todos",
    view: lang === "en" ? "View details" : "Ver detalles",
    lookInside: lang === "en" ? "Inside" : "Interior",
    year: lang === "en" ? "Year" : "Año",
    mileage: lang === "en" ? "Mileage" : "Kilometraje",
    transmission: lang === "en" ? "Transmission" : "Transmisión",
    fuel: lang === "en" ? "Fuel" : "Combustible",
    drivetrain: lang === "en" ? "Drivetrain" : "Tracción",
    body: lang === "en" ? "Type" : "Tipo",
    highlights: lang === "en" ? "Highlights" : "Características",
    whatsapp: lang === "en" ? "WhatsApp us" : "Consultar por WhatsApp",
    call: lang === "en" ? "Call now" : "Llamar",
    available: lang === "en" ? "Available" : "Disponible",
    finance: lang === "en" ? "Request financing" : "Solicitar financiamiento",
    visit: lang === "en" ? "Schedule a visit" : "Agendar una visita",
    view360: lang === "en" ? "360° view" : "Vista 360°",
    realPhotos: lang === "en" ? "Real photos of this vehicle" : "Fotos reales de este vehículo",
    photoOf: lang === "en" ? "Photo" : "Foto",
    prev: lang === "en" ? "Previous photo" : "Foto anterior",
    next: lang === "en" ? "Next photo" : "Foto siguiente",
  };

  function openVehicle(v: InventoryVehicle) { setSelected(v); setImgIndex(0); }
  function vehLabel(v: InventoryVehicle) {
    const yr = v.year ? ` ${v.year}` : "";
    return `${v.name}${yr}`;
  }
  function waLink(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'm interested in the ${vehLabel(v)} I saw on your website.`
      : `¡Hola! Me interesa el ${vehLabel(v)} que vi en su sitio web.`;
    return whatsappLink(brand, msg);
  }
  function waFinance(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'd like financing information for the ${vehLabel(v)}.`
      : `¡Hola! Quisiera información de financiamiento para el ${vehLabel(v)}.`;
    return whatsappLink(brand, msg);
  }
  function waVisit(v: InventoryVehicle) {
    const msg = lang === "en"
      ? `Hi! I'd like to schedule a visit to see the ${vehLabel(v)} in person.`
      : `¡Hola! Quisiera agendar una visita para ver el ${vehLabel(v)} en persona.`;
    return whatsappLink(brand, msg);
  }
  function stepImg(dir: 1 | -1) {
    if (!selected) return;
    const n = selected.images.length;
    setImgIndex((i) => (i + dir + n) % n);
  }

  const specs = selected ? [
    ...(selected.year ? [{ Icon: Calendar, label: L.year, value: String(selected.year) }] : []),
    ...(selected.mileage ? [{ Icon: Gauge, label: L.mileage, value: selected.mileage }] : []),
    ...(selected.transmission ? [{ Icon: Cog, label: L.transmission, value: selected.transmission[lang] }] : []),
    ...(selected.fuel ? [{ Icon: Fuel, label: L.fuel, value: selected.fuel[lang] }] : []),
    ...(selected.drivetrain ? [{ Icon: Compass, label: L.drivetrain, value: selected.drivetrain[lang] }] : []),
    { Icon: Car, label: L.body, value: bodyLabel(selected.bodyStyle, lang) },
  ] : [];

  return (
    <section id="inventory" className="py-20 sm:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          {brand.logo && (
            <img src={brand.logo} alt={brand.name} className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain bg-white/95 ring-1 ring-white/20 p-2 shadow-xl" />
          )}
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: p.accent }}>{L.eyebrow}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{inv.title[lang]}</h2>
          <p className="mt-4 text-white/70">{inv.blurb[lang]}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {chips.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                style={active
                  ? { backgroundColor: p.accent, color: "#111827", borderColor: p.accent }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                {c === "all" ? L.all : bodyLabel(c, lang)}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => openVehicle(v)}
              className="group text-left rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/10 hover:ring-white/25 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <img src={v.images[0]} alt={v.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">{v.year ? `${v.year} · ` : ""}{bodyLabel(v.bodyStyle, lang)}</span>
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: p.accent, color: "#111827" }}>{(v.status?.[lang]) ?? L.available}</span>
                {v.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">
                    <RotateCw className="w-3 h-3" /> {L.view360}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-bold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{v.name}</div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-extrabold" style={{ color: p.accent }}>{v.price}</span>
                  {v.priceUsd && <span className="text-xs text-white/45">{v.priceUsd}</span>}
                </div>
                {(() => {
                  const cells = [
                    v.mileage ? { Icon: Gauge, val: v.mileage } : null,
                    v.transmission ? { Icon: Cog, val: v.transmission[lang] } : null,
                    v.fuel ? { Icon: Fuel, val: v.fuel[lang] } : null,
                    v.drivetrain ? { Icon: Compass, val: v.drivetrain[lang] } : null,
                  ].filter((c): c is { Icon: typeof Gauge; val: string } => c !== null).slice(0, 3);
                  return cells.length > 0 ? (
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-white/65 mb-4">
                      {cells.map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1 min-w-0"><c.Icon className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{c.val}</span></span>
                      ))}
                    </div>
                  ) : <div className="mb-4" />;
                })()}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.accent }}>
                  {L.view} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null); }}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-white text-slate-900">
          {selected && (
            <div className="grid md:grid-cols-2">
              <div className="bg-slate-100">
                <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                  <img src={selected.images[imgIndex]} alt={`${selected.name} — ${L.photoOf} ${imgIndex + 1}`} className="w-full h-full object-cover" />
                  {selected.images.length > 1 && (
                    <>
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">
                        <RotateCw className="w-3.5 h-3.5" /> {L.view360}
                      </span>
                      <span className="absolute top-3 right-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-full bg-black/55 backdrop-blur ring-1 ring-white/15">{imgIndex + 1} / {selected.images.length}</span>
                      <button
                        type="button" onClick={() => stepImg(-1)} aria-label={L.prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      ><ChevronLeft className="w-5 h-5" /></button>
                      <button
                        type="button" onClick={() => stepImg(1)} aria-label={L.next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      ><ChevronRight className="w-5 h-5" /></button>
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white/90 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur">{L.realPhotos}</span>
                    </>
                  )}
                </div>
                {selected.images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto">
                    {selected.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setImgIndex(i)}
                        className="relative h-14 w-20 shrink-0 rounded-md overflow-hidden"
                        style={{ outline: i === imgIndex ? `2px solid ${p.primary}` : "2px solid transparent", outlineOffset: "-2px" }}
                      >
                        <img src={src} alt={`${selected.name} — ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col">
                <DialogTitle className="text-2xl font-extrabold tracking-tight pr-8">{selected.name}</DialogTitle>
                <DialogDescription className="sr-only">{selected.name}{selected.year ? ` ${selected.year}` : ""}</DialogDescription>
                <div className="flex items-baseline gap-2 mt-1 mb-5">
                  <span className="text-2xl font-extrabold" style={{ color: p.primary }}>{selected.price}</span>
                  {selected.priceUsd && <span className="text-sm text-slate-400">{selected.priceUsd}</span>}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                  {specs.map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <s.Icon className="w-4 h-4 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-wider text-slate-400">{s.label}</div>
                        <div className="font-semibold text-slate-800 truncate">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {selected.highlights[lang].length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{L.highlights}</div>
                    <ul className="space-y-1.5">
                      {selected.highlights[lang].map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: p.primary }} />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-auto space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a href={waLink(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}>
                      <MessageCircle className="w-4 h-4" /> {L.whatsapp}
                    </a>
                    <a href={brand.phoneHref} className="flex-1 inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: p.primary }}>
                      <Phone className="w-4 h-4" /> {L.call}
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a href={waFinance(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl border-2 transition-colors hover:bg-slate-50" style={{ borderColor: p.primary, color: p.primary }}>
                      <Banknote className="w-4 h-4" /> {L.finance}
                    </a>
                    <a href={waVisit(selected)} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl border-2 transition-colors hover:bg-slate-50" style={{ borderColor: p.primary, color: p.primary }}>
                      <CalendarCheck className="w-4 h-4" /> {L.visit}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* FINANCING / PERSONAL SOURCING BAND — dealership only */
export function FinancingBand({ template, brand, p, lang }: SiteProps) {
  const media = template.media;
  if (!template.inventory) return null;
  return (
    <section id="financing" className="relative overflow-hidden bg-slate-950 text-white">
      <img
        src={media?.gallery?.[5] ?? media?.gallery?.[media.gallery.length - 1] ?? media?.hero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${p.heroFrom}f2 0%, ${p.heroVia}d9 55%, ${p.heroTo}b3 100%)` }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          {brand.logo && (
            <img src={brand.logo} alt={brand.name} className="mx-auto mb-5 h-16 w-16 rounded-2xl object-contain bg-white/95 ring-1 ring-white/20 p-2 shadow-xl" />
          )}
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: p.accent }}>
            {lang === "en" ? "Financing & personal search" : "Financiamiento y búsqueda personalizada"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {lang === "en" ? "We make it easy to drive away happy" : "Le hacemos fácil estrenar vehículo"}
          </h2>
          <p className="mt-4 text-white/75">
            {lang === "en"
              ? "Flexible financing and a team that hunts down the exact vehicle you want — just tell us what you're looking for."
              : "Financiamiento flexible y un equipo que le busca el vehículo exacto que desea — solo díganos qué está buscando."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-6 flex flex-col">
            <div className="w-12 h-12 rounded-xl grid place-items-center mb-4 text-white" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl tracking-tight mb-1.5">
              {lang === "en" ? "Financing available" : "Financiamiento disponible"}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {lang === "en"
                ? "Options to fit your budget, with friendly guidance at every step and credit answers fast."
                : "Opciones a su presupuesto, con asesoría amable en cada paso y respuesta de crédito rápida."}
            </p>
            <a
              href={whatsappLink(brand, lang === "en" ? "Hi! I'd like to know about your financing options." : "¡Hola! Quisiera conocer sus opciones de financiamiento.")}
              target="_blank" rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" /> {lang === "en" ? "Ask about financing" : "Consultar financiamiento"}
            </a>
          </div>
          <div className="rounded-2xl bg-white/5 ring-1 ring-white/15 backdrop-blur p-6 flex flex-col">
            <div className="w-12 h-12 rounded-xl grid place-items-center mb-4 text-white" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl tracking-tight mb-1.5">
              {lang === "en" ? "We find your car for you" : "Le buscamos el carro"}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              {lang === "en"
                ? "Don't see it on the lot? Tell us the make, model, and budget and we'll track it down for you."
                : "¿No lo ve en el lote? Díganos marca, modelo y presupuesto y se lo conseguimos."}
            </p>
            <a
              href={whatsappLink(brand, lang === "en" ? "Hi! I'm looking for a specific vehicle. Can you help me find it?" : "¡Hola! Estoy buscando un vehículo en específico. ¿Me ayudan a encontrarlo?")}
              target="_blank" rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" /> {lang === "en" ? "Tell us what you want" : "Díganos qué busca"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* FLOATING WHATSAPP — dealership only, desktop (mobile uses the call bar) */
export function FloatingWhatsApp({ template, brand, lang }: SiteProps) {
  if (!template.inventory) return null;
  return (
    <a
      href={whatsappLink(brand, lang === "en" ? `Hi! I'm interested in a vehicle from ${brand.name}.` : `¡Hola! Me interesa un vehículo de ${brand.name}.`)}
      target="_blank" rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="hidden lg:inline-flex fixed bottom-6 left-6 z-40 items-center gap-2.5 text-white font-bold pl-3.5 pr-5 py-3 rounded-full shadow-2xl transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#25D366", boxShadow: "0 20px 40px -10px rgba(37,211,102,0.6)" }}
    >
      <MessageCircle className="w-5 h-5" /> WhatsApp
    </a>
  );
}
