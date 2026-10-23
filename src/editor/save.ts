import { callFn } from "@/lib/plw";
import { uploadedPhotos } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/templates/types";

/** A site already saved in PLW: saving again updates it instead of creating a new one. */
export type SavedSiteRef = { id: string; clientId: string | null; customDomain: string | null };

/** The client info the drawer edits as plain text fields. */
export type BrandFields = Pick<BusinessTemplate["brand"], "name" | "phone" | "city" | "address" | "email">;

export function brandFields({ name, phone, city, address, email }: BusinessTemplate["brand"]): BrandFields {
  return { name, phone, city, address, email };
}

export function sanitizePhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 3 ? `tel:${digits}` : "tel:";
}

/** Save the draft through `kike-sites`; resolves its id and the link to send the client. */
export async function saveSite({ siteId, slug, fields, tpl, clientId, customDomain }: {
  siteId: string | null;
  slug: string;
  fields: BrandFields;
  tpl: BusinessTemplate;
  clientId: string;
  customDomain: string;
}): Promise<{ id: string; url: string }> {
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
    }),
  );
  const { id } = await callFn<{ id: string }>("kike-sites", {
    action: "save",
    id: siteId,
    slug,
    // Apply any pending form-field edits before saving.
    brand: { ...fields, phoneHref: sanitizePhoneHref(fields.phone) },
    content: tpl.content,
    photos: uploadedPhotos(tpl.media),
    overrides,
    client_id: clientId || null,
    custom_domain: customDomain.trim() || null,
  });
  const domain = customDomain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const url = domain ? `https://${domain}` : new URL(`/share/${id}`, window.location.origin).toString();
  return { id, url };
}

/** Bilingual message for a failed save, from the error `callFn` threw. */
export function saveErrorMessage(e: unknown): string {
  const code = e instanceof Error ? e.message : "";
  const fields = (e as { fields?: string[] }).fields ?? [];
  return code === "domain_taken" ? "Ese dominio ya está en otro sitio. / That domain is already used by another site."
    : code === "invalid_payload" ? `Revise / Check: ${describeInvalidFields(fields)}`
      : code === "payload_too_large" ? "Demasiadas fotos o muy pesadas. / Too many or too large photos."
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
