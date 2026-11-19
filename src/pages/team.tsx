import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle, Check, Copy, KeyRound, Loader2, UserPlus } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSwap } from "@/components/icon-swap";
import { ADMIN_ROLES, useStaff } from "@/components/staff-gate";
import { callFn } from "@/lib/plw";
import { pick } from "@/lib/i18n";
import { useOperatorLang } from "@/lib/operator-lang";

/*
  Equipo (admins only): who signs in to Kike Code, each with a personal code.
  PLW's kike-staff-codes function does the work and says which roles this admin
  may give and manage. A code is shown once, right after it is made.
*/

type Person = {
  id: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  last_used_at: string | null;
  manageable: boolean;
};

const ROLE_LABEL: Record<string, [string, string]> = {
  agent: ["Agent", "Agente"],
  supervisor: ["Supervisor", "Supervisor"],
  admin: ["Admin", "Administrador"],
  super_admin: ["Super admin", "Superadministrador"],
};

const DAY_MS = 86_400_000;
const staffCodes = <T,>(body: Record<string, unknown>) => callFn<T>("kike-staff-codes", body);

export default function Team() {
  const { lang } = useOperatorLang();
  const isAdmin = ADMIN_ROLES.includes(useStaff().role);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("agent");
  /** "create", or the id of the person being changed. */
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** The code just made, shown until "Done". */
  const [shown, setShown] = useState<{ name: string; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function roleLabel(r: string) {
    const [en, es] = ROLE_LABEL[r] ?? [r, r];
    return pick(lang, en, es);
  }

  async function load() {
    const data = await staffCodes<{ people: Person[]; roles: string[] }>({ action: "list" });
    setPeople(data.people);
    setRoles(data.roles);
  }

  useEffect(() => {
    if (isAdmin) load().catch(() => setError(pick(lang, "Could not load the team.", "No se pudo cargar el equipo.")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function run(key: string, action: () => Promise<void>) {
    if (busy) return;
    setBusy(key);
    setError(null);
    try {
      await action();
      await load();
    } catch {
      setError(pick(lang, "That did not work. Try again.", "No se pudo. Intente de nuevo."));
    } finally {
      setBusy(null);
    }
  }

  function show(personName: string, code: string) {
    setShown({ name: personName, code });
    setCopied(false);
  }

  function addPerson(e: FormEvent) {
    e.preventDefault();
    const fullName = name.trim();
    void run("create", async () => {
      const { code } = await staffCodes<{ code: string }>({ action: "create", full_name: fullName, role });
      show(fullName, code);
      setName("");
    });
  }

  const newCode = (p: Person) => run(p.id, async () => {
    const { code } = await staffCodes<{ code: string }>({ action: "new_code", user_id: p.id });
    show(p.full_name ?? "", code);
  });

  function deactivate(p: Person) {
    const sure = window.confirm(pick(
      lang,
      `Switch off ${p.full_name}? Their code stops working and they are signed out now.`,
      `¿Desactivar a ${p.full_name}? Su código deja de funcionar y se le cierra la sesión ahora.`,
    ));
    if (sure) void run(p.id, async () => { await staffCodes({ action: "deactivate", user_id: p.id }); });
  }

  async function copyCode() {
    if (!shown) return;
    try {
      await navigator.clipboard.writeText(shown.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the code is on screen to copy by hand */
    }
  }

  function lastSeen(p: Person): string {
    if (!p.is_active) return pick(lang, "Switched off", "Desactivado");
    if (!p.last_used_at) return pick(lang, "Has not signed in yet", "Todavía no ha entrado");
    const days = Math.floor((Date.now() - Date.parse(p.last_used_at)) / DAY_MS);
    const ago = new Intl.RelativeTimeFormat(lang === "es" ? "es-CR" : "en-US", { numeric: "auto" }).format(-days, "day");
    return pick(lang, `Signed in ${ago}`, `Entró ${ago}`);
  }

  if (!isAdmin) {
    return (
      <Layout>
        <p className="text-muted-foreground">{pick(lang, "Only admins manage the team.", "Solo los administradores manejan el equipo.")}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">{pick(lang, "Team", "Equipo")}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {pick(
            lang,
            "Each person signs in to Kike Code with their own code. Hand it over in person or by WhatsApp, and switch it off when they leave.",
            "Cada persona entra a Kike Code con su propio código. Entrégueselo en persona o por WhatsApp, y desactívelo cuando se vaya.",
          )}
        </p>
      </div>

      {shown && (
        <div role="status" className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5">
          <p className="text-sm">{pick(lang, `${shown.name}'s code:`, `Código de ${shown.name}:`)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {/* Monospace on purpose: in a code every character has to be told apart. */}
            <span className="font-mono text-2xl font-bold tracking-[0.2em]" data-testid="text-new-code">{shown.code}</span>
            <Button size="sm" variant="secondary" onClick={copyCode}>
              <IconSwap swapped={copied} from={<Copy className="w-3.5 h-3.5" />} to={<Check className="w-3.5 h-3.5" />} />
              {copied ? pick(lang, "Copied", "Copiado") : pick(lang, "Copy", "Copiar")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShown(null)}>{pick(lang, "Done", "Listo")}</Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {pick(lang, "Copy it now: it is not shown again. If it gets lost, make a new one.", "Cópielo ahora: no se vuelve a mostrar. Si se pierde, genere uno nuevo.")}
          </p>
        </div>
      )}

      <form onSubmit={addPerson} className="mb-8 flex flex-wrap items-end gap-3 border-y border-border/60 py-5">
        <label className="flex-1 min-w-48 space-y-1.5">
          <span className="text-xs font-semibold text-muted-foreground">{pick(lang, "Name", "Nombre")}</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="Ana Mora" data-testid="input-team-name" />
        </label>
        <label className="space-y-1.5">
          <span className="block text-xs font-semibold text-muted-foreground">{pick(lang, "Role", "Rol")}</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm" data-testid="select-team-role">
            {roles.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}
          </select>
        </label>
        <Button type="submit" disabled={!!busy || name.trim().length < 2} data-testid="button-team-add">
          {busy === "create" ? <Loader2 className="animate-spin" /> : <UserPlus />}
          {pick(lang, "Add person", "Agregar persona")}
        </Button>
      </form>

      {error && (
        <p className="mb-4 flex items-center gap-1.5 text-sm text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </p>
      )}

      {people === null ? (
        !error && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" /> {pick(lang, "Loading the team…", "Cargando el equipo…")}
          </p>
        )
      ) : people.length === 0 ? (
        <p className="text-sm text-muted-foreground">{pick(lang, "Nobody has a code yet.", "Todavía nadie tiene código.")}</p>
      ) : (
        <ul className="divide-y divide-border/60">
          {people.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 py-3" data-testid={`row-person-${p.id}`}>
              <div className="min-w-0 flex-1">
                <div className={`font-semibold truncate ${p.is_active ? "" : "text-muted-foreground"}`}>{p.full_name}</div>
                <div className="text-xs text-muted-foreground">{roleLabel(p.role)} · {lastSeen(p)}</div>
              </div>
              {p.manageable && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" disabled={!!busy} onClick={() => void newCode(p)}>
                    {busy === p.id ? <Loader2 className="animate-spin" /> : <KeyRound />}
                    {p.is_active ? pick(lang, "New code", "Nuevo código") : pick(lang, "Switch on with a new code", "Activar con código nuevo")}
                  </Button>
                  {p.is_active && (
                    <Button size="sm" variant="ghost" disabled={!!busy} onClick={() => deactivate(p)} className="text-red-400 hover:text-red-300">
                      {pick(lang, "Switch off", "Desactivar")}
                    </Button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
