import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Headphones, Languages, Mic, Moon, Send, ShoppingCart, Square, Volume2, VolumeX, Loader2, Keyboard, RotateCw } from "lucide-react";
import type { Lang } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";
import { converse, micProblem, pickRecorderMime, MAX_TURN_MS } from "@/sites/shared/secretary-converse";

/*
  Secretaria IA: a simulated receptionist card for PLW client demos.
  Everything spoken comes from PLW's plw-tourism-voice endpoint by answerId —
  server-written text only, no browser TTS, no real calling or booking, no
  messages sent. Audio plays on a real user click (the button itself is the
  gesture); the auto greeting plays only when the browser already allows it.
*/

export type SecretaryDemo = {
  id: string;
  answerId: string;
  language: "es" | "en" | "zh";
  label: string;
  detail: string;
  icon: typeof Bot;
};

const VOICE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-tourism-voice";

const DEMOS: Omit<SecretaryDemo, "label" | "detail">[] = [
  { id: "orders", answerId: "secretary-orders", language: "es", icon: ShoppingCart },
  { id: "after-hours", answerId: "secretary-after-hours", language: "es", icon: Moon },
  { id: "language", answerId: "secretary-language", language: "en", icon: Languages },
];

export function clean(s: unknown, max = 60): string {
  return typeof s === "string" ? s.replace(/[<>]/g, "").trim().slice(0, max) : "";
}

export function useVoicePlayer(_previewToken: string) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setState("idle");
    releaseAudio("secretaria");
  }, []);

  useEffect(() => stop, [stop]);

  return { state, stop, set: setState, ref: audioRef, url: urlRef };
}

export type TurnPhase = "idle" | "requesting" | "recording" | "sending" | "thinking" | "speaking" | "done" | "error";

/** One two-way voice turn: request mic on click only, record ≤15 s, stop on
 *  demand/timeout/unmount, never held open between turns. */
export function useVoiceTurn(previewToken: string, lang: Lang, stopSharedAudio: () => void) {
  const [phase, setPhase] = useState<TurnPhase>("idle");
  const [turnError, setTurnError] = useState<string | null>(null);
  const [last, setLast] = useState<{ you: string; reply: string } | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const mimeRef = useRef<string | null>(null);
  const cancelledRef = useRef(false);
  const languageRef = useRef<"es" | "en" | "auto">("auto");
  const [hasPendingAudio, setHasPendingAudio] = useState(false);
  const pendingRef = useRef(false);

  const releaseMic = useCallback(() => {
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      try { recorderRef.current.stop(); } catch { /* already stopped */ }
    }
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const resetTurn = useCallback(() => {
    releaseMic();
    setPhase("idle");
    setHasPendingAudio(false);
    pendingRef.current = false;
  }, [releaseMic]);

  const stopTurn = useCallback(() => {
    cancelledRef.current = true;
    releaseMic();
    setPhase("idle");
    setElapsed(0);
    setHasPendingAudio(false);
    pendingRef.current = false;
  }, [releaseMic]);

  useEffect(() => () => { cancelledRef.current = true; releaseMic(); }, [releaseMic]);

  function finishAndSend() {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") {
      // onstop reads the buffered chunks; sendTurn takes over from there.
      releaseMic();
      setPhase("sending");
      return;
    }
    if (pendingRef.current) {
      pendingRef.current = false;
      setHasPendingAudio(false);
      setPhase("sending");
      const blob = new Blob(chunksRef.current, { type: mimeRef.current ?? "audio/webm" });
      chunksRef.current = [];
      if (blob.size > 0) void sendTurn({ audio: blob, mime: mimeRef.current ?? undefined });
      else setPhase("idle");
    }
  }

  async function startTurn() {
    setTurnError(null);
    setLast(null);
    setElapsed(0);
    cancelledRef.current = false;
    stopSharedAudio();
    const mime = pickRecorderMime();
    if (!mime) {
      setTurnError(pick(lang, "Este navegador no puede grabar voz. Escriba su pregunta abajo.", "This browser can't record voice. Type your question below."));
      setPhase("error");
      return;
    }
    setPhase("requesting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const problem = micProblem(err);
      setTurnError(pick(lang,
        problem === "unavailable"
          ? "No se encontró micrófono. Escriba su pregunta abajo."
          : problem === "denied"
            ? "Permiso de micrófono denegado. Puede escribir su pregunta abajo."
            : "No se pudo usar el micrófono. Escriba su pregunta abajo.",
        problem === "unavailable"
          ? "No microphone was found. Type your question below."
          : problem === "denied"
            ? "Microphone permission was denied. You can type your question below."
            : "The microphone couldn't be used. Type your question below."));
      setPhase("error");
      return;
    }
    streamRef.current = stream;
    chunksRef.current = [];
    mimeRef.current = mime;
    let rec: MediaRecorder;
    try {
      rec = new MediaRecorder(stream, { mimeType: mime });
    } catch {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setTurnError(pick(lang, "Este navegador no puede grabar voz. Escriba su pregunta abajo.", "This browser can't record voice. Type your question below."));
      setPhase("error");
      return;
    }
    recorderRef.current = rec;
    rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      const blob = new Blob(chunksRef.current, { type: mimeRef.current ?? "audio/webm" });
      chunksRef.current = [];
      if (cancelledRef.current || blob.size === 0) { pendingRef.current = false; return; }
      pendingRef.current = true;
      void sendTurn({ audio: blob, mime: mimeRef.current ?? undefined });
    };
    rec.start();
    setPhase("recording");
    timerRef.current = window.setTimeout(() => {
      // 15 s cap: stop mic immediately; keep the audio buffered and offer Enviar.
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        try { recorderRef.current.stop(); } catch { /* stopped */ }
      }
      pendingRef.current = true;
      setHasPendingAudio(true);
      setPhase("done");
    }, MAX_TURN_MS);
    tickRef.current = window.setInterval(() => setElapsed((s) => Math.min(s + 250, MAX_TURN_MS)), 250);
  }

  async function sendTurn(turn: { audio?: Blob; mime?: string; text?: string }) {
    setPhase("thinking");
    setTurnError(null);
    try {
      const out = await converse(previewToken, languageRef.current, turn);
      if (cancelledRef.current) return;
      setLast({ you: out.transcript, reply: out.reply });
      setPhase("speaking");
      claimAudio("secretaria-turn", stopSharedAudio);
      const audio = await playReply(previewToken, out.answerId, out.language, muted);
      if (audio) {
        audio.onended = () => { if (!cancelledRef.current) setPhase("idle"); };
        audio.onerror = () => { if (!cancelledRef.current) setPhase("done"); };
      } else if (!cancelledRef.current) {
        setPhase("done");
      }
    } catch {
      if (!cancelledRef.current) {
        setTurnError(pick(lang, "No se pudo completar la conversación. Intente de nuevo o escriba su pregunta.", "The conversation couldn't be completed. Try again or type your question."));
        setPhase("error");
      }
    }
  }

  async function sendTyped(text: string) {
    const v = text.trim();
    if (!v) return;
    stopSharedAudio();
    await sendTurn({ text: v });
  }

  function replayLast(): Promise<void> {
    return sendTurn(last ? { text: last.you } : { text: "" });
  }

  return {
    phase, turnError, last, elapsed, muted, hasPendingAudio,
    setMuted, startTurn, stopTurn, finishAndSend, sendTyped, replayLast, resetTurn,
    setLanguage: (l: "es" | "en" | "auto") => { languageRef.current = l; },
  };
}

/** Speaks exactly the reply PLW grounded, through the same voice endpoint. */
async function playReply(token: string, answerId: string, language: "es" | "en" | "zh", muted: boolean): Promise<HTMLAudioElement | null> {
  if (muted) return null;
  try {
    const res = await fetch("https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-tourism-voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, answerId, language }),
    });
    if (!res.ok) return null;
    const blob = await res.blob();
    if (!blob.type.includes("audio")) return null;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.onerror = () => URL.revokeObjectURL(url);
    await audio.play();
    return audio;
  } catch {
    return null;
  }
}

export function SecretariaCard({ previewToken, lang, businessName, businessType, standaloneLink }: {
  previewToken: string;
  lang: Lang;
  businessName: string;
  businessType: string;
  standaloneLink?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [greetPending, setGreetPending] = useState(false);
  const greetedRef = useRef(false);
  const { state, stop, set, ref, url } = useVoicePlayer(previewToken);
  const urlRef = url;
  const turn = useVoiceTurn(previewToken, lang, stop);

  async function run(id: string, language: "es" | "en" | "zh") {
    set("loading");
    setGreetPending(false);
    turn.stopTurn();
    try {
      const res = await fetch(VOICE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: previewToken, answerId: id, language }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      if (!blob.type.includes("audio")) throw new Error("not audio");
      const u = URL.createObjectURL(blob);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = u;
      const audio = new Audio(u);
      ref.current = audio;
      audio.onended = () => { set("idle"); releaseAudio("secretaria"); };
      audio.onerror = () => { stop(); };
      await audio.play();
      set("playing");
      claimAudio("secretaria", stop);
    } catch {
      stop();
    }
  }

  // Prefetch + one-shot auto greeting. Only when the browser already allows
  // playback without a gesture; otherwise the first real click starts it.
  useEffect(() => {
    let cancelled = false;
    const greetingId = "secretary-welcome";
    async function tryGreeting() {
      if (greetedRef.current) return;
      greetedRef.current = true;
      try {
        const res = await fetch(VOICE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: previewToken, answerId: greetingId, language: "es" }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        if (!blob.type.includes("audio")) throw new Error("not audio");
        if (cancelled) { URL.revokeObjectURL(URL.createObjectURL(blob)); return; }
        const u = URL.createObjectURL(blob);
        const audio = new Audio(u);
        try {
          await audio.play(); // throws NotAllowedError without a gesture
          ref.current = audio;
          urlRef.current = u;
          set("playing");
          claimAudio("secretaria", stop);
          audio.onended = () => { set("idle"); releaseAudio("secretaria"); };
          audio.onerror = () => { stop(); };
        } catch {
          URL.revokeObjectURL(u);
          // Browser blocked autoplay: keep the audio ready, wait for a real click.
          setGreetPending(true);
          urlRef.current = u;
        }
      } catch {
        // Endpoint or audio failed; the greeting button still works on click.
      }
    }
    void tryGreeting();
    return () => { cancelled = true; };
  }, [previewToken, ref, urlRef, set, stop]);

  const L = pick(lang, {
    title: "Secretaria IA",
    sub: "Recepcionista simulada · demostración",
    listen: "Escuchar bienvenida",
    stop: "Detener",
    loading: "Cargando audio…",
    demo: "Escuche una demostración",
    transcript: "Ver transcripción",
    hide: "Ocultar transcripción",
    full: "Presentación completa",
    replay: "Repetir",
    note: "Simulación. No llama, no reserva, no envía nada.",
    talk: "Hablar con la secretaria",
    talkNote: "Al grabar, se envía un fragmento de su voz para reconocimiento de voz. No se guarda nada en este navegador.",
    recording: "Grabando…",
    finishSend: "Terminar y enviar",
    send: "Enviar",
    maxReached: "Máximo alcanzado — puede enviar lo grabado",
    thinking: "Pensando…",
    you: "Usted dijo:",
    secretary: "La secretaria responde:",
    mute: "Silenciar respuesta",
    unmute: "Activar sonido",
    replayLast: "Repetir respuesta",
    typePlaceholder: "O escriba su pregunta…",
    typeSend: "Enviar pregunta",
    stopTurn: "Cancelar grabación",
  }, {
    title: "Secretaria IA",
    sub: "Recepcionista simulada · demostración",
    listen: "Escuchar bienvenida",
    stop: "Detener",
    loading: "Cargando audio…",
    demo: "Escuche una demostración",
    transcript: "Ver transcripción",
    hide: "Ocultar transcripción",
    full: "Presentación completa",
    replay: "Repetir",
    note: "Simulación. No llama, no reserva, no envía nada.",
    talk: "Hablar con la secretaria",
    talkNote: "Al grabar, se envía un fragmento de su voz para reconocimiento de voz. No se guarda nada en este navegador.",
    recording: "Grabando…",
    finishSend: "Terminar y enviar",
    send: "Enviar",
    maxReached: "Máximo alcanzado — puede enviar lo grabado",
    thinking: "Pensando…",
    you: "Usted dijo:",
    secretary: "La secretaria responde:",
    mute: "Silenciar respuesta",
    unmute: "Activar sonido",
    replayLast: "Repetir respuesta",
    typePlaceholder: "O escriba su pregunta…",
    typeSend: "Enviar pregunta",
    stopTurn: "Cancelar grabación",
  });

  function demoLabel(id: string): { label: string; detail: string } {
    if (id === "orders") {
      return { label: pick(lang, "Orders / Reservations", "Reservas / Pedidos"), detail: businessType };
    }
    if (id === "after-hours") return { label: pick(lang, "After hours", "Fuera de horario"), detail: pick(lang, "24/7", "24/7") };
    return { label: pick(lang, "Other language", "Otro idioma"), detail: pick(lang, "English · 中文", "English · 中文") };
  }

  return (
    <div className="rounded-2xl border border-[#1F5E3B]/20 bg-white shadow-xl overflow-hidden">
      <div className="flex items-start gap-4 p-6">
        <div className="relative w-14 h-14 rounded-full bg-[#0A1F13] grid place-items-center shrink-0">
          <Bot className="w-7 h-7 text-[#E8B04B]" aria-hidden />
          {state === "playing" && (
            <span className="absolute -bottom-1 -right-1 flex items-end gap-0.5 h-4" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1 rounded-full bg-[#1F5E3B] animate-pulse" style={{ height: `${8 + (i % 2) * 6}px` }} />
              ))}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg text-[#1C241E]">{L.title}</h3>
            <span className="text-[10px] font-bold uppercase tracking-wide rounded-full bg-[#E8B04B]/20 text-[#8a6a1f] px-2 py-0.5">{pick(lang, "Demo", "Demo")}</span>
          </div>
          <p className="text-sm text-[#3D4A40]">{L.sub} · {businessName}</p>
          <p className="text-xs text-[#3D4A40]/70 mt-1">{L.note}</p>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-3">
        <div className="rounded-xl border border-[#1F5E3B]/25 bg-[#FAF7F0] p-4 space-y-3">
            {turn.phase === "idle" && (
              <>
                <button onClick={() => void turn.startTurn()} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors">
                  <Mic className="w-5 h-5" /> {L.talk}
                </button>
                <p className="text-[11px] text-[#3D4A40]/70 leading-snug">{L.talkNote}</p>
              </>
            )}
            {turn.phase === "requesting" && (
              <div className="inline-flex items-center gap-2 text-sm text-[#3D4A40]" aria-busy>
                <Loader2 className="w-4 h-4 animate-spin" /> {pick(lang, "Pidiendo micrófono…", "Requesting microphone…")}
              </div>
            )}
            {turn.phase === "recording" && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#8a1f1f]" role="status">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" aria-hidden /> {L.recording}
                  <span className="text-[#3D4A40]/60 font-normal tabular-nums">{Math.floor((MAX_TURN_MS - turn.elapsed) / 1000)}s</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => turn.finishAndSend()} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B] hover:bg-[#287549] px-4 py-3 text-white font-bold text-sm transition-colors">
                    <Send className="w-4 h-4" /> {L.finishSend}
                  </button>
                  <button onClick={() => turn.stopTurn()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1F5E3B]/25 bg-white hover:bg-[#1F5E3B]/5 px-4 py-3 text-sm font-semibold text-[#1C241E] transition-colors">
                    <Square className="w-4 h-4" /> {L.stopTurn}
                  </button>
                </div>
              </>
            )}
            {turn.phase === "done" && turn.hasPendingAudio && (
              <button onClick={() => turn.finishAndSend()} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B] hover:bg-[#287549] px-5 py-3.5 text-white font-bold transition-colors">
                <Send className="w-5 h-5" /> {L.send}
              </button>
            )}
            {turn.phase === "done" && !turn.hasPendingAudio && (
              <p className="text-xs text-[#3D4A40]/70">{L.maxReached}</p>
            )}
            {turn.phase === "sending" && (
              <div className="inline-flex items-center gap-2 text-sm text-[#3D4A40]" aria-busy>
                <Loader2 className="w-4 h-4 animate-spin" /> {L.thinking}
              </div>
            )}
            {turn.phase === "thinking" && (
              <div className="inline-flex items-center gap-2 text-sm text-[#3D4A40]" aria-busy>
                <Loader2 className="w-4 h-4 animate-spin" /> {L.thinking}
              </div>
            )}
            {turn.phase === "speaking" && (
              <button onClick={() => { stop(); turn.resetTurn(); }} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors">
                <VolumeX className="w-5 h-5" /> {L.stop}
              </button>
            )}
            {turn.turnError && <p className="text-xs text-amber-800 bg-amber-50 rounded-lg px-3 py-2" role="alert">{turn.turnError}</p>}
            {turn.last && (
              <div className="text-xs space-y-1.5" aria-live="polite">
                <p className="text-[#3D4A40]"><span className="font-semibold">{L.you}</span> {turn.last.you}</p>
                <p className="text-[#1C241E]"><span className="font-semibold">{L.secretary}</span> {turn.last.reply}</p>
                <div className="flex gap-3 pt-1">
                  <button onClick={() => void turn.replayLast()} className="inline-flex items-center gap-1 text-[#1F5E3B] hover:text-[#287549] font-semibold underline underline-offset-2">
                    <RotateCw className="w-3 h-3" /> {L.replayLast}
                  </button>
                  <button onClick={() => turn.setMuted(!turn.muted)} aria-pressed={turn.muted} className="inline-flex items-center gap-1 text-[#1F5E3B] hover:text-[#287549] font-semibold underline underline-offset-2">
                    {turn.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />} {turn.muted ? L.unmute : L.mute}
                  </button>
                </div>
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); const input = (e.currentTarget.elements.namedItem("typed") as HTMLInputElement); void turn.sendTyped(input.value); input.value = ""; }} className="flex gap-2 pt-1">
              <input name="typed" placeholder={L.typePlaceholder} aria-label={L.typePlaceholder} className="flex-1 rounded-lg border border-[#1F5E3B]/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5E3B]/20" />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-[#1F5E3B] hover:bg-[#287549] px-3 py-2 text-white text-xs font-bold transition-colors">
                <Keyboard className="w-3.5 h-3.5" /> {L.typeSend}
              </button>
            </form>
          </div>
        {state === "idle" && (
          <button
            onClick={() => (greetPending && urlRef.current ? (async () => { setGreetPending(false); const a = new Audio(urlRef.current!); ref.current = a; a.onended = () => { set("idle"); releaseAudio("secretaria"); }; a.onerror = () => stop(); claimAudio("secretaria", stop); await a.play().catch(() => stop()); set("playing"); })() : run("secretary-welcome", "es"))}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B] hover:bg-[#287549] px-5 py-3.5 text-white font-bold transition-colors"
          >
            <Volume2 className="w-5 h-5" /> {L.listen}
          </button>
        )}
        {state === "loading" && (
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1F5E3B]/70 px-5 py-3.5 text-white font-bold" aria-busy>
            <Loader2 className="w-5 h-5 animate-spin" /> {L.loading}
          </div>
        )}
        {state === "playing" && (
          <button onClick={stop} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A1F13] hover:bg-[#12301E] px-5 py-3.5 text-white font-bold transition-colors">
            <VolumeX className="w-5 h-5" /> {L.stop}
          </button>
        )}

        <div className="rounded-xl border border-[#1F5E3B]/15 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1F5E3B] mb-3">{L.demo}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {DEMOS.map((d) => {
              const { label, detail } = demoLabel(d.id);
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => run(d.answerId, d.language)}
                  disabled={state === "loading"}
                  className="text-left rounded-lg border border-[#1F5E3B]/20 hover:border-[#1F5E3B]/50 hover:bg-[#1F5E3B]/5 p-3 transition-colors disabled:opacity-50"
                >
                  <Icon className="w-4 h-4 text-[#1F5E3B] mb-1.5" aria-hidden />
                  <div className="text-sm font-semibold text-[#1C241E] leading-tight">{label}</div>
                  <div className="text-[11px] text-[#3D4A40]/80 mt-0.5">{detail}</div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="text-xs font-semibold text-[#1F5E3B] hover:text-[#287549] underline underline-offset-2"
            >
              {expanded ? L.hide : L.transcript}
            </button>
            {standaloneLink && (
              <a href={standaloneLink} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5E3B] hover:text-[#287549]">
                <Headphones className="w-3.5 h-3.5" aria-hidden /> {L.full}
              </a>
            )}
          </div>
          {expanded && (
            <div className="mt-3 text-xs text-[#3D4A40] bg-[#FAF7F0] rounded-lg p-3 leading-relaxed" aria-live="polite">
              {pick(lang,
                "La Secretaria IA responde con la información confirmada del negocio. Cada escenario usa una voz clara en el idioma del visitante.",
                "The AI secretary answers with the business's confirmed info. Each scenario uses a clear voice in the visitor's language.")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
