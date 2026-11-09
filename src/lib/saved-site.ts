import { useEffect, useState } from "react";
import { getTemplate } from "@/templates";
import type { BusinessTemplate } from "@/templates/types";
import { fnUrl, hasPlwConfig, TEMPLATE_ASSETS } from "@/lib/plw";

/** A site as the `kike-sites` function returns it. */
export type SavedSite = {
  id: string;
  slug: string;
  brand: {
    name: string; city: string; phone: string; phoneHref: string;
    email: string; address: string; whatsapp?: string;
  };
  content: { en: unknown; es: unknown };
  photos: { hero?: string; gallery?: string[]; teamPortrait?: string };
  overrides?: unknown;
  /** templateVersion(slug) when this content was saved; null before versions existed. */
  template_version?: number | null;
};

export type SiteStatus = "draft" | "published" | "suspended" | "archived";
export type DomainStatus = "none" | "pending" | "verified" | "active";

/** The stored row an editor loads (`kike-sites` action "get"): the draft plus its lifecycle. */
export type StoredSite = SavedSite & {
  client_id: string | null;
  former_client_id: string | null;
  custom_domain: string | null;
  status: SiteStatus;
  published_revision_id: string | null;
  published_at: string | null;
  /** Why the live version went public: the client's approval, an admin override, or an admin without new approval. */
  published_basis: "client_approval" | "admin_override" | "admin_without_approval" | null;
  published_basis_note: string | null;
  preview_token: string;
  domain_status: DomainStatus;
  domain_token: string | null;
  domain_error: string | null;
};

/** The unlisted link that shows a site's current draft (send it to the client for review). */
export function previewUrl(token: string): string {
  return new URL(`/preview/${token}`, window.location.origin).toString();
}

/** Where the published site lives: its own domain once that serves it, else the share link. */
export function publishedUrl(site: { id: string; custom_domain: string | null; domain_status: DomainStatus }): string {
  return site.custom_domain && site.domain_status === "active"
    ? `https://${site.custom_domain}`
    : new URL(`/share/${site.id}`, window.location.origin).toString();
}

/**
 * Replace-arrays merge: when source has an array, it fully REPLACES the target's
 * array (the AI is instructed to send complete arrays). For objects, recurse.
 * Primitives in source override target.
 */
export function mergeReplaceArrays<T>(target: T, source: unknown): T {
  if (source === null || source === undefined) return target;
  if (Array.isArray(source)) return source as T;
  if (typeof source !== "object") return source as T;
  if (target === null || target === undefined || typeof target !== "object" || Array.isArray(target)) {
    return source as T;
  }
  const out: Record<string, unknown> = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    out[key] = mergeReplaceArrays(
      (target as Record<string, unknown>)[key],
      (source as Record<string, unknown>)[key],
    );
  }
  return out as T;
}

/**
 * Rebuild the full template a saved site describes. `live` marks a published
 * view: its forms then send leads to PLW under the site's id. The editor passes
 * false so trying the form while editing never creates a lead.
 */
export function rebuildTemplate(base: BusinessTemplate, saved: SavedSite, live: boolean): BusinessTemplate {
  // Sites saved before the stock files moved to PLW storage store "/template-assets/..." paths.
  saved = JSON.parse(JSON.stringify(saved).replaceAll('"/template-assets/', `"${TEMPLATE_ASSETS}/`));
  // Apply the generic overrides (every non brand/content/photo field) first,
  // then let the dedicated brand/content/photo columns win on top.
  const withOverrides = saved.overrides
    ? mergeReplaceArrays(base, saved.overrides)
    : base;
  const next: BusinessTemplate = {
    ...withOverrides,
    brand: { ...withOverrides.brand, ...saved.brand },
    content: mergeReplaceArrays(withOverrides.content, saved.content),
    plwSiteId: live ? saved.id : undefined,
  };
  if (saved.photos && (saved.photos.hero || saved.photos.gallery?.length || saved.photos.teamPortrait)) {
    // Layer uploaded photos on top of the (possibly overridden) media so that
    // edited videos/posters/etc. survive while photos win for their fields.
    const baseMedia = next.media ?? { hero: "", gallery: [], teamPortrait: "" };
    next.media = {
      ...baseMedia,
      hero: saved.photos.hero ?? baseMedia.hero,
      gallery: saved.photos.gallery && saved.photos.gallery.length > 0
        ? saved.photos.gallery
        : baseMedia.gallery,
      teamPortrait: saved.photos.teamPortrait ?? baseMedia.teamPortrait,
    };
  }
  return next;
}

/** What kike-sites accepts as a photo: an upload (data URL) or a web link, never a stock template file. */
const UPLOADED = /^(data:image\/|https?:\/\/)/;

/**
 * The `photos` a save sends: the uploaded images in the media being saved. Read
 * at save time, so a photo swapped or removed anywhere in the editor (upload
 * buttons, "Change photo", the media panel) is stored as shown.
 */
export function uploadedPhotos(media: BusinessTemplate["media"]): SavedSite["photos"] {
  if (!media) return {};
  const isUpload = (value: unknown): value is string =>
    typeof value === "string" && UPLOADED.test(value) && !value.startsWith(TEMPLATE_ASSETS);
  return {
    hero: isUpload(media.hero) ? media.hero : undefined,
    teamPortrait: isUpload(media.teamPortrait) ? media.teamPortrait : undefined,
    gallery: media.gallery?.filter(isUpload),
  };
}

export type PublishedSite =
  | { status: "ok"; template: BusinessTemplate }
  | { status: "notfound" }
  | { status: "disabled" }
  | { status: "error"; message: string };

/** A published site by id (share links) or a client's domain, or a draft by its preview token. */
export type SiteQuery = { id: string } | { domain: string } | { preview: string };

function queryString(query: SiteQuery): string {
  if ("id" in query) return `id=${encodeURIComponent(query.id)}`;
  if ("domain" in query) return `domain=${encodeURIComponent(query.domain)}`;
  return `preview=${encodeURIComponent(query.preview)}`;
}

/**
 * Load a site for visitors. A preview renders the draft with no site id, so
 * its forms show they are a preview and never create a lead.
 */
export async function loadPublishedSite(query: SiteQuery): Promise<PublishedSite> {
  if (!hasPlwConfig) return { status: "error", message: "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set." };
  try {
    const res = await fetch(`${fnUrl("kike-sites")}?${queryString(query)}`);
    if (res.status === 404) return { status: "notfound" };
    if (res.status === 410) return { status: "disabled" };
    if (!res.ok) return { status: "error", message: `Server returned ${res.status}` };
    const saved = (await res.json()) as SavedSite;
    const base = getTemplate(saved.slug);
    if (!base) return { status: "error", message: `Template "${saved.slug}" no longer exists.` };
    return { status: "ok", template: rebuildTemplate(base, saved, !("preview" in query)) };
  } catch (e) {
    return { status: "error", message: e instanceof Error ? e.message : "Could not load the site." };
  }
}

/** The site for an id, domain or preview token; null while it loads. */
export function usePublishedSite(query: SiteQuery): PublishedSite | null {
  const key = queryString(query);
  const [site, setSite] = useState<PublishedSite | null>(null);
  useEffect(() => {
    let cancelled = false;
    setSite(null);
    loadPublishedSite(query).then((result) => {
      if (!cancelled) setSite(result);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return site;
}
