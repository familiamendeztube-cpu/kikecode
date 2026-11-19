/* Two-way voice turn for the Secretaria IA: records one short mic turn,
   sends it (or a typed question) to PLW's plw-secretary-converse, and returns
   the grounded reply. The reply's audio is always spoken by the existing
   plw-tourism-voice endpoint via the returned answerId — no client synthesis. */

export const CONVERSE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-secretary-converse";
export const MAX_TURN_MS = 15_000;

/** Chrome/Android record WebM/Opus; Safari (iOS 14.3+) records MP4. */
export function pickRecorderMime(): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/mpeg"];
  return candidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? null;
}

export function mimeExt(mime: string): string {
  if (mime.includes("webm")) return "webm";
  if (mime.includes("mp4")) return "m4a";
  if (mime.includes("mpeg")) return "mp3";
  return "bin";
}

export type MicProblem = "unavailable" | "denied" | "other";

export function micProblem(err: unknown): MicProblem {
  const name = err instanceof DOMException ? err.name : "";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "unavailable";
  if (name === "NotAllowedError" || name === "SecurityError") return "denied";
  return "other";
}

export type ConverseResult = { transcript: string; reply: string; answerId: string; language: "es" | "en" | "zh" };

/** One turn: token + (audio file | typed text) + language. Never cookies or keys. */
export async function converse(token: string, language: "es" | "en" | "auto", turn: { audio?: Blob; mime?: string; text?: string }): Promise<ConverseResult> {
  const form = new FormData();
  form.append("token", token);
  form.append("language", language);
  if (turn.audio && turn.mime) {
    form.append("audio", turn.audio, `turn.${mimeExt(turn.mime)}`);
  } else if (turn.text) {
    form.append("text", turn.text.replace(/[<>]/g, "").trim().slice(0, 500));
  } else {
    throw new Error("empty turn");
  }
  const res = await fetch(CONVERSE_ENDPOINT, { method: "POST", body: form });
  if (!res.ok) throw new Error(String(res.status));
  const data = (await res.json()) as Partial<ConverseResult>;
  if (typeof data.transcript !== "string" || typeof data.reply !== "string" || typeof data.answerId !== "string" || !data.answerId) {
    throw new Error("bad response");
  }
  return {
    transcript: data.transcript,
    reply: data.reply,
    answerId: data.answerId,
    language: data.language === "en" || data.language === "zh" ? data.language : "es",
  };
}
