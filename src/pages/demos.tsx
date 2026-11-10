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
  Eye,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Switch } from "@/components/ui/switch";
import { getTemplate } from "@/templates";
import { callFn } from "@/lib/plw";
import { previewUrl, publishedUrl, type DomainStatus, type SiteStatus } from "@/lib/saved-site";
import { DOMAIN_STATUS_LABEL, STATUS_LABEL } from "@/editor/lifecycle";
import { pick } from "@/lib/i18n";
import { useOperatorLang } from "@/lib/operator-lang";

/** A row of the `kike-sites` "list" action. */
type SiteRow = {
  id: string;
  slug: string;
  title: string;
  city: string | null;
  client_id: string | null;
  client_name: string | null;
  custom_domain: string | null;
  domain_status: DomainStatus;
  status: SiteStatus;
  preview_token: string;
  /** The latest publish: a republish restarts it. */
  published_at: string | null;
  created_at: string;
};

const DAY_MS = 86_400_000;

export default function Demos() {
  const { lang } = useOperatorLang();
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
        if (!cancelled) setError(e instanceof Error ? e.message : pick(lang, "Could not load sites", "No se pudieron cargar los sitios"));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const liveCount = useMemo(() => rows?.filter((r) => r.status === "published").length ?? 0, [rows]);

  /** Suspend or resume a site that has been published; drafts go live from the editor. */
  async function toggle(row: SiteRow, next: boolean) {
    const status: SiteStatus = next ? "published" : "suspended";
    setBusyId(row.id);
    setError(null);
    // Optimistic update
    setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, status } : r)) ?? null);
    try {
      await callFn("kike-sites", { action: "set_status", id: row.id, status });
    } catch (e) {
      // Revert on failure
      setRows((cur) => cur?.map((r) => (r.id === row.id ? { ...r, status: row.status } : r)) ?? null);
      setError(e instanceof Error ? e.message : pick(lang, "Could not update", "No se pudo actualizar"));
    } finally {
      setBusyId(null);
    }
  }

  async function copyLink(row: SiteRow) {
    try {
      await navigator.clipboard.writeText(row.status === "published" ? publishedUrl(row) : previewUrl(row.preview_token));
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
              {pick(lang, "Live Demos", "Demos en vivo")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {pick(
                lang,
                "Saved sites and demos. A draft can only be seen through its preview link; suspend a published site and it stops showing within a minute.",
                "Sitios y demos guardados. Un borrador solo se ve con su enlace de vista previa; suspenda un sitio publicado y deja de verse en un minuto.",
              )}
            </p>
          </div>
          {rows && (
            <div className="text-sm font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              {pick(lang, `${liveCount} live / ${rows.length} total`, `${liveCount} en vivo / ${rows.length} en total`)}
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
            <Loader2 className="w-5 h-5 animate-spin" /> {pick(lang, "Loading demos…", "Cargando demos…")}
          </div>
        )}

        {rows && rows.length === 0 && (
          <div className="text-center text-muted-foreground py-16">
            {pick(lang, "No demos created yet.", "No hay demos todavía.")}
          </div>
        )}

        <div className="space-y-3">
          {rows?.map((row) => {
            const tpl = getTemplate(row.slug);
            const live = row.status === "published";
            const locale = lang === "es" ? "es-CR" : "en-US";
            const dateStr = new Date(row.created_at).toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            // How long a live site has been up, so staff can end a one-week trial (Suspend).
            const publishedAgo = live && row.published_at
              ? new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
                  -Math.floor((Date.now() - Date.parse(row.published_at)) / DAY_MS),
                  "day",
                )
              : null;
            return (
              <div
                key={row.id}
                className={`rounded-xl border p-4 flex items-center gap-4 transition-colors ${
                  live || row.status === "draft"
                    ? "bg-card border-border"
                    : "bg-muted/40 border-border/60 opacity-70"
                }`}
                data-testid={`demo-row-${row.id}`}
              >
                <span
                  className={`shrink-0 w-2.5 h-2.5 rounded-full ${
                    live ? "bg-emerald-500 animate-pulse" : row.status === "draft" ? "bg-amber-400" : "bg-slate-400"
                  }`}
                  title={STATUS_LABEL[row.status][lang]}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{row.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {STATUS_LABEL[row.status][lang]} · {tpl ? `${pick(lang, tpl.industry, tpl.industryEs)} · ` : ""}
                    {row.city ? `${row.city} · ` : ""}
                    {row.client_name ?? "Demo"}
                    {row.custom_domain ? ` · ${row.custom_domain}${row.domain_status === "active" ? "" : ` (${DOMAIN_STATUS_LABEL[row.domain_status][lang]})`}` : ""}
                    {` · ${dateStr}`}
                    {publishedAgo && ` · ${pick(lang, "Published", "Publicado")} ${publishedAgo}`}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Link
                    href={`/sites/${row.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                    data-testid={`link-edit-${row.id}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{pick(lang, "Edit", "Editar")}</span>
                  </Link>
                  {row.status !== "archived" && (
                    <a
                      href={previewUrl(row.preview_token)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                      data-testid={`link-preview-${row.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{pick(lang, "Preview", "Vista previa")}</span>
                    </a>
                  )}
                  {live ? (
                    <>
                      <a
                        href={publishedUrl(row)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-border hover:bg-foreground/5 transition-colors"
                        data-testid={`link-open-${row.id}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{pick(lang, "Open", "Abrir")}</span>
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
                          {copiedId === row.id ? pick(lang, "Copied", "Copiado") : pick(lang, "Copy", "Copiar")}
                        </span>
                      </button>
                    </>
                  ) : row.status === "suspended" && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground px-2">
                      <Power className="w-3.5 h-3.5" /> {pick(lang, "Off", "Apagado")}
                    </span>
                  )}
                  {(live || row.status === "suspended") && (
                    <Switch
                      checked={live}
                      disabled={busyId === row.id}
                      onCheckedChange={(v) => toggle(row, v)}
                      aria-label={live ? pick(lang, "Suspend site", "Suspender sitio") : pick(lang, "Resume site", "Reactivar sitio")}
                      data-testid={`switch-${row.id}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
