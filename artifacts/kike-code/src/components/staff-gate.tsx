import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { Lock, Loader2 } from "lucide-react";
import { callFn, hasPlwConfig, supabase } from "@/lib/plw";

/*
  The operator app is for PLW staff, signed in with their PLW account. Same flow
  as PLW's /acceso: email + password, then the 6-digit code the
  `email-login-code` function emails. A password-only session is held back
  until that code upgrades it, so Kike Code is never a way around the code.
*/

const STAFF_ROLES = ["super_admin", "admin", "supervisor", "agent"];

/** Mirrors needsEmailCode in PLW's AuthContext: reads the JWT's `amr` claim. */
function needsEmailCode(session: Session | null): boolean {
  if (!session?.access_token) return false;
  try {
    const part = session.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const amr: unknown = JSON.parse(atob(part))?.amr;
    return Array.isArray(amr) && amr.length > 0 && amr.every((entry) => entry?.method === "password");
  } catch {
    return false;
  }
}

type GateState = "checking" | "signin" | "code" | "open" | "forbidden";

const inputClass =
  "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 mb-3";
const buttonClass =
  "w-full rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2";

export function StaffGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const challenge = useRef<string | null>(null);

  async function evaluate(session: Session | null) {
    if (!session) return setState("signin");
    if (needsEmailCode(session)) return setState("code");
    const { data } = await supabase.from("profiles").select("role, is_active").eq("id", session.user.id).maybeSingle();
    const staff = !!data && data.is_active !== false && STAFF_ROLES.includes(String(data.role));
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

  async function sendCode() {
    setError(null);
    try {
      const { challenge: issued } = await callFn<{ challenge: string }>("email-login-code", { action: "send", language: "es" });
      challenge.current = issued;
      setNotice("Le enviamos un código a su correo. / We emailed you a code.");
    } catch {
      setError("No se pudo enviar el código. Intente de nuevo en unos minutos. / Could not send the code.");
    }
  }

  async function signIn(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) {
      setError("Correo o contraseña incorrectos. / Wrong email or password.");
    } else {
      setPassword("");
      await sendCode();
    }
    setBusy(false);
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    if (busy || !challenge.current) return;
    setBusy(true);
    setError(null);
    try {
      const { token_hash } = await callFn<{ token_hash: string }>("email-login-code", {
        action: "verify", challenge: challenge.current, code: code.trim(),
      });
      challenge.current = null;
      const { error: verifyError } = await supabase.auth.verifyOtp({ token_hash, type: "magiclink" });
      if (verifyError) throw verifyError;
      setCode("");
      setNotice(null);
    } catch {
      setError("Código incorrecto o vencido. / Wrong or expired code.");
    }
    setBusy(false);
  }

  async function signOut() {
    challenge.current = null;
    setNotice(null);
    setError(null);
    await supabase.auth.signOut();
  }

  if (state === "open") return <>{children}</>;

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
          Esta cuenta no es del equipo PLW. / This account is not PLW staff.
        </p>
        <button type="button" onClick={signOut} className={buttonClass}>Salir / Sign out</button>
      </>
    );
  } else if (state === "code") {
    body = (
      <form onSubmit={verify}>
        <p className="text-sm text-slate-400 mb-6">
          {notice ?? "Ingrese el código que le enviamos por correo. / Enter the code we emailed you."}
        </p>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          className={`${inputClass} text-center tracking-[0.5em] text-lg font-semibold`}
        />
        {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
        <button type="submit" disabled={busy || !challenge.current || code.trim().length < 6} className={buttonClass}>
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Verificar / Verify
        </button>
        <div className="flex justify-between mt-4 text-xs">
          <button type="button" onClick={sendCode} className="text-sky-400 hover:text-sky-300">Enviar otro código / Resend</button>
          <button type="button" onClick={signOut} className="text-slate-400 hover:text-slate-300">Salir / Sign out</button>
        </div>
      </form>
    );
  } else {
    body = (
      <form onSubmit={signIn}>
        <p className="text-sm text-slate-400 mb-6">
          Entre con su cuenta de PLW. / Sign in with your PLW account.
        </p>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username"
          placeholder="correo@professionallatinoworkers.com" className={inputClass} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
          placeholder="Contraseña / Password" className={inputClass} />
        {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
        <button type="submit" disabled={busy || !email.trim() || !password} className={buttonClass}>
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Entrar / Sign in
        </button>
      </form>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
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
