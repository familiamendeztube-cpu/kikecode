/* Live Secretaria IA demo. PLW's plw-secretary-converse owns the limits (3
   conversations per preview link, 10 questions, 5 minutes) and hands out
   one-use ElevenLabs conversation tokens; the page only shows what it returns. */

export const CONVERSE_ENDPOINT = "https://meagbbmittuhdgwnhvxa.supabase.co/functions/v1/plw-secretary-converse";

export type DemoStatus = {
  notice: string;
  closing: string;
  remaining: number;
  limits: { conversations: number; questions: number; minutes: number };
};

export type DemoStart = DemoStatus & (
  | { allowed: true; conversationToken: string; dynamicVariables: Record<string, string | number | boolean> }
  | { allowed: false; message: string }
);

const UNREACHABLE = "No se pudo conectar con la secretaria. Intente de nuevo.";

/** POST {action, token}. A non-2xx answer throws the server's Spanish `error` as-is. */
export async function demoRequest(action: "status", token: string): Promise<DemoStatus>;
export async function demoRequest(action: "start", token: string): Promise<DemoStart>;
export async function demoRequest(action: "status" | "start", token: string): Promise<DemoStatus | DemoStart> {
  let res: Response;
  let data: { error?: unknown };
  try {
    res = await fetch(CONVERSE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, token }),
    });
    data = await res.json();
  } catch {
    throw new Error(UNREACHABLE);
  }
  if (!res.ok) throw new Error(typeof data.error === "string" && data.error ? data.error : UNREACHABLE);
  return data as DemoStatus | DemoStart;
}
