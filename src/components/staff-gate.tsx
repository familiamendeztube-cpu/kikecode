import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { Lock, Loader2 } from "lucide-react";
import { callFn, hasPlwConfig, supabase } from "@/lib/plw";
import { PRESS } from "@/components/ui/button";

/*
  The operator app is for PLW staff, each signed in with their own 8-character
  code (owner decision 2026-11-18: no email, no password). Admins hand codes out
  on the Equipo page (/equipo). PLW's `kike-staff-codes` function checks a code
  and returns a one-time token that becomes a normal Supabase session, so
  kike-sites and kike-ai still know who is calling.
*/

const STAFF_ROLES = ["super_admin", "admin", "supervisor", "agent"];
export const ADMIN_ROLES = ["super_admin", "admin"];

/** A session from the old email + password sign-in that never got its emailed code (JWT `amr`): not let in. */
function passwordOnly(session: Session): boolean {
  try {
    const part = session.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const amr: unknown = JSON.parse(atob(part))?.amr;
    return Array.isArray(amr) && amr.length > 0 && amr.every((entry) => entry?.method === "password");
  } catch {
    return false;
  }
}

/** "k7pm4q" → "K7PM-4Q": capitals, with the dash after four, the way codes are handed out. */
function formatCode(input: string): string {
  const chars = input.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  return chars.length > 4 ? `${chars.slice(0, 4)}-${chars.slice(4)}` : chars;
}

type GateState = "checking" | "signin" | "open" | "forbidden";

/** The signed-in staff member's role, for what only admins see (Equipo). */
const StaffContext = createContext({ role: "" });
export const useStaff = () => useContext(StaffContext);

const buttonClass =
  `w-full rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-3 flex items-center justify-center gap-2 ${PRESS}`;
/** On a wrong code: red, and a shake (so it is noticed). */
const wrongClass = " border-red-500! motion-safe:animate-shake";

export function StaffGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>("checking");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  /** The error is a wrong code (not, say, a network failure). */
  const [wrong, setWrong] = useState(false);
  const [busy, setBusy] = useState(false);

  async function evaluate(session: Session | null) {
    if (!session) return setState("signin");
    // Signing out comes back here with no session.
    if (passwordOnly(session)) return void supabase.auth.signOut();
    const { data, error } = await supabase.from("profiles").select("role, is_active").eq("id", session.user.id).maybeSingle();
    // This re-runs on every token refresh. A failed lookup (say, the network
    // waking from sleep) must not close an open gate: that unmounts the editor
    // and throws away unsaved edits.
    if (error) return setState((s) => (s === "open" ? s : "forbidden"));
    const staff = !!data && data.is_active !== false && STAFF_ROLES.includes(String(data.role));
    setRole(staff ? String(data.role) : "");
    setState(staff ? "open" : "forbidden");
  }

  useEffect(() => {
    if (!hasPlwConfig) return;
    supabase.auth.getSession().then(({ data }) => evaluate(data.session));
    // Deferred: awaiting supabase calls inside this callback can deadlock the client.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => void evaluate(session), 0);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function signIn(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setWrong(false);
    try {
      const { token_hash } = await callFn<{ token_hash: string }>("kike-staff-codes", { action: "sign_in", code });
      const { error: verifyError } = await supabase.auth.verifyOtp({ token_hash, type: "magiclink" });
      if (verifyError) throw verifyError;
      setCode("");
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 400 || status === 401) {
        setError("Código incorrecto. / Wrong code.");
        setWrong(true);
      } else if (status === 429) {
        setError("Demasiados intentos. Intente de nuevo más tarde. / Too many tries. Try again later.");
      } else {
        setError("No se pudo entrar. Intente de nuevo. / Could not sign in. Try again.");
      }
    }
    setBusy(false);
  }

  if (state === "open") return <StaffContext.Provider value={{ role }}>{children}</StaffContext.Provider>;

  let body: ReactNode;
  if (!hasPlwConfig) {
    body = (
      <p className="text-sm text-slate-400">
        Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (los mismos valores que usa PLW).
      </p>
    );
  } else if (state === "checking") {
    body = <Loader2 className="w-8 h-8 text-slate-500 animate-spin mx-auto" />;
  } else if (state === "forbidden") {
    body = (
      <>
        <p className="text-sm text-slate-400 mb-6">
          Esta cuenta no es del equipo o está desactivada. / This account is not staff, or it is switched off.
        </p>
        <button type="button" onClick={() => void supabase.auth.signOut()} className={buttonClass}>Salir / Sign out</button>
      </>
    );
  } else {
    body = (
      <form onSubmit={signIn}>
        <p className="text-sm text-slate-400 mb-6">
          Ingrese su código personal. / Enter your personal code.
        </p>
        {/* Monospace on purpose: in a code every character has to be told apart. */}
        <input
          value={code}
          onChange={(e) => setCode(formatCode(e.target.value))}
          aria-label="Código / Code"
          aria-invalid={wrong}
          placeholder="XXXX-XXXX"
          autoFocus
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={9}
          className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 mb-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 text-center font-mono text-xl tracking-[0.25em]${wrong ? wrongClass : ""}`}
        />
        {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
        <button type="submit" disabled={busy || code.length < 9} className={buttonClass}>
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar / Sign in
        </button>
        <p className="mt-4 text-sm text-slate-400">
          ¿No tiene código o lo perdió? Pídaselo a un administrador. / No code, or lost it? Ask an admin.
        </p>
      </form>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-5">
          <Lock className="w-6 h-6 text-slate-300" />
        </div>
        <h1 className="text-xl font-semibold text-white mb-1">Kike Code</h1>
        {body}
      </div>
    </div>
  );
}
