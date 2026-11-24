import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Headphones, Languages, Loader2, Mic, Moon, Phone, PhoneOff, ShoppingCart, Square, Volume2 } from "lucide-react";
import type { Conversation as LiveCall } from "@elevenlabs/client";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";
import { demoRequest, type DemoStatus } from "@/sites/shared/secretary-converse";
import { IconSwap } from "@/components/icon-swap";
import { PRESS } from "@/sites/business/ui";
import { Sparks } from "@/sites/shared/sparks";

/*
  Secretaria IA: the receptionist demo on PLW previews.
  - Nothing plays on its own (owner decision 2026-11-19): every sound starts
    from a click on one of the card's buttons, never on page load.
  - Samples ("Escuchar bienvenida" and the cards) are server-written clips from
    plw-tourism-voice by answerId, all played through ONE audio element, so a
    new clip, a live call or leaving the page always stops the previous one.
  - "Hablar con la secretaria" is a live ElevenLabs call. plw-secretary-converse
    hands out one-use tokens and enforces the limits; the page only shows them.
*/

const VOICE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-tourism-voice";
const PLW_TEL = "tel:+50640106198";
const MIC_BLOCKED = "No se pudo usar el micrófono. Permita el micrófono en su navegador (ícono del candado en la barra de direcciones) y vuelva a intentar.";
const INTERRUPTED = "La conversación se interrumpió. Intente de nuevo.";

/** The languages Secretaria IA speaks, as every page that offers her says it. */
export const SECRETARIA_LANGUAGES = {
  en: "Speaks Spanish, English, Mandarin, French, German, etc.",
  es: "Habla español, inglés, mandarín, francés, alemán, etc.",
};

const DEMOS = [
  { answerId: "secretary-orders", language: "es", icon: ShoppingCart, label: "Reservas / Pedidos", detail: "" },
  { answerId: "secretary-after-hours", language: "es", icon: Moon, label: "Fuera de horario", detail: "24/7" },
  { answerId: "secretary-language", language: "en", icon: Languages, label: "Otro idioma", detail: "English · 中文" },
];

/** The one sample-clip player: every play aborts the pending fetch and stops the current clip first. */
function useClipPlayer(token: string) {
  const [clip, setClip] = useState<{ id: string; phase: "loading" | "playing" } | null>(null);
  const ref = useRef<{ audio: HTMLAudioElement | null; abort: AbortController | null; url: string | null }>({ audio: null, abort: null, url: null });

  const stop = useCallback(() => {
    const p = ref.current;
    p.abort?.abort();
    p.abort = null;
    // Detach onerror first: revoking the old clip's URL must not stop the next one.
    if (p.audio) { p.audio.onerror = null; p.audio.pause(); p.audio.currentTime = 0; }
    if (p.url) { URL.revokeObjectURL(p.url); p.url = null; }
    setClip(null);
    releaseAudio("secretaria");
  }, []);

  const play = useCallback(async (answerId: string, language: string) => {
    stop();
    const p = ref.current;
    const abort = (p.abort = new AbortController());
    setClip({ id: answerId, phase: "loading" });
    try {
      const res = await fetch(VOICE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answerId, language }),
        signal: abort.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      if (abort.signal.aborted) return;
      if (!blob.type.includes("audio")) throw new Error("not audio");
      const audio = (p.audio ??= new Audio());
      p.url = URL.createObjectURL(blob);
      audio.src = p.url;
      audio.onended = () => { setClip(null); releaseAudio("secretaria"); };
      audio.onerror = stop;
      claimAudio("secretaria", stop);
      await audio.play();
      setClip({ id: answerId, phase: "playing" });
    } catch {
      if (!abort.signal.aborted) stop();
    }
  }, [token, stop]);

  useEffect(() => stop, [stop]);
  return { clip, play, stop };
}

type LivePhase = "idle" | "starting" | "listening" | "speaking" | "ended";

/** The live call: status on load, then mic → start (uses one conversation) → ElevenLabs session. */
function useLiveSecretary(token: string, stopClips: () => void) {
  const [phase, setPhase] = useState<LivePhase>("idle");
  const [status, setStatus] = useState<DemoStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedUp, setUsedUp] = useState<string | null>(null);
  const convRef = useRef<LiveCall | null>(null);
  const aliveRef = useRef(true);

  const refresh = useCallback(() => {
    demoRequest("status", token).then(setStatus, (e: Error) => setError(e.message));
  }, [token]);

  useEffect(() => {
    aliveRef.current = true;
    refresh();
    return () => { aliveRef.current = false; void convRef.current?.endSession(); };
  }, [refresh]);

  async function start() {
    stopClips();
    setError(null);
    setPhase("starting");
    let mic: MediaStream;
    try {
      // Before `start`, so a blocked mic never uses up one of the customer's conversations.
      mic = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError(MIC_BLOCKED);
      setPhase("idle");
      return;
    }
    let claimed = false;
    try {
      const data = await demoRequest("start", token);
      setStatus(data);
      if (!data.allowed) {
        setUsedUp(data.message);
        setPhase("idle");
        return;
      }
      claimed = true;
      const { Conversation } = await import("@elevenlabs/client");
      const conv = await Conversation.startSession({
        conversationToken: data.conversationToken,
        connectionType: "webrtc",
        dynamicVariables: data.dynamicVariables,
        onModeChange: ({ mode }) => setPhase(mode === "speaking" ? "speaking" : "listening"),
        onError: () => setError(INTERRUPTED),
        onDisconnect: () => { convRef.current = null; setPhase("ended"); refresh(); },
      });
      if (!aliveRef.current) { void conv.endSession(); return; }
      convRef.current = conv;
      setPhase((p) => (p === "starting" ? "listening" : p));
    } catch (e) {
      setError(claimed ? INTERRUPTED : (e as Error).message);
      setPhase("idle");
      if (claimed) refresh();
    } finally {
      // The SDK opened its own track by now; this one only held the permission.
      mic.getTracks().forEach((t) => t.stop());
    }
  }

  return { phase, status, error, usedUp, start, end: () => void convRef.current?.endSession() };
}

type ClipState = "loading" | "playing" | null;

/** One sample-clip button. It shows its own clip's state, and stops it while loading or playing. */
function ClipButton({ state, onClick, disabled, icon: Icon, label, detail, stacked }: {
  state: ClipState;
  onClick: () => void;
  disabled: boolean;
  icon: typeof Bot;
  label: string;
  detail?: string;
  /** Icon above the text from `sm` up (the three sample cards). */
  stacked?: boolean;
}) {
  const active = state !== null;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left disabled:cursor-not-allowed disabled:opacity-50 ${PRESS} ${stacked ? "sm:flex-col sm:items-start sm:gap-2" : ""} ${
        active ? "border-[#1F5E3B] bg-[#1F5E3B] text-white" : "border-[#1F5E3B]/15 bg-white text-[#1C241E] hover:border-[#1F5E3B]/40"
      }`}
    >
      <span className={`grid size-9 shrink-0 place-items-center rounded-full ${active ? "bg-white/15" : "bg-[#1F5E3B]/10 text-[#1F5E3B]"}`}>
        <IconSwap
          swapped={state === "playing"}
          from={state === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4" />}
          to={<Square className="size-3.5 fill-current" />}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight">{state === "playing" ? "Detener" : state === "loading" ? "Cargando audio…" : label}</span>
        {detail && <span className="mt-0.5 block truncate text-xs opacity-70">{detail}</span>}
      </span>
    </button>
  );
}

/*
  Layout: one card with nested panels. The radii follow outer − padding = inner
  (this app's scale: 3xl 32px, 2xl 24px, lg 16px): card 3xl + p-2 → panels 2xl,
  panel 2xl + p-2 → buttons lg.
*/
export function SecretariaCard({ previewToken, businessName, businessType, standaloneLink }: {
  previewToken: string;
  businessName: string;
  businessType: string;
  standaloneLink?: string;
}) {
  const { clip, play, stop } = useClipPlayer(previewToken);
  const live = useLiveSecretary(previewToken, stop);
  const [burst, setBurst] = useState(0);
  const inCall = live.phase === "starting" || live.phase === "listening" || live.phase === "speaking";
  const connected = live.phase === "listening" || live.phase === "speaking";
  const noneLeft = live.status?.remaining === 0;
  const stateOf = (id: string): ClipState => (clip?.id === id ? clip.phase : null);
  const toggle = (id: string, language: string) => (clip?.id === id ? stop() : void play(id, language));

  return (
    <div className="rounded-3xl border border-[#1F5E3B]/15 bg-white p-2 text-left shadow-[0_30px_80px_-32px_rgba(10,31,19,0.45)]">
      {/* Who she is, and how many conversations this link has left */}
      <div className="rounded-2xl bg-[#0A1F13] p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
            {live.phase === "speaking" && <span aria-hidden className="absolute inset-0 animate-ping rounded-full ring-2 ring-[#E8B04B]/60 motion-reduce:hidden" />}
            <Bot className="size-7 text-[#E8B04B]" aria-hidden />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight">Secretaria IA</h3>
            <p className="truncate text-sm text-white/70">Recepcionista con IA · {businessName}</p>
          </div>
        </div>
        {live.status ? (
          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">
                Le quedan {live.status.remaining} de {live.status.limits.conversations} conversaciones.
              </p>
              <span className="flex shrink-0 gap-1.5" aria-hidden>
                {Array.from({ length: Math.min(live.status.limits.conversations, 10) }, (_, i) => (
                  <span key={i} className={`size-2 rounded-full transition-colors duration-300 ${i < live.status!.remaining ? "bg-[#E8B04B]" : "bg-white/20"}`} />
                ))}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-snug text-white/60">{live.status.notice}</p>
          </div>
        ) : (
          // Loading state while `status` answers: the label's shape, not a jump.
          <div className="mt-5 space-y-2 border-t border-white/10 pt-4" aria-hidden>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-full animate-pulse rounded-full bg-white/5" />
          </div>
        )}
      </div>

      {/* The main feature: a live conversation */}
      <div className="mt-2 rounded-2xl bg-[#FAF7F0] p-2">
        {connected ? (
          <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-4 py-5">
            <div className="flex h-8 items-end gap-1" aria-hidden>
              {[14, 26, 18, 30, 16].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-full bg-[#1F5E3B] transition-[height] duration-300 ${live.phase === "speaking" ? "animate-pulse" : ""}`}
                  style={{ height: live.phase === "speaking" ? h : 6, animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
            <p role="status" className="text-sm font-semibold text-[#1F5E3B]">
              {live.phase === "speaking" ? "La secretaria está hablando" : "La secretaria está escuchando"}
            </p>
            <button onClick={live.end} className={`flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A1F13] font-bold text-white hover:bg-[#12301E] ${PRESS}`}>
              <PhoneOff className="size-5" /> Terminar
            </button>
          </div>
        ) : live.phase === "starting" ? (
          <div className="flex h-16 items-center justify-center gap-2 text-sm font-medium text-[#3D4A40]" aria-busy>
            <Loader2 className="size-4 animate-spin" /> Conectando con la secretaria…
          </div>
        ) : (
          <button
            onClick={() => { setBurst((b) => b + 1); void live.start(); }}
            disabled={noneLeft}
            className={`relative flex h-16 w-full items-center justify-center gap-2.5 rounded-lg bg-[#E8B04B] text-lg font-bold text-[#0A1F13] shadow-[0_14px_32px_-14px_rgba(232,176,75,0.9)] hover:bg-[#F2C065] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${PRESS}`}
          >
            {burst > 0 && <Sparks key={burst} colors={["bg-[#E8B04B]", "bg-[#1F5E3B]"]} />}
            <Mic className="size-5" /> Hablar con la secretaria
          </button>
        )}
        {live.error && (
          <p role="alert" className="mt-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-900 animate-in fade-in slide-in-from-top-1 motion-reduce:animate-none">
            {live.error}
          </p>
        )}
        {live.status && (live.phase === "ended" || noneLeft) && (
          <div className="mt-2 rounded-lg bg-white p-4 animate-in fade-in slide-in-from-bottom-1 motion-reduce:animate-none">
            <p className="text-sm leading-relaxed text-[#1C241E]">{live.usedUp ?? live.status.closing}</p>
            <a href={PLW_TEL} className={`mt-3 flex h-12 items-center justify-center gap-2 rounded-full bg-[#1F5E3B] font-bold text-white hover:bg-[#287549] ${PRESS}`}>
              <Phone className="size-4" /> Llamar a PLW
            </a>
          </div>
        )}
      </div>

      {/* Samples: one clip at a time, each button shows its own state */}
      <div className="mt-2 rounded-2xl border border-[#1F5E3B]/12 p-2">
        <p className="px-2 pb-3 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1F5E3B]">Escuche una demostración</p>
        <ClipButton
          state={stateOf("secretary-welcome")}
          onClick={() => toggle("secretary-welcome", "es")}
          disabled={inCall}
          icon={Volume2}
          label="Escuchar bienvenida"
        />
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {DEMOS.map((d) => (
            <ClipButton
              key={d.answerId}
              stacked
              state={stateOf(d.answerId)}
              onClick={() => toggle(d.answerId, d.language)}
              disabled={inCall}
              icon={d.icon}
              label={d.label}
              detail={d.detail || businessType}
            />
          ))}
        </div>
        {standaloneLink && (
          <a href={standaloneLink} className={`mt-2 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-[#1F5E3B] hover:bg-[#1F5E3B]/5 ${PRESS}`}>
            <Headphones className="size-4" aria-hidden /> Presentación completa
          </a>
        )}
      </div>
    </div>
  );
}
