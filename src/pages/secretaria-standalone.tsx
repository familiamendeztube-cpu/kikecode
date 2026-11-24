import { useRoute } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, Bot, CalendarCheck, Languages, MessageCircle, MessageSquareText, Phone } from "lucide-react";
import NotFound from "@/pages/not-found";
import { StatusScreen } from "@/components/status-screen";
import { SecretariaCard } from "@/sites/shared/secretaria-card";
import { secretaryToken } from "@/sites/shared/secretary-converse";
import { PLW_WHATSAPP, waLink, WhatsAppButton } from "@/sites/shared/whatsapp";
import { PRESS } from "@/sites/business/ui";
import { usePublishedSite } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/templates/types";

/** Clean strings the Secretaria card may show (from overrides.tourismDemo.secretary). */
function secretaryNames(template: BusinessTemplate): { name: string; type: string } {
  const s = template.tourismDemo?.secretary;
  const name = typeof s?.businessName === "string" ? s.businessName.replace(/[<>]/g, "").trim().slice(0, 60) : "";
  const type = typeof s?.businessType === "string" ? s.businessType.replace(/[<>]/g, "").trim().slice(0, 60) : "";
  return { name: name || template.brand.name, type: type || template.category || "" };
}

/** What the full Secretaria IA does: PLW's product, as the live demo agent shows it. */
const FEATURES = [
  { icon: MessageSquareText, title: "Responde con la información de su negocio", blurb: "Servicios, ubicación y preguntas frecuentes, sin inventar nada." },
  { icon: Languages, title: "Habla español, inglés y chino", blurb: "Atiende a cada cliente en su idioma." },
  { icon: CalendarCheck, title: "Toma solicitudes de cita y pedidos", blurb: "También fuera de horario; usted confirma después." },
];

/** The standalone Secretaria IA presentation for a preview link: a PLW sample's or a Kike draft's. */
export default function SecretariaStandalone() {
  const [, params] = useRoute("/preview/:token/secretaria");
  const token = params?.token ?? "";
  const site = usePublishedSite({ preview: token });

  useEffect(() => {
    const robots = Object.assign(document.createElement("meta"), { name: "robots", content: "noindex, nofollow" });
    document.head.append(robots);
    return () => robots.remove();
  }, []);

  if (!token) return <NotFound />;
  if (site?.status === "notfound") return <NotFound />;
  if (site?.status === "disabled") {
    return <StatusScreen title="Esta presentación ya no está disponible" detail="This presentation is no longer available." />;
  }
  if (!site) return <StatusScreen kind="loading" title="Cargando… / Loading…" />;
  if (site.status === "error") {
    return <StatusScreen kind="error" title="No se pudo cargar la presentación / Could not load this presentation" detail={site.message} />;
  }
  const { name, type } = secretaryNames(site.template);
  return (
    <div className="min-h-dvh bg-[#FAF7F0] text-[#1C241E] antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header className="relative overflow-hidden bg-[#0A1F13] text-white">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-[#E8B04B]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-56 -left-32 size-[32rem] rounded-full bg-[#1F5E3B]/50 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 pb-32 pt-6 sm:px-6 sm:pb-40">
          <a href={`/preview/${token}`} className={`-ml-3 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white ${PRESS}`}>
            <ArrowLeft className="size-4" /> Ver el sitio web
          </a>
          <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8B04B]">
            <Bot className="size-3.5" /> Secretaria IA
          </p>
          <h1 className="mt-5 max-w-3xl font-editorial text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{name}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">Hable con su recepcionista con IA como lo haría uno de sus clientes.</p>
        </div>
      </header>

      <main className="relative mx-auto -mt-24 grid max-w-5xl [&>*]:min-w-0 items-start gap-10 px-4 pb-20 sm:-mt-28 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <SecretariaCard previewToken={secretaryToken(token)} businessName={name} businessType={type} />

        <aside className="lg:pt-32">
          <h2 className="font-editorial text-2xl tracking-tight sm:text-3xl">Lo que hace su secretaria</h2>
          <ul className="mt-6 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1F5E3B]/10 text-[#1F5E3B]">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold leading-snug">{f.title}</p>
                  <p className="mt-1 text-sm text-[#3D4A40]">{f.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-[#1F5E3B]/15 bg-white p-5">
            <p className="font-semibold">¿Quiere una secretaria así para su negocio?</p>
            <p className="mt-1 text-sm text-[#3D4A40]">Contáctenos en Professional Latino Workers.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <WhatsAppButton
                href={waLink(PLW_WHATSAPP, `¡Hola! Probé la Secretaria IA de "${name}" y quisiera más información.`)}
                className={`inline-flex h-11 items-center gap-2 rounded-full px-5 font-semibold text-white ${PRESS}`}
              >
                <MessageCircle className="size-4" /> WhatsApp
              </WhatsAppButton>
              <a href="tel:+50640106198" className={`inline-flex h-11 items-center gap-2 rounded-full bg-[#1F5E3B] px-5 font-semibold text-white hover:bg-[#287549] ${PRESS}`}>
                <Phone className="size-4" /> 4010-6198
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
