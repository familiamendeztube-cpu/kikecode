import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Headphones, Languages, Moon, ShoppingCart, Volume2, VolumeX, Loader2 } from "lucide-react";
import type { Lang } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { claimAudio, releaseAudio } from "@/sites/shared/site-audio";

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

  async function run(id: string, language: "es" | "en" | "zh") {
    set("loading");
    setGreetPending(false);
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
