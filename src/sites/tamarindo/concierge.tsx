import { useEffect, useRef, useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUp, Calculator, ChevronDown, Mail, MessageCircle, MessagesSquare, Phone, X } from "lucide-react";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { answer, suggestions, type Reply } from "./answers";
import { usd } from "./quote";
import { EASE, EXTERNAL, Photo, PRESS, siteVars, useScrolledPast, useSectionInView } from "./ui";

/*
  The concierge: one floating button (wide screens) that opens the ways to
  reach Willy — the chat, the quote builder, WhatsApp, a call, an email —
  instead of a stack of separate bubbles. Phones get the same actions in the
  bottom bar (tamarindo-site.tsx). The chat answers from answers.ts.
*/

type Msg = { from: "you" | "bot"; text: string; reply?: Reply; question?: string };

function Avatar({ template, size = "size-10" }: { template: BusinessTemplate; size?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-white/20 ${size}`}>
      {template.brand.logo && <img src={template.brand.logo} alt="" className="size-full translate-y-[6%] scale-[1.36] object-cover" />}
    </span>
  );
}

export function ConciergeDock({ template, lang, onChat, onQuote }: {
  template: BusinessTemplate;
  lang: Lang;
  onChat: () => void;
  onQuote: () => void;
}) {
  // Out of the way over the contact section, which has every one of these actions itself.
  const atContact = useSectionInView("contact");
  const shown = useScrolledPast(0.6) && !atContact;
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!shown) setOpen(false); }, [shown]);
  const { brand } = template;
  const hours = template.content[lang].footer.hours;

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);

  const items = [
    { icon: MessagesSquare, tone: "bg-(--teal) text-white", label: pick(lang, "Ask a question", "Haga una pregunta"), sub: pick(lang, "Instant answers", "Respuestas al instante"), onClick: onChat },
    { icon: Calculator, tone: "bg-(--sun) text-(--navy)", label: pick(lang, "Get my quote", "Cotizar mi tour"), sub: pick(lang, "Your price in a minute", "Su precio en un minuto"), onClick: onQuote },
    { icon: MessageCircle, tone: "bg-[#25D366] text-white", label: "WhatsApp", sub: brand.phone, href: whatsappLink(brand, pick(lang, "Hi Willy! I'd like to ask about a private tour.", "¡Hola Willy! Quisiera consultar por un tour privado.")), external: true },
    { icon: Phone, tone: "bg-(--sea) text-white", label: pick(lang, "Call", "Llamar"), sub: brand.phone, href: brand.phoneHref },
    ...(brand.email ? [{ icon: Mail, tone: "bg-white text-(--sea) ring-1 ring-(--ink)/10", label: "Email", sub: brand.email, href: `mailto:${brand.email}` }] : []),
  ];

  return (
    <div
      ref={box}
      className={`fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 transition-[opacity,translate] duration-700 md:flex ${EASE} ${shown ? "" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <div
        id="tt-dock-menu"
        className={`w-72 origin-bottom-right rounded-3xl bg-white p-2 text-(--ink) shadow-[0_30px_70px_-25px_rgba(6,24,42,.55)] ring-1 ring-(--ink)/5 transition-[opacity,scale,translate] duration-500 ${EASE} ${
          open ? "" : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-2xl bg-(--navy) p-3 text-white">
          <Avatar template={template} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{brand.name}</p>
            {hours && <p className="truncate text-xs text-white/60">{hours}</p>}
          </div>
        </div>
        <ul className="mt-1">
          {items.map((it, i) => {
            const inner = (
              <>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${it.tone}`}><it.icon className="size-[18px]" /></span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-tight">{it.label}</span>
                  <span className="block truncate text-xs text-(--ink)/55">{it.sub}</span>
                </span>
              </>
            );
            const cls = `flex w-full items-center gap-3 rounded-2xl p-2.5 text-left hover:bg-(--sand) ${PRESS}`;
            return (
              <li
                key={it.label}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={`transition-[opacity,translate] duration-500 ${EASE} ${open ? "" : "translate-y-2 opacity-0"}`}
              >
                {it.href
                  ? <a href={it.href} {...(it.external ? EXTERNAL : {})} onClick={() => setOpen(false)} className={cls} tabIndex={open ? 0 : -1}>{inner}</a>
                  : <button type="button" onClick={() => { setOpen(false); it.onClick?.(); }} className={cls} tabIndex={open ? 0 : -1}>{inner}</button>}
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="tt-dock-menu"
        tabIndex={shown ? 0 : -1}
        className={`group flex h-14 items-center gap-3 rounded-full bg-(--navy) py-2 pl-2 pr-5 text-white shadow-[0_20px_45px_-18px_rgba(6,24,42,.9)] ring-1 ring-white/10 hover:-translate-y-0.5 ${PRESS}`}
      >
        <Avatar template={template} />
        <span className="text-sm font-semibold">{pick(lang, "Plan your trip", "Planee su tour")}</span>
        <ChevronDown className={`size-4 transition-transform duration-500 ${EASE} ${open ? "" : "rotate-180"}`} />
      </button>
    </div>
  );
}

export function ConciergeChat({ template, lang, open, onOpenChange, onQuote }: {
  template: BusinessTemplate;
  lang: Lang;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuote: (tour?: number) => void;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const { brand } = template;
  const demo = !template.plwSiteId;
  const tours = template.tours ?? [];
  // The greeting always speaks the site's current language.
  const greeting = answer("hello", template, lang);
  const asked = new Set(msgs.filter((m) => m.from === "you").map((m) => m.text));
  const chips = suggestions(lang).filter((s) => !asked.has(s));

  // Follow the newest message: now, and again once its entrance has settled.
  useEffect(() => {
    const pin = () => list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
    const frame = requestAnimationFrame(pin);
    const settle = window.setTimeout(pin, 520);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(settle); };
  }, [msgs, typing]);

  const ask = (q: string) => {
    const question = q.trim().slice(0, 300);
    if (!question || typing) return;
    setDraft("");
    setMsgs((m) => [...m, { from: "you", text: question }]);
    setTyping(true);
    // A short beat before the answer reads as a reply, not a page jump.
    timer.current = window.setTimeout(() => {
      const reply = answer(question, template, lang);
      setMsgs((m) => [...m, { from: "bot", text: reply.text, reply, question }]);
      setTyping(false);
    }, 650);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); ask(draft); };

  const bubble = (m: Msg, i: number) => {
    const mine = m.from === "you";
    const t = m.reply?.tour !== undefined ? tours[m.reply.tour] : undefined;
    return (
      <div key={i} className={`flex flex-col gap-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 ${mine ? "items-end" : "items-start"}`}>
        <p className={`max-w-[85%] whitespace-pre-line rounded-3xl px-4 py-3 text-[15px] leading-relaxed ${mine ? "rounded-br-lg bg-(--navy) text-white" : "rounded-bl-lg bg-white text-(--ink) shadow-sm ring-1 ring-(--ink)/5"}`}>
          {m.text}
        </p>
        {t && m.reply && (
          <button
            type="button"
            onClick={() => { onOpenChange(false); onQuote(m.reply!.tour); }}
            className={`group flex w-[85%] items-center gap-3 rounded-2xl bg-white p-2 pr-4 text-left shadow-sm ring-1 ring-(--ink)/5 hover:-translate-y-0.5 ${PRESS}`}
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl"><Photo src={t.image} alt="" className={`size-full object-cover transition-transform duration-700 ${EASE} group-hover:scale-105`} /></span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{t.title[lang]}</span>
              <span className="block text-xs text-(--ink)/55">{pick(lang, "from", "desde")} {usd(t.priceUsd, lang)}</span>
            </span>
          </button>
        )}
        {m.reply && m.reply.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {m.reply.actions.map((a) =>
              a === "quote" ? (
                <button key={a} type="button" onClick={() => { onOpenChange(false); onQuote(m.reply!.tour); }} className={`h-9 rounded-full bg-(--sun) px-4 text-sm font-semibold text-(--navy) hover:bg-[#F7B567] ${PRESS}`}>
                  {pick(lang, "Build my quote", "Armar mi cotización")}
                </button>
              ) : a === "whatsapp" ? (
                <a
                  key={a}
                  href={whatsappLink(brand, m.question ? pick(lang, `Hi Willy! ${m.question}`, `¡Hola Willy! ${m.question}`) : pick(lang, "Hi Willy!", "¡Hola Willy!"))}
                  {...EXTERNAL}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white hover:brightness-95 ${PRESS}`}
                >
                  <MessageCircle className="size-4" /> {pick(lang, "Ask Willy on WhatsApp", "Preguntarle a Willy")}
                </a>
              ) : (
                <a key={a} href={brand.phoneHref} className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-(--ink)/15 bg-white px-4 text-sm font-semibold hover:border-(--ink)/40 ${PRESS}`}>
                  <Phone className="size-4" /> {brand.phone}
                </a>
              ),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            opener.current = document.activeElement as HTMLElement | null;
            // A mouse goes straight to typing; a phone keeps its keyboard down until tapped.
            if (window.matchMedia("(pointer: fine)").matches) { e.preventDefault(); input.current?.focus(); }
          }}
          onCloseAutoFocus={(e) => { e.preventDefault(); opener.current?.focus(); }}
          onInteractOutside={(e) => e.preventDefault()}
          style={siteVars(template)}
          className={`tt-site fixed inset-0 z-[85] flex flex-col overflow-hidden bg-(--sand) text-(--ink) shadow-[0_40px_90px_-30px_rgba(6,24,42,.6)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 data-[state=open]:duration-500 md:inset-auto md:bottom-6 md:right-6 md:h-[min(680px,calc(100dvh-3rem))] md:w-[410px] md:origin-bottom-right md:rounded-[2rem]`}
        >
          <div className="flex items-center gap-3 bg-(--navy) px-5 py-4 text-white">
            <span className="relative">
              <Avatar template={template} size="size-11" />
              <span aria-hidden className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-(--teal) ring-2 ring-(--navy)" />
            </span>
            <div className="min-w-0 flex-1">
              <Dialog.Title className="truncate font-semibold">{pick(lang, "Trip concierge", "Concierge de viaje")}</Dialog.Title>
              <p className="truncate text-xs text-white/60">
                {brand.name} · {demo ? pick(lang, "demo", "demostración") : pick(lang, "instant answers", "respuestas al instante")}
              </p>
            </div>
            <Dialog.Close className={`grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 ${PRESS}`} aria-label={pick(lang, "Close chat", "Cerrar chat")}>
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <div ref={list} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:thin]" role="log" aria-live="polite">
            {bubble({ from: "bot", text: greeting.text, reply: greeting }, -1)}
            {msgs.map(bubble)}
            {typing && (
              <div className="flex w-fit gap-1.5 rounded-3xl rounded-bl-lg bg-white px-4 py-4 shadow-sm ring-1 ring-(--ink)/5" aria-label={pick(lang, "Writing", "Escribiendo")}>
                {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-(--ink)/35 motion-safe:animate-bounce" style={{ animationDelay: `${d * 140}ms` }} />)}
              </div>
            )}
          </div>

          {chips.length > 0 && (
            <div data-lenis-prevent className="tt-noscroll flex gap-2 overflow-x-auto px-4 pb-3">
              {chips.map((c) => (
                <button key={c} type="button" onClick={() => ask(c)} className={`h-9 shrink-0 rounded-full border border-(--ink)/12 bg-white px-4 text-sm text-(--ink)/80 hover:border-(--sea) hover:text-(--sea) ${PRESS}`}>
                  {c}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="border-t border-(--ink)/10 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <div className="flex items-center gap-2 rounded-full bg-(--sand) py-1.5 pl-5 pr-1.5 ring-1 ring-transparent transition-shadow focus-within:ring-(--sea)">
              <input
                ref={input}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={300}
                placeholder={pick(lang, "e.g. What's included on the sunset tour?", "p. ej. ¿Qué incluye el tour del atardecer?")}
                aria-label={pick(lang, "Your question", "Su pregunta")}
                className="h-10 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-(--ink)/40"
              />
              <button type="submit" disabled={!draft.trim() || typing} className={`grid size-10 shrink-0 place-items-center rounded-full bg-(--navy) text-white hover:bg-(--sea) disabled:opacity-30 ${PRESS}`} aria-label={pick(lang, "Send", "Enviar")}>
                <ArrowUp className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-(--ink)/45">
              {demo
                ? pick(lang, "Demo: answers come from Willy's tour info. The full version answers any question.", "Demo: las respuestas salen de la información de Willy. La versión completa responde cualquier pregunta.")
                : pick(lang, "Answers come from Willy's tour info. Anything else, Willy answers on WhatsApp.", "Las respuestas salen de la información de Willy. Lo demás, Willy lo responde por WhatsApp.")}
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
