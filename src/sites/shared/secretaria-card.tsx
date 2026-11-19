import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Headphones, Languages, Loader2, Mic, Moon, Phone, PhoneOff, ShoppingCart, Volume2, VolumeX } from "lucide-react";
import type { Conversation as LiveCall } from "@elevenlabs/client";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";
import { demoRequest, type DemoStatus } from "@/sites/shared/secretary-converse";

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

export function SecretariaCard({ previewToken, businessName, businessType, standaloneLink }: {
  previewToken: string;
  businessName: string;
  businessType: string;
  standaloneLink?: string;
}) {
  const { clip, play, stop } = useClipPlayer(previewToken);
  const live = useLiveSecretary(previewToken, stop);
  const inCall = live.phase === "starting" || live.phase === "listening" || live.phase === "speaking";
  const noneLeft = live.status?.remaining === 0;

  return (
    <div className="rounded-2xl border border-[#1F5E3B]/20 bg-white shadow-xl overflow-hidden">
      <div className="flex items-start gap-4 p-6">
        <div className="relative w-14 h-14 rounded-full bg-[#0A1F13] grid place-items-center shrink-0">
          <Bot className="w-7 h-7 text-[#E8B04B]" aria-hidden />
          {(clip?.phase === "playing" || live.phase === "speaking") && (
            <span className="absolute -bottom-1 -right-1 flex items-end gap-0.5 h-4" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1 rounded-full bg-[#1F5E3B] animate-pulse" style={{ height: `${8 + (i % 2) * 6}px` }} />
              ))}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-[#1C241E]">Secretaria IA</h3>
            <span className="text-[10px] font-bold uppercase tracking-wide rounded-full bg-[#E8B04B]/20 text-[#8a6a1f] px-2 py-0.5">Demo</span>
          </div>
          <p className="text-sm text-[#3D4A40]">Recepcionista simulada · demostración · {businessName}</p>
          <p className="text-xs text-[#3D4A40]/70 mt-1">Simulación. No llama, no reserva, no envía nada.</p>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        {live.status && (
          <div className="rounded-xl bg-[#1F5E3B]/5 px-4 py-3 text-xs text-[#3D4A40] leading-snug">
            <p>{live.status.notice}</p>
            <p className="mt-1 font-bold text-[#1C241E]">
              Le quedan {live.status.remaining} de {live.status.limits.conversations} conversaciones.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-[#1F5E3B]/25 bg-[#FAF7F0] p-4 space-y-3">
          {live.phase === "listening" || live.phase === "speaking" ? (
            <>
              <div className="flex items-center justify-center gap-3 py-2 text-sm font-semibold text-[#1F5E3B]" role="status">
                <span className="relative flex h-3 w-3" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#1F5E3B] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#1F5E3B]" />
                </span>
                {live.phase === "speaking" ? "La secretaria está hablando" : "La secretaria está escuchando"}
              </div>
              <button onClick={live.end} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors">
                <PhoneOff className="w-5 h-5" /> Terminar
              </button>
            </>
          ) : live.phase === "starting" ? (
            <div className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm text-[#3D4A40]" aria-busy>
              <Loader2 className="w-4 h-4 animate-spin" /> Conectando con la secretaria…
            </div>
          ) : (
            <button
              onClick={() => void live.start()}
              disabled={noneLeft}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0A1F13]"
            >
              <Mic className="w-5 h-5" /> Hablar con la secretaria
            </button>
          )}
          {live.error && <p className="text-xs text-amber-800 bg-amber-50 rounded-lg px-3 py-2" role="alert">{live.error}</p>}
          {live.status && (live.phase === "ended" || noneLeft) && (
            <div className="rounded-lg border border-[#1F5E3B]/20 bg-white p-4 space-y-3">
              <p className="text-sm text-[#1C241E] leading-snug">{live.usedUp ?? live.status.closing}</p>
              <a href={PLW_TEL} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B] hover:bg-[#287549] px-5 py-3 text-white font-bold transition-colors">
                <Phone className="w-4 h-4" /> Llamar a PLW
              </a>
            </div>
          )}
        </div>

        {!clip && (
          <button
            onClick={() => void play("secretary-welcome", "es")}
            disabled={inCall}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B] hover:bg-[#287549] px-5 py-3.5 text-white font-bold transition-colors disabled:opacity-50"
          >
            <Volume2 className="w-5 h-5" /> Escuchar bienvenida
          </button>
        )}
        {clip?.phase === "loading" && (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B]/70 px-5 py-3.5 text-white font-bold" aria-busy>
            <Loader2 className="w-5 h-5 animate-spin" /> Cargando audio…
          </div>
        )}
        {clip?.phase === "playing" && (
          <button onClick={stop} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors">
            <VolumeX className="w-5 h-5" /> Detener
          </button>
        )}

        <div className="rounded-xl border border-[#1F5E3B]/15 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1F5E3B] mb-3">Escuche una demostración</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMOS.map((d) => (
              <button
                key={d.answerId}
                onClick={() => void play(d.answerId, d.language)}
                disabled={inCall}
                className="text-left rounded-lg border border-[#1F5E3B]/20 hover:border-[#1F5E3B]/50 hover:bg-[#1F5E3B]/5 p-3 transition-colors disabled:opacity-50"
              >
                <d.icon className="w-4 h-4 text-[#1F5E3B] mb-1.5" aria-hidden />
                <div className="text-sm font-semibold text-[#1C241E] leading-tight">{d.label}</div>
                <div className="text-[11px] text-[#3D4A40]/80 mt-0.5">{d.detail || businessType}</div>
              </button>
            ))}
          </div>
          {standaloneLink && (
            <div className="flex mt-3">
              <a href={standaloneLink} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E3B] hover:text-[#287549]">
                <Headphones className="w-3.5 h-3.5" aria-hidden /> Presentación completa
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
