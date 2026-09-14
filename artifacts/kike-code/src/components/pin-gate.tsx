import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import { Lock, Loader2 } from "lucide-react";

/**
 * Full-site PIN gate. Nothing renders until the server session cookie says the
 * visitor already unlocked the site, or they enter the correct PIN
 * (verified server-side via /api/auth/login, which is rate-limited).
 */
export function PinGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`Auth API returned ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setState(d?.authed ? "open" : "locked");
      })
      .catch(() => {
        if (cancelled) return;

        // During the Bolt/Vite development preview, the Replit-era API may not
        // be running yet. Allow the UI to render in development only.
        // Production still fails closed and requires the real server auth.
        if (import.meta.env.DEV) {
          console.warn(
            "Auth API is unavailable; allowing development preview only. Production remains locked.",
          );
          setState("open");
          return;
        }

        setState("locked");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state === "locked") inputRef.current?.focus();
  }, [state]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!pin.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: pin.trim() }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.authed) {
        setState("open");
      } else {
        setError(
          res.status === 429
            ? "Demasiados intentos. Espere unos minutos. / Too many attempts, please wait."
            : "PIN incorrecto / Incorrect PIN",
        );
        setPin("");
        inputRef.current?.focus();
      }
    } catch {
      setError("No se pudo verificar. Intente de nuevo. / Could not verify, try again.");
    } finally {
      setBusy(false);
    }
  }

  if (state === "open") return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {state === "checking" ? (
        <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
      ) : (
        <form
          onSubmit={submit}
          className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center"
        >
          <div className="mx-auto w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mb-5">
            <Lock className="w-6 h-6 text-slate-300" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">Acceso privado</h1>
          <p className="text-sm text-slate-400 mb-6">
            Ingrese el PIN para entrar al sitio.
            <br />
            Enter the PIN to access this site.
          </p>
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="w-full text-center tracking-[0.5em] text-lg font-semibold bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-sky-500 mb-3"
          />
          {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
          <button
            type="submit"
            disabled={busy || !pin.trim()}
            className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-semibold py-3 transition-colors flex items-center justify-center gap-2"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            Entrar / Enter
          </button>
        </form>
      )}
    </div>
  );
}

