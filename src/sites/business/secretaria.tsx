import { Bot, Check, Link2, MessageCircle, Phone } from "lucide-react";
import { pick } from "@/lib/i18n";
import { SecretariaCard } from "@/sites/shared/secretaria-card";
import { secretaryToken } from "@/sites/shared/secretary-converse";
import { whatsappLink, WhatsAppButton } from "@/sites/shared/whatsapp";
import { Eyebrow, PRESS, type SiteProps } from "./ui";

/**
 * SECRETARIA IA — on a site whose template has it on (`secretaria`). Where it is shown decides
 * the card: a draft's preview link (`draftToken`) gets the live demo PLW runs (3 conversations
 * per link); the published site invites visitors to call or write; the editor and the gallery,
 * which have no link to count conversations against, say where to try it.
 */
export function SecretariaSection({ template, brand, p, lang, draftToken }: SiteProps & { draftToken?: string | null }) {
  if (!template.secretaria) return null;
  const published = !!template.plwSiteId && !draftToken;
  const features = published
    ? [
      pick(lang, "Answers any time, with the business's own information", "Le atiende a cualquier hora, con la información del negocio"),
      pick(lang, "Speaks Spanish, English and Chinese", "Habla español, inglés y chino"),
      pick(lang, "Takes your appointment or order request; the team confirms it", "Recibe su solicitud de cita o pedido; el equipo se la confirma"),
    ]
    : [
      pick(lang, "Answers with your business's information", "Responde con la información de su negocio"),
      pick(lang, "Speaks Spanish, English and Chinese", "Habla español, inglés y chino"),
      pick(lang, "Takes appointment and order requests, after hours too", "Toma solicitudes de cita y pedidos, también fuera de horario"),
    ];

  return (
    <section id="secretaria" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-2 items-center [&>*]:min-w-0">
        <div>
          <Eyebrow color={p.primary}>{pick(lang, "AI Secretary", "Secretaria IA")}</Eyebrow>
          <h2 className="text-balance font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900">
            {published
              ? pick(lang, "Call us, any time", "Llámenos a cualquier hora")
              : pick(lang, "A receptionist who looks after your customers", "Una recepcionista que atiende a sus clientes")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            {published
              ? pick(lang, `${brand.name}'s AI receptionist answers your call or message.`, `La recepcionista con IA de ${brand.name} atiende su llamada o mensaje.`)
              : pick(lang, `Try her: talk to her as a customer of ${brand.name} would.`, `Pruébela: hable con ella como lo haría un cliente de ${brand.name}.`)}
          </p>
          <ul className="mt-8 space-y-4">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-slate-800">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: p.primary }}>
                  <Check className="size-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-lg">
          {draftToken ? (
            <SecretariaCard
              previewToken={secretaryToken(draftToken)}
              businessName={brand.name}
              businessType={template.category ?? ""}
              standaloneLink={`/preview/${draftToken}/secretaria`}
            />
          ) : published ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid size-14 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: p.primaryDark }}>
                  <Bot className="size-7" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold leading-tight text-slate-900">{pick(lang, "AI receptionist", "Recepcionista con IA")}</p>
                  <p className="truncate text-sm text-slate-500">{brand.name}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {/* The number shows: on a computer a tel: link does nothing, so the visitor reads it. */}
                <a href={brand.phoneHref} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white shadow-md hover:opacity-90 ${PRESS}`} style={{ backgroundColor: p.primary }}>
                  <Phone className="size-4" /> {pick(lang, "Call", "Llamar al")} {brand.phone}
                </a>
                <WhatsAppButton
                  href={whatsappLink(brand, pick(lang, `Hi ${brand.name}! I have a question.`, `¡Hola ${brand.name}! Tengo una consulta.`))}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-bold text-white shadow-md ${PRESS}`}
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:p-8 text-slate-600">
              <div className="flex items-center gap-3 text-slate-900">
                <Bot className="size-6 shrink-0" style={{ color: p.primary }} />
                <p className="font-bold">{pick(lang, "The AI Secretary goes here", "Aquí va la Secretaria IA")}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                {pick(
                  lang,
                  "Save the draft and open its preview link: your client talks to her there (3 conversations per link). Once published, this card invites visitors to call.",
                  "Guarde el borrador y abra su enlace de vista previa: ahí su cliente habla con ella (3 conversaciones por enlace). Ya publicado, esta tarjeta invita a llamar.",
                )}
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Link2 className="size-3.5" /> {pick(lang, "Shown only to staff, never to visitors.", "Solo lo ve el personal, nunca los visitantes.")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
