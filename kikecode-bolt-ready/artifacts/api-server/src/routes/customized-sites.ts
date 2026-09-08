import { Router, type IRouter } from "express";
import { randomBytes } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db, customizedSitesTable } from "@workspace/db";
import { requireTeamAuth } from "./auth";

const router: IRouter = Router();

const MAX_PHOTOS = 12;
const MAX_PHOTO_DATAURL_LEN = 3_000_000; // ~2.2 MB after base64
const MAX_TOTAL_PHOTO_BYTES = 12_000_000; // ~12 MB total

const PhotoDataUrl = z
  .string()
  .max(MAX_PHOTO_DATAURL_LEN, `Photo too large (max ~2 MB each)`)
  .refine((v) => v.startsWith("data:image/") || v.startsWith("http://") || v.startsWith("https://"), {
    message: "Photo must be an image data URL or http(s) URL",
  });

const BrandSchema = z
  .object({
    name: z.string().min(1).max(120),
    city: z.string().min(1).max(120),
    phone: z.string().min(1).max(40),
    phoneHref: z.string().regex(/^tel:[\d+\-\s()]{0,30}$/),
    email: z.string().email().max(160),
    address: z.string().min(1).max(240),
  })
  .strict();

const PhotosSchema = z
  .object({
    hero: PhotoDataUrl.optional(),
    gallery: z.array(PhotoDataUrl).max(MAX_PHOTOS).optional(),
    teamPortrait: PhotoDataUrl.optional(),
  })
  .strict()
  .refine(
    (p) => {
      const all = [p.hero, ...(p.gallery ?? []), p.teamPortrait].filter(Boolean) as string[];
      return all.reduce((n, s) => n + s.length, 0) <= MAX_TOTAL_PHOTO_BYTES;
    },
    { message: "Total photo size too large — please use fewer or smaller photos." },
  );

const MAX_OVERRIDES_BYTES = 12_000_000; // ~12 MB serialized (may embed base64 images)

const SaveBody = z.object({
  slug: z.string().min(1).max(40),
  brand: BrandSchema,
  content: z.object({ en: z.unknown(), es: z.unknown() }),
  photos: PhotosSchema,
  // Deep-partial snapshot of every other editable field. Permissive shape
  // (the client owns it), but bounded in serialized size.
  overrides: z
    .unknown()
    .optional()
    .refine(
      (v) => v === undefined || JSON.stringify(v).length <= MAX_OVERRIDES_BYTES,
      { message: "Customizations too large — please use fewer or smaller photos/videos." },
    ),
});

function newId(): string {
  // 12 url-safe bytes -> ~16 chars, plenty of entropy and short enough to share.
  return randomBytes(9).toString("base64url");
}

router.post("/customized-sites", requireTeamAuth, async (req, res) => {
  const parsed = SaveBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const id = newId();
  try {
    const [row] = await db
      .insert(customizedSitesTable)
      .values({
        id,
        slug: parsed.data.slug,
        brand: parsed.data.brand,
        content: parsed.data.content,
        photos: parsed.data.photos,
        overrides: parsed.data.overrides ?? null,
      })
      .returning();
    res.status(201).json({ id: row!.id, slug: row!.slug });
  } catch (err) {
    req.log.error({ err }, "Failed to save customized site");
    res.status(500).json({ error: "Could not save. Please try again." });
  }
});

// List every demo made for clients (for the Live Demos manager).
router.get("/customized-sites", requireTeamAuth, async (_req, res) => {
  const rows = await db
    .select({
      id: customizedSitesTable.id,
      slug: customizedSitesTable.slug,
      brand: customizedSitesTable.brand,
      active: customizedSitesTable.active,
      createdAt: customizedSitesTable.createdAt,
    })
    .from(customizedSitesTable)
    .orderBy(desc(customizedSitesTable.createdAt));
  res.json(
    rows.map((row) => {
      const brand = (row.brand ?? {}) as { name?: string; city?: string };
      return {
        id: row.id,
        slug: row.slug,
        name: brand.name ?? "(sin nombre)",
        city: brand.city ?? "",
        active: row.active,
        createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
      };
    }),
  );
});

// Turn a demo on/off. Off = the share link stops working for the client.
const ToggleBody = z.object({ active: z.boolean() });
router.patch("/customized-sites/:id/active", requireTeamAuth, async (req, res) => {
  const id = String(req.params.id ?? "");
  if (!id || id.length > 40) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const parsed = ToggleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const [row] = await db
    .update(customizedSitesTable)
    .set({ active: parsed.data.active })
    .where(eq(customizedSitesTable.id, id))
    .returning({ id: customizedSitesTable.id, active: customizedSitesTable.active });
  if (!row) {
    res.status(404).json({ error: "Demo not found" });
    return;
  }
  res.json(row);
});

router.get("/customized-sites/:id", async (req, res) => {
  const id = req.params.id;
  if (!id || id.length > 40) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [row] = await db.select().from(customizedSitesTable).where(eq(customizedSitesTable.id, id));
  if (!row) {
    res.status(404).json({ error: "Demo not found" });
    return;
  }
  if (!row.active) {
    // Demo was turned off by the operator — the share link is disabled.
    res.status(410).json({ error: "Esta demostración ya no está disponible. / This demo is no longer available." });
    return;
  }
  res.json({
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    content: row.content,
    photos: row.photos,
    overrides: row.overrides ?? null,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
  });
});

export default router;
