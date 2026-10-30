import { useCallback, useEffect, useState } from "react";
import { callFn } from "@/lib/plw";
import type { SiteStatus, StoredSite } from "@/lib/saved-site";

/*
  A saved site's lifecycle in the editor: publish the draft, record the
  client's approval, roll back, suspend, archive, the preview link and the
  domain check. Every action goes through kike-sites (PLW repo), which decides
  what is allowed; this only calls it and keeps the latest state.
*/

export type Revision = {
  id: string;
  number: number;
  template_version: number | null;
  note: string | null;
  created_at: string;
  approved_at: string | null;
  approval_note: string | null;
};

export type SiteHistory = { published_revision_id: string | null; revisions: Revision[] };

export type Blocker = "archived" | "no_client" | "approval_required";

/**
 * A publish kike-sites held back, the revision waiting for the client's
 * approval, and whether this caller (an admin, on a first publication) may
 * override it with a reason instead.
 */
export type Held = { blockers: Blocker[]; revision: { id: string; number: number } | null; canOverride: boolean };

/** kike-sites' OVERRIDE_REASON_MIN. */
export const OVERRIDE_REASON_MIN = 10;
/** kike-sites' APPROVAL_NOTE_MIN. */
export const APPROVAL_NOTE_MIN = 10;

export const BASIS_TEXT: Record<NonNullable<StoredSite["published_basis"]>, string> = {
  client_approval: "Client approval / Aprobación del cliente",
  admin_override: "Admin override / Excepción de administrador",
  admin_without_approval: "Admin, no new client approval / Administrador, sin nueva aprobación",
};

export type DomainCheck = {
  domain: string;
  domain_status: StoredSite["domain_status"];
  domain_error: "txt_not_found" | "not_serving" | null;
  txt: { name: string; value: string };
};

export const STATUS_LABEL: Record<SiteStatus, string> = {
  draft: "Draft · Borrador",
  published: "Published · Publicado",
  suspended: "Suspended · Suspendido",
  archived: "Archived · Archivado",
};

export const BLOCKER_TEXT: Record<Blocker, string> = {
  archived: "Restore the site before publishing it. / Restaure el sitio antes de publicarlo.",
  no_client: "Link a PLW client to publish. Demos are shared with the preview link. / Asigne un cliente PLW para publicar; los demos se comparten con la vista previa.",
  approval_required: "This version needs the client's approval. / Esta versión necesita la aprobación del cliente.",
};

function message(e: unknown): string {
  return e instanceof Error ? e.message : "Something went wrong.";
}

export function useSiteLifecycle(siteId: string | null) {
  const [site, setSite] = useState<StoredSite | null>(null);
  const [history, setHistory] = useState<SiteHistory | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [held, setHeld] = useState<Held | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [domainCheck, setDomainCheck] = useState<DomainCheck | null>(null);

  const refresh = useCallback(async () => {
    if (!siteId) return;
    const [got, hist] = await Promise.all([
      callFn<{ site: StoredSite }>("kike-sites", { action: "get", id: siteId }),
      callFn<SiteHistory>("kike-sites", { action: "history", id: siteId }),
    ]);
    setSite(got.site);
    setHistory(hist);
  }, [siteId]);

  useEffect(() => {
    refresh().catch((e) => setError(message(e)));
  }, [refresh]);

  /** One action at a time; a held publish shows its blockers instead of an error. */
  async function run(name: string, action: () => Promise<void>) {
    if (busy || !siteId) return;
    setBusy(name);
    setError(null);
    try {
      await action();
      await refresh();
    } catch (e) {
      const body = (e as { body?: { blockers?: Blocker[]; revision?: { id: string; number: number }; can_override?: boolean } }).body;
      if (body?.blockers) setHeld({ blockers: body.blockers, revision: body.revision ?? null, canOverride: body.can_override === true });
      else setError(message(e));
    } finally {
      setBusy(null);
    }
  }

  const call = (body: Record<string, unknown>) => callFn("kike-sites", { id: siteId, ...body });

  return {
    site,
    history,
    busy,
    held,
    error,
    domainCheck,
    refresh,
    /** Snapshot the current draft as a new revision and publish it. */
    publish: (note: string) => run("publish", async () => {
      setHeld(null);
      await call({ action: "publish", note: note.trim() || null });
    }),
    /**
     * Record that the client approved `revisionId`, with how they did (WhatsApp,
     * call…), then publish it. Only when staff say the client gave it.
     */
    approveAndPublish: (revisionId: string, how: string) => run("approve", async () => {
      await call({ action: "approve_revision", revision_id: revisionId, note: how.trim() });
      setHeld(null);
      await call({ action: "publish", revision_id: revisionId });
    }),
    /** Admins: publish a first version without the client's approval, recorded as an override with its reason. */
    overrideAndPublish: (revisionId: string, reason: string) => run("override", async () => {
      await call({ action: "publish", revision_id: revisionId, override_reason: reason.trim() });
      setHeld(null);
    }),
    /** Publish an earlier revision again (rollback). */
    publishRevision: (revisionId: string) => run(`revision:${revisionId}`, async () => {
      setHeld(null);
      await call({ action: "publish", revision_id: revisionId });
    }),
    setStatus: (status: SiteStatus) => run(`status:${status}`, async () => {
      await call({ action: "set_status", status });
    }),
    rotatePreview: () => run("rotate", async () => {
      await call({ action: "rotate_preview" });
    }),
    verifyDomain: () => run("domain", async () => {
      setDomainCheck(await callFn<DomainCheck>("kike-sites", { action: "verify_domain", id: siteId }));
    }),
  };
}

export type SiteLifecycle = ReturnType<typeof useSiteLifecycle>;
