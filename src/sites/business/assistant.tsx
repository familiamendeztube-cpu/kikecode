import { useEffect, useRef, useState } from "react";
import { Phone, Quote, Play, Pause, Volume2, MessageCircle, Calendar, Clock, Send, X } from "lucide-react";
import type { BusinessTemplate, Lang } from "@/templates/types";
import { fnUrl } from "@/lib/plw";
import { leadOutcomeMessage, previewNotice, useLeadForm } from "@/sites/shared/lead-form";
import type { SiteProps } from "./ui";
import { buildGreeting } from "./data";
import { bookingCopy, PREFERRED_TIMES } from "./booking-copy";

/* ---------------------------------------------------------------- */
/* useGreeting: play the live greeting in a realistic human voice.   */
/* Audio is generated server-side (OpenAI gpt-audio) from the live   */
/* greeting text, so it always says the current business name — no   */
/* stale prerecorded clip and no robotic browser speech synthesis.   */
/* ---------------------------------------------------------------- */
export function useGreeting(text: string | undefined, lang: Lang) {
  const [playing, setPlaying] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  const userPausedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supported = typeof window !== "undefined" && typeof Audio !== "undefined";

  // Greeting text changes on every keystroke while editing the business name.
  // Each fresh text is a paid TTS generation, so debounce to the settled value.
  const [settledText, setSettledText] = useState(text);
  useEffect(() => {
    const id = setTimeout(() => setSettledText(text), 600);
    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    const text = settledText;
    if (!text) return;
    if (typeof window === "undefined" || typeof Audio === "undefined") return;

    const url = `${fnUrl("kike-ai")}?action=tts&text=${encodeURIComponent(text)}&voice=nova`;
    const audio = new Audio(url);
    audio.preload = "auto";
    audioRef.current = audio;
    userPausedRef.current = false;
    setPlaying(false);
    setPlayedOnce(false);

    audio.addEventListener("play", () => { setPlaying(true); setPlayedOnce(true); });
    audio.addEventListener("pause", () => setPlaying(false));
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("error", () => setPlaying(false));

    const ac = new AbortController();

    // Try immediate autoplay; if blocked, play on the first user gesture anywhere.
    const trySpeak = () => {
      if (userPausedRef.current || ac.signal.aborted) return;
      audio.play().catch(() => { /* autoplay blocked — wait for a gesture */ });
    };
    trySpeak();
    const opts: AddEventListenerOptions = { once: true, passive: true, signal: ac.signal };
    const onGesture = () => {
      if (audio.paused && !userPausedRef.current && audio.currentTime === 0) {
        trySpeak();
      }
    };
    document.addEventListener("pointerdown", onGesture, opts);
    document.addEventListener("keydown", onGesture, opts);

    return () => {
      ac.abort();
      try { audio.pause(); } catch { /* ignore */ }
      audio.src = "";
      audioRef.current = null;
    };
  }, [settledText, lang]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    } else {
      userPausedRef.current = false;
      if (audio.ended) audio.currentTime = 0;
      audio.play().catch(() => { /* ignore */ });
    }
  };
  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  return { playing, playedOnce, toggle, pause, supported };
}

export type Greeting = ReturnType<typeof useGreeting>;

/* ASSISTANT AUDIO STRIP */
export function AssistantStrip({ template, brand, p, lang, greeting }: SiteProps & { greeting: Greeting }) {
  const media = template.media;
  const assistant = template.assistant;
  if (!assistant) return null;
  return (
    <section id="assistant" className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-[auto,1fr,auto] gap-6 items-center">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {media?.teamPortrait ? (
              <img src={media.teamPortrait} alt={assistant.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-20 h-20 rounded-full grid place-items-center text-white font-extrabold text-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>{assistant.name.charAt(0)}</div>
            )}
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" title="online" />
            {brand.logo && (
              <img src={brand.logo} alt="" className="absolute -top-1.5 -left-1.5 w-8 h-8 rounded-full object-contain bg-white ring-2 ring-white shadow-md" />
            )}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: p.primary }}>
              {lang === "en" ? "Live · Online now" : "En vivo · Conectada ahora"}
            </div>
            <div className="font-extrabold text-xl tracking-tight">{assistant.name}</div>
            <div className="text-xs text-slate-500">{lang === "en" ? assistant.roleEn : assistant.roleEs} · {brand.name}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 px-5 py-4 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            <Quote className="inline w-4 h-4 mr-1 -mt-1" style={{ color: p.primary }} />
            {buildGreeting(assistant, lang, brand.name)}
          </p>
          {greeting.supported && (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={greeting.toggle}
                className="inline-flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: p.primary }}
                aria-label={greeting.playing ? "Pause greeting" : "Play greeting"}
              >
                {greeting.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {greeting.playing
                  ? (lang === "en" ? "Pause" : "Pausar")
                  : (lang === "en" ? "Listen to greeting" : "Escuchar saludo")}
              </button>
              <div className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" /> {lang === "en" ? "15-second voice intro" : "Saludo de 15 segundos"}
              </div>
            </div>
          )}
        </div>

        <a href={brand.phoneHref} className="hidden md:inline-flex items-center justify-center gap-2 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: p.primaryDark }}>
          <MessageCircle className="w-4 h-4" />
          {lang === "en" ? "Talk to a human" : "Habla con una persona"}
        </a>
      </div>
    </section>
  );
}

export function FloatingAssistant({
  assistant, portraitSrc, brandName, phone, phoneHref, palette, lang, greeting, services, siteId,
}: {
  assistant: NonNullable<BusinessTemplate["assistant"]>;
  portraitSrc: string | undefined;
  brandName: string;
  phone: string;
  phoneHref: string;
  palette: BusinessTemplate["brand"]["palette"];
  lang: Lang;
  greeting: Greeting;
  services: string[];
  /** Published sites only: the request is sent to PLW as a lead. */
  siteId?: string;
}) {
  const [need, setNeed] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [step, setStep] = useState<"need" | "when" | "contact" | "done">("need");
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [when, setWhen] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lead = useLeadForm(siteId, lang);
  const B = bookingCopy(lang, brandName);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, step]);

  const L = lang === "en"
    ? {
        online: "Online now · 24/7 AI assistant",
        tapHint: "Tap anywhere to hear my voice",
        speaking: `${assistant.name} is speaking…`,
        hear: "Hear greeting",
        pause: "Pause",
        needPh: "Type what you need…",
        contactPh: "Your phone number",
        invalidPhone: "Hmm, that doesn't look like a phone number — please enter a number we can text.",
        callNow: "Call now",
        send: "Send",
      }
    : {
        online: "Conectada · Asistente IA 24/7",
        tapHint: "Toca para escuchar mi voz",
        speaking: `${assistant.name} está hablando…`,
        hear: "Escuchar",
        pause: "Pausar",
        needPh: "Escribe lo que necesitas…",
        contactPh: "Tu número de teléfono",
        invalidPhone: "Mmm, eso no parece un teléfono — escribe un número al que podamos enviarte mensaje.",
        callNow: "Llamar",
        send: "Enviar",
      };

  function submitNeed(text: string) {
    const v = text.trim();
    if (!v) return;
    setNeed(v);
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: B.whenPrompt(v) }]);
    setDraft("");
    setStep("when");
  }
  function submitWhen(text: string) {
    const v = text.trim();
    if (!v) return;
    setWhen(v);
    setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: B.contactPrompt(v) }]);
    setDraft("");
    setStep("contact");
  }
  async function submitContact(text: string) {
    const v = text.trim();
    if (!v || !when || lead.sending) return;
    if (v.replace(/\D/g, "").length < 7) {
      setMsgs((m) => [...m, { from: "user", text: v }, { from: "bot", text: L.invalidPhone }]);
      setDraft("");
      return;
    }
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setDraft("");
    // The chat asks only for a phone, so the lead is named after the chat itself.
    const result = await lead.submit({
      form: "assistant",
      name: lang === "en" ? "Website chat visitor" : "Visitante del chat del sitio",
      phone: v,
      service: need,
      preferredTime: when,
    });
    if (!result) return;
    if (result.status === "failed") {
      setMsgs((m) => [...m, { from: "bot", text: leadOutcomeMessage(result, lang, phone) ?? "" }]);
      return;
    }
    setMsgs((m) => [...m, { from: "bot", text: result.status === "sent" ? B.doneMsg(v) : B.previewMsg }]);
    setStep("done");
  }
  function reset() {
    setMsgs([]); setWhen(""); setDraft(""); setStep("need"); lead.reset();
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full shadow-2xl ring-4 ring-white/80 overflow-hidden hover:scale-105 transition-transform hidden lg:block"
        aria-label={lang === "en" ? "Open assistant" : "Abrir asistente"}
      >
        {portraitSrc ? (
          <img src={portraitSrc} alt={assistant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white font-extrabold text-xl" style={{ background: `linear-gradient(135deg, ${palette.heroIconFrom}, ${palette.heroIconTo})` }}>
            {assistant.name.charAt(0)}
          </div>
        )}
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(370px,calc(100vw-2.5rem))] hidden lg:block">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* header */}
        <div className="px-4 py-3 flex items-center gap-3 text-white shrink-0" style={{ background: `linear-gradient(135deg, ${palette.primaryDark}, ${palette.primary})` }}>
          <div className="relative">
            {portraitSrc ? (
              <img src={portraitSrc} alt={assistant.name} className="w-11 h-11 rounded-full object-cover border-2 border-white/80" />
            ) : (
              <div className="w-11 h-11 rounded-full grid place-items-center bg-white/20 font-extrabold">{assistant.name.charAt(0)}</div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="flex-1 leading-tight">
            <div className="font-bold">{assistant.name}</div>
            <div className="text-[11px] opacity-90 flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300" />
              </span>
              {L.online}
            </div>
          </div>
          <button onClick={() => setMinimized(true)} aria-label={lang === "en" ? "Minimize assistant" : "Minimizar asistente"} className="opacity-70 hover:opacity-100 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* chat transcript */}
        <div ref={scrollRef} aria-live="polite" className="p-4 space-y-3 overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl rounded-tl-md px-4 py-3 text-sm text-slate-700 leading-relaxed">
            {buildGreeting(assistant, lang, brandName)}
          </div>

          {greeting.supported && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={greeting.toggle}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: palette.primary }}
              >
                {greeting.playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {greeting.playing ? L.pause : L.hear}
              </button>
              {greeting.playing ? (
                <span className="text-xs text-emerald-600 inline-flex items-center gap-1.5">
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                    <span className="w-0.5 bg-emerald-600 animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                  </span>
                  {L.speaking}
                </span>
              ) : !greeting.playedOnce ? (
                <span className="text-[11px] text-amber-700 inline-flex items-center gap-1 animate-pulse">
                  <Volume2 className="w-3 h-3" /> {L.tapHint}
                </span>
              ) : null}
            </div>
          )}

          {msgs.map((m, i) => (
            <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.from === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-white"
                    : "max-w-[85%] rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-700 bg-slate-50"
                }
                style={m.from === "user" ? { backgroundColor: palette.primary } : undefined}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* input dock */}
        <div className="p-3 border-t border-slate-100 bg-white shrink-0 space-y-2">
          {step === "need" && (
            <>
              {services.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {services.slice(0, 4).map((s) => (
                    <button
                      key={s}
                      onClick={() => submitNeed(s)}
                      className="text-xs font-semibold rounded-full border border-slate-200 px-3 py-1.5 hover:bg-slate-50 transition-colors"
                      style={{ color: palette.primary }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={(e) => { e.preventDefault(); submitNeed(draft); }} className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={L.needPh}
                  aria-label={L.needPh}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button type="submit" aria-label={L.send} className="shrink-0 w-10 grid place-items-center rounded-xl text-white" style={{ backgroundColor: palette.primary }}>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === "when" && (
            <>
              <div className="grid grid-cols-2 gap-2">
                {PREFERRED_TIMES[lang].map((option) => (
                  <button
                    key={option}
                    onClick={() => submitWhen(option)}
                    className="inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    style={{ borderColor: `${palette.primary}40` }}
                  >
                    <Calendar className="w-4 h-4 shrink-0" style={{ color: palette.primary }} /> {option}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); submitWhen(draft); }} className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={B.whenPh}
                  aria-label={B.whenPh}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button type="submit" aria-label={L.send} className="shrink-0 w-10 grid place-items-center rounded-xl text-white" style={{ backgroundColor: palette.primary }}>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {step === "contact" && (
            <form onSubmit={(e) => { e.preventDefault(); void submitContact(draft); }} className="flex gap-2">
              <input
                type="tel"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={L.contactPh}
                aria-label={L.contactPh}
                disabled={lead.sending}
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              <button type="submit" disabled={lead.sending} aria-busy={lead.sending} aria-label={L.send} className="shrink-0 w-10 grid place-items-center rounded-xl text-white disabled:opacity-60 disabled:cursor-wait" style={{ backgroundColor: palette.primary }}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-2">
              {lead.state.status === "sent" ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5 text-sm font-bold text-emerald-800">
                  <Clock className="w-4 h-4" /> {B.doneBadge}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm font-bold text-amber-900">
                  <Clock className="w-4 h-4" /> {B.previewBadge}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <a href={phoneHref} onClick={greeting.pause} className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold px-3 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-opacity">
                  <Phone className="w-4 h-4" /> {L.callNow}
                </a>
                <button onClick={reset} className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-sm font-bold px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  {B.startOver}
                </button>
              </div>
            </div>
          )}

          {lead.isPreview && <p className="text-[11px] text-amber-800 text-center leading-snug">{previewNotice(lang)}</p>}
          <div className="text-[11px] text-slate-500 text-center leading-snug">
            {lang === "en"
              ? <>Or call <a href={phoneHref} className="font-bold text-slate-700 hover:underline">{phone}</a> — a real {brandName} team member answers 24/7</>
              : <>O llama al <a href={phoneHref} className="font-bold text-slate-700 hover:underline">{phone}</a> — una persona real de {brandName} contesta 24/7</>}
          </div>
        </div>
      </div>
    </div>
  );
}
