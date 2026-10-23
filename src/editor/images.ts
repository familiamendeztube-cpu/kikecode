export const MAX_PHOTO_BYTES = 6 * 1024 * 1024; // 6 MB per file
export const MAX_GALLERY_PHOTOS = 8;
export const MAX_TOTAL_PHOTOS = 12;

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

/**
 * Resize + re-encode an uploaded image to keep the saved payload small.
 * Photos are embedded as base64 in the share-link record, so a raw 6 MB phone
 * photo would blow past the server body limit. We cap the longest edge and
 * re-encode as JPEG. Falls back to the raw data URL if anything goes wrong.
 */
export async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  const rawUrl = await fileToDataUrl(file);
  // SVGs and tiny files don't benefit from canvas re-encoding.
  if (file.type === "image/svg+xml") return rawUrl;
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = rawUrl;
    });
    const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return rawUrl;
    ctx.drawImage(img, 0, 0, w, h);
    const out = canvas.toDataURL("image/jpeg", quality);
    // Guard: if compression somehow produced a larger string, keep the smaller.
    return out.length < rawUrl.length ? out : rawUrl;
  } catch {
    return rawUrl;
  }
}

/** Split picked files into the ones to use and a notice about the rest. */
export function validatePhotos(files: File[], alreadyLoaded: number): { ok: File[]; reason: string | null } {
  const remainingSlots = MAX_TOTAL_PHOTOS - alreadyLoaded;
  if (remainingSlots <= 0) {
    return { ok: [], reason: `Photo limit reached (${MAX_TOTAL_PHOTOS} max). Hit Reset to clear.` };
  }
  const ok: File[] = [];
  let rejected = 0;
  for (const f of files.slice(0, remainingSlots)) {
    if (!f.type.startsWith("image/")) { rejected++; continue; }
    if (f.size > MAX_PHOTO_BYTES) { rejected++; continue; }
    ok.push(f);
  }
  const reason = rejected > 0
    ? `Skipped ${rejected} file(s) — must be images under 6 MB.`
    : null;
  return { ok, reason };
}
