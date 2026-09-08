import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Radio,
  Power,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Switch } from "@/components/ui/switch";
import { getTemplate } from "@/lib/templates";

type DemoRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  active: boolean;
  createdAt: string;
};

export default function Demos() {
  const [rows, setRows] = useState<DemoRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/customized-sites", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`Server returned ${r.status}`);
        return r.json();
      })
      .then((data: DemoRow[]) => {
        if (!cancelled) setRows(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load demos");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const liveCount = useMemo(() => rows?.filter((r) => r.active).length ?? 0, [rows]);

  async function toggle(row: DemoRow, next: boolean) {
    setBusyId(row.id);
    setError(null);
    // Optimistic update
    setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, active: next } : r)) ?? null);
    try {
      const res = await fetch(`/api/customized-sites/${encodeURIComponent(row.id)}/active`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ active: next }),
      });
      if (!res.ok) throw new Error("Could not update — please try again.");
    } catch (e) {
      // Revert on failure
      setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, active: !next } : r)) ?? null);
      setError(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  function shareUrl(id: string): string {
    return new URL(`${import.meta.env.BASE_URL}share/${id}`, window.location.origin).toString();
  }

  async function copyLink(id: string) {
    try {
      await navigator.clipboard.writeText(shareUrl(id));
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <Radio className="w-6 h-6 text-emerald-500" />
              Live Demos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Demos creados para clientes. Apague un demo y su enlace deja de funcionar al instante.
            </p>
          </div>
          {rows && (
            <div className="text-sm font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              {liveCount} live / {rows.length} total
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        {!rows && !error && (
          <div className="flex items-center gap-2 text-muted-foreground py-16 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading demos…
          </div>
        )}

        {rows && rows.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            No hay demos todavía. / No demos created yet.
          </div>
        )}

        <div className="space-y-3">
          {rows?.map((row) => {
            const tpl = getTemplate(row.slug);
            const dateStr = new Date(row.createdAt).toLocaleDateString("es-NI", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            return (
              <div
                key={row.id}
                className={`rounded-xl border p-4 flex items-center gap-4 transition-colors ${
                  row.active
                    ? "bg-card border-border"
                    : "bg-muted/40 border-border/60 opacity-70"
                }`}
                data-testid={`demo-row-${row.id}`}
              >
                <span
                  className={`shrink-0 w-2.5 h-2.5 rounded-full ${
                    row.active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                  title={row.active ? "Live" : "Off"}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{row.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {tpl ? `${tpl.industry} · ` : ""}
                    {row.city ? `${row.city} · ` : ""}
                    {dateStr}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {row.active ? (
                    <>
                      <a
                        href={shareUrl(row.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                        data-testid={`link-open-${row.id}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Abrir</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyLink(row.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                        data-testid={`button-copy-${row.id}`}
                      >
                        {copiedId === row.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">
                          {copiedId === row.id ? "Copiado" : "Copiar"}
                        </span>
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground px-2">
                      <Power className="w-3.5 h-3.5" /> Apagado
                    </span>
                  )}
                  <Switch
                    checked={row.active}
                    disabled={busyId === row.id}
                    onCheckedChange={(v) => toggle(row, v)}
                    aria-label={row.active ? "Turn demo off" : "Turn demo on"}
                    data-testid={`switch-${row.id}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
