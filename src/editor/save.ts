import { crPhone } from "@/lib/cr";
import { callFn } from "@/lib/plw";
import { previewUrl, uploadedPhotos, type SiteStatus } from "@/lib/saved-site";
import { templateVersion } from "@/templates";
import type { BusinessTemplate } from "@/templates/types";

/** A site already saved in PLW: saving again updates it instead of creating a new one. */
export type SavedSiteRef = { id: string; clientId: string | null; customDomain: string | null };

/** The client info the drawer edits as plain text fields. */
export type BrandFields = Pick<BusinessTemplate["brand"], "name" | "phone" | "city" | "address" | "email">;

export function brandFields({ name, phone, city, address, email }: BusinessTemplate["brand"]): BrandFields {
  return { name, phone, city, address, email };
}

/** The content kike-sites stores for a site: what `save` sends and a revision freezes. */
export function sitePayload(slug: string, fields: BrandFields, tpl: BusinessTemplate) {
  // Snapshot every editable field beyond brand/content/photos so panel + inline
  // edits round-trip. JSON round-trip strips functions (icons) and undefined.
  const overrides = JSON.parse(
    JSON.stringify({
      brand: tpl.brand,
      media: tpl.media,
      offers: tpl.offers,
      galleryCaptions: tpl.galleryCaptions,
      assistant: tpl.assistant,
      availability: tpl.availability,
      videoGallery: tpl.videoGallery,
      transformation: tpl.transformation,
      clientTrust: tpl.clientTrust,
      projectSelector: tpl.projectSelector,
      inventory: tpl.inventory,
      heritage: tpl.heritage,
      // Read by the edge function that writes the site's <head> (src/lib/site-meta.ts).
      lockedLang: tpl.lockedLang,
      defaultLang: tpl.defaultLang,
      // Staff's confirmation that reviews and claims are true (else they show as samples).
      contentConfirmed: tpl.contentConfirmed,
    }),
  );
  return {
    slug,
    template_version: templateVersion(slug),
    // Apply any pending form-field edits before saving; the phone in Costa Rican format.
    brand: { ...fields, ...crPhone(fields.phone) },
    content: tpl.content,
    photos: uploadedPhotos(tpl.media),
    overrides,
  };
}

/**
 * Save the draft through `kike-sites`. Saving never changes what visitors see:
 * it resolves the site's id, its status and the preview link to send the client.
 */
export async function saveSite({ siteId, slug, fields, tpl, clientId, customDomain }: {
  siteId: string | null;
  slug: string;
  fields: BrandFields;
  tpl: BusinessTemplate;
  clientId: string;
  customDomain: string;
}): Promise<{ id: string; status: SiteStatus; url: string }> {
  const saved = await callFn<{ id: string; status: SiteStatus; preview_token: string }>("kike-sites", {
    action: "save",
    id: siteId,
    ...sitePayload(slug, fields, tpl),
    client_id: clientId || null,
    custom_domain: customDomain.trim() || null,
  });
  return { id: saved.id, status: saved.status, url: previewUrl(saved.preview_token) };
}

/** Bilingual message for a failed save, from the error `callFn` threw. */
export function saveErrorMessage(e: unknown): string {
  const code = e instanceof Error ? e.message : "";
  const fields = (e as { fields?: string[] }).fields ?? [];
  return code === "domain_taken" ? "Ese dominio ya está en otro sitio. / That domain is already used by another site."
    : code === "invalid_payload" ? `Revise / Check: ${describeInvalidFields(fields)}`
      : code === "payload_too_large" ? "Demasiadas fotos o muy pesadas. / Too many or too large photos."
        : code === "reassign_first" ? "Para cambiar el cliente de este sitio, pídaselo a un administrador. / Ask an admin to move this site to another client."
          : code === "archived" ? "Este sitio está archivado: restáurelo para editarlo. / This site is archived: restore it to edit."
            : code === "domain_requires_client" ? "Asigne un cliente PLW antes de agregar un dominio. / Link a PLW client before adding a domain."
              : code === "conflict" ? "Alguien cambió este sitio al mismo tiempo. Recargue e intente de nuevo. / Someone changed this site at the same time. Reload and try again."
                : code || "Could not save the site.";
}

/**
 * The save failed validation: say which fields, from the names kike-sites
 * reports ("brand.email", "brand.address", "custom_domain", "overrides", ...).
 */
function describeInvalidFields(fields: string[]): string {
  // TODO(human): friendly labels (e.g. "brand.email" → "correo / email").
  return fields.length ? fields.join(", ") : "nombre, teléfono, ciudad, dirección, correo y dominio / client info and domain";
}
