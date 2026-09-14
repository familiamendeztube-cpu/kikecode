import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Radio,
  Power,
  Pencil,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Switch } from "@/components/ui/switch";
import { getTemplate } from "@/lib/templates";
import { callFn } from "@/lib/plw";

/** A row of the `kike-sites` "list" action. */
type SiteRow = {
  id: string;
  slug: string;
  title: string;
  city: string | null;
  client_id: string | null;
  client_name: string | null;
  custom_domain: string | null;
  active: boolean;
  created_at: string;
};

export default function Demos() {
  const [rows, setRows] = useState<SiteRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    callFn<{ sites: SiteRow[] }>("kike-sites", { action: "list" })
      .then(({ sites }) => {
        if (!cancelled) setRows(sites);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Could not load sites");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const liveCount = useMemo(() => rows?.filter((r) => r.active).length ?? 0, [rows]);

  async function toggle(row: SiteRow, next: boolean) {
    setBusyId(row.id);
    setError(null);
    // Optimistic update
    setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, active: next } : r)) ?? null);
    try {
      await callFn("kike-sites", { action: "set_active", id: row.id, active: next });
    } catch (e) {
      // Revert on failure
      setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, active: !next } : r)) ?? null);
      setError(e instanceof Error ? e.message : "Could not update");
    } finally {
      setBusyId(null);
    }
  }

  function siteUrl(row: SiteRow): string {
    if (row.custom_domain) return `https://${row.custom_domain}`;
    return new URL(`${import.meta.env.BASE_URL}share/${row.id}`, window.location.origin).toString();
  }

  async function copyLink(row: SiteRow) {
    try {
      await navigator.clipboard.writeText(siteUrl(row));
      setCopiedId(row.id);
      setTimeout(() => setCopiedId((c) => (c === row.id ? null : c)), 1500);
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
              Sitios y demos guardados. Apague uno y su enlace deja de funcionar al instante.
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
            const dateStr = new Date(row.created_at).toLocaleDateString("es-CR", {
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
                  <div className="font-semibold truncate">{row.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {tpl ? `${tpl.industry} · ` : ""}
                    {row.city ? `${row.city} · ` : ""}
                    {row.client_name ?? "Demo"}
                    {row.custom_domain ? ` · ${row.custom_domain}` : ""}
                    {` · ${dateStr}`}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    href={`/sites/${row.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                    data-testid={`link-edit-${row.id}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Editar</span>
                  </Link>
                  {row.active ? (
                    <>
                      <a
                        href={siteUrl(row)}
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
                        onClick={() => copyLink(row)}
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
