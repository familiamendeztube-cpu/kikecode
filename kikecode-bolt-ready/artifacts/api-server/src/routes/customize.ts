import { Router, type IRouter } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are a friendly bilingual AI assistant helping a Latino sales agent turn a website template into a finished site for one of their small-business clients.

You will receive:
- The current website data (brand info, English + Spanish copy)
- A short chat history with the agent
- A new message from the agent (which may include a full description of the client's business)
- Optionally, one or more CLIENT PHOTOS the agent attached (these are already placed on the live site's hero + gallery)

Your job: return a JSON patch (via the \`update_website\` tool) that rewrites the site to be about THIS client, plus a short friendly reply.

RULES:
1. Respond in the SAME language as the agent's latest message (English or Spanish). Match their register.
2. BE THOROUGH. When the agent describes a business (name, city, services, what makes them special, years in business, service area, etc.), rewrite the WHOLE page so it reads like it was built for that exact client — do NOT just change the phone and email. Update the brand fields AND the content: hero (eyebrow, title1, title2, subtitle, badges), services (title + items), why-us items, process steps, faq, testimonials, the contact section (including its \`services\` dropdown list), footer tagline, and nav labels where relevant.
3. ALWAYS keep \`en\` and \`es\` in sync. Everything you write in English, also write in natural Spanish (and vice-versa). Never leave one language stale.
4. Tone changes ("hazlo más elegante", "make it more aggressive"): rewrite hero + services + why in both languages to match.
5. Keep titles punchy (a few words). Keep blurbs to 1–2 sentences.
6. NEVER invent or change certifications, license numbers, awards, ratings, or specific years of experience unless the agent explicitly provided them. If the agent gives a number ("25 years"), you may use it. Otherwise leave such claims out.
7. ARRAY FIELDS (services.items, why.items, process.items, faq.items, testimonials.items, hero.badges, contact.services, galleryCaptions): when you change an array you MUST return the COMPLETE replacement array — every item you want to keep, not just the one you changed. A returned array fully replaces the old one.
8. PHOTOS: if the agent attached client photos, they are already shown on the site. Do not try to place them yourself, but DO write \`galleryCaptions\` (short EN + ES captions, one per photo, in order) that describe what's likely in those photos for this business, and make the copy reflect that the site now shows their real work.
9. Return ONLY what changed (omit unchanged fields). Your "reply" is 1–3 short conversational sentences to the agent confirming what you changed.
10. Phone numbers: format like "(555) 123-4567"; phoneHref must start with "tel:" then only digits/+.`;

const UPDATE_TOOL = {
  name: "update_website",
  description: "Return the patch to apply to the website plus your conversational reply.",
  input_schema: {
    type: "object" as const,
    properties: {
      reply: {
        type: "string",
        description: "1–3 sentence conversational reply to the sales agent, in their language.",
      },
      brand: {
        type: "object",
        properties: {
          name: { type: "string" },
          city: { type: "string" },
          phone: { type: "string" },
          phoneHref: { type: "string", description: "Must start with tel: followed only by digits and +" },
          email: { type: "string" },
          address: { type: "string" },
        },
      },
      content: {
        type: "object",
        description: "Patch for the bilingual copy. Provide en and/or es. Each locale may include: nav, hero, services, why, process, testimonials, faq, contact, footer.",
        properties: {
          en: { type: "object", additionalProperties: true },
          es: { type: "object", additionalProperties: true },
        },
      },
      galleryCaptions: {
        type: "object",
        description: "Short captions for the gallery photos, one per photo, in order. Provide both en and es arrays of the same length.",
        properties: {
          en: { type: "array", items: { type: "string" } },
          es: { type: "array", items: { type: "string" } },
        },
      },
    },
    required: ["reply"],
  },
};

/* -------- Zod schemas (lenient: unknown keys are stripped, not rejected) ---------- */

const Text = z.string().min(1).max(300);
const LongText = z.string().min(1).max(1200);

const BrandFieldSchemas = {
  name: Text,
  city: Text,
  phone: z.string().min(1).max(40),
  phoneHref: z.string().regex(/^tel:[\d+\-\s()]{3,30}$/),
  email: z.string().email().max(160),
  address: Text,
} as const;

const ItemSchema = z.object({ title: Text.optional(), blurb: LongText.optional() });
const FaqItemSchema = z.object({ q: Text.optional(), a: LongText.optional() });
const TestimonialItemSchema = z.object({
  name: Text.optional(),
  role: Text.optional(),
  quote: LongText.optional(),
});

const HeroPatchSchema = z.object({
  eyebrow: Text.optional(),
  title1: Text.optional(),
  title2: Text.optional(),
  subtitle: LongText.optional(),
  cta1: Text.optional(),
  cta2: Text.optional(),
  badges: z.array(Text).max(8).optional(),
  ratingTitle: Text.optional(),
  ratingSubtitle: Text.optional(),
  trustTitle: Text.optional(),
  trustSubtitle: Text.optional(),
});

const SectionPatchSchema = z.object({
  title: Text.optional(),
  blurb: LongText.optional(),
  items: z.array(ItemSchema).max(16).optional(),
});

const NavPatchSchema = z.object({
  services: Text.optional(),
  why: Text.optional(),
  process: Text.optional(),
  testimonials: Text.optional(),
  faq: Text.optional(),
  contact: Text.optional(),
  call: Text.optional(),
});

const ContactPatchSchema = z.object({
  title: Text.optional(),
  blurb: LongText.optional(),
  name: Text.optional(),
  phone: Text.optional(),
  service: Text.optional(),
  message: Text.optional(),
  submit: Text.optional(),
  success: LongText.optional(),
  pick: Text.optional(),
  services: z.array(Text).max(16).optional(),
});

const FooterPatchSchema = z.object({
  tagline: Text.optional(),
  hours: Text.optional(),
  hoursLabel: Text.optional(),
  rights: Text.optional(),
});

/** Section key -> schema. Each locale is sanitized section-by-section so one
 *  malformed section never discards the rest of the patch. */
const LOCALE_SECTIONS = {
  nav: NavPatchSchema,
  hero: HeroPatchSchema,
  services: SectionPatchSchema,
  why: SectionPatchSchema,
  process: SectionPatchSchema,
  testimonials: z.object({ title: Text.optional(), items: z.array(TestimonialItemSchema).max(10).optional() }),
  faq: z.object({ title: Text.optional(), items: z.array(FaqItemSchema).max(12).optional() }),
  contact: ContactPatchSchema,
  footer: FooterPatchSchema,
} as const;

const CaptionsSchema = z.object({
  en: z.array(z.string().min(1).max(140)).max(12).optional(),
  es: z.array(z.string().min(1).max(140)).max(12).optional(),
});

/** Keep only the brand fields that individually validate. */
function sanitizeBrand(raw: unknown): Record<string, string> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const src = raw as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const [key, schema] of Object.entries(BrandFieldSchemas)) {
    if (src[key] === undefined) continue;
    const parsed = schema.safeParse(src[key]);
    if (parsed.success) out[key] = parsed.data as string;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Keep only the content sections that individually validate. */
function sanitizeLocale(raw: unknown): Record<string, unknown> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const src = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [key, schema] of Object.entries(LOCALE_SECTIONS)) {
    if (src[key] === undefined) continue;
    const parsed = schema.safeParse(src[key]);
    if (parsed.success && parsed.data && Object.keys(parsed.data).length) {
      out[key] = parsed.data;
    }
  }
  return Object.keys(out).length ? out : undefined;
}

function sanitizeCaptions(raw: unknown): { en?: string[]; es?: string[] } | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const parsed = CaptionsSchema.safeParse(raw);
  if (!parsed.success) return undefined;
  const out: { en?: string[]; es?: string[] } = {};
  if (parsed.data.en?.length) out.en = parsed.data.en;
  if (parsed.data.es?.length) out.es = parsed.data.es;
  return out.en || out.es ? out : undefined;
}

const RequestBodySchema = z.object({
  slug: z.string().min(1).max(40),
  industry: z.string().min(1).max(80).optional(),
  currentBrand: z.record(z.string(), z.unknown()),
  currentContent: z.object({ en: z.unknown(), es: z.unknown() }),
  chatHistory: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(4000) }))
    .max(40),
  userMessage: z.string().min(1).max(4000),
  photoCount: z.number().int().min(0).max(100).optional(),
  // Optional client photos (compressed data URLs) the agent attached in chat.
  images: z.array(z.string().min(1).max(2_000_000)).max(6).optional(),
});

type ImageBlock = {
  type: "image";
  source: { type: "base64"; media_type: "image/jpeg" | "image/png" | "image/webp" | "image/gif"; data: string };
};

/** Turn a data URL into an Anthropic image block, or null if unsupported. */
function toImageBlock(dataUrl: string): ImageBlock | null {
  const m = /^data:(image\/(?:jpeg|png|webp|gif));base64,(.+)$/i.exec(dataUrl);
  if (!m) return null;
  return {
    type: "image",
    source: { type: "base64", media_type: m[1].toLowerCase() as ImageBlock["source"]["media_type"], data: m[2] },
  };
}

/* -------- Simple in-memory rate limiter ---------- */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12; // 12 customize calls per minute per IP
const hits = new Map<string, number[]>();

function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const arr = hits.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

router.post("/customize", async (req, res) => {
  try {
    const baseURL = process.env.ANTHROPIC_BASE_URL ?? process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
    const apiKey = process.env.ANTHROPIC_API_KEY ?? process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "AI integration not configured" });
      return;
    }

    const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
    if (!rateLimitOk(ip)) {
      res.status(429).json({ error: "Too many requests. Wait a minute and try again." });
      return;
    }

    const parsedBody = RequestBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({ error: "Invalid request", details: parsedBody.error.issues.slice(0, 3) });
      return;
    }
    const body = parsedBody.data;

    const client = new Anthropic({ ...(baseURL ? { baseURL } : {}), apiKey });

    const imageBlocks = (body.images ?? [])
      .map(toImageBlock)
      .filter((b): b is ImageBlock => b !== null);
    const attachedCount = imageBlocks.length;
    const totalPhotos = body.photoCount ?? attachedCount;

    const photoNote = attachedCount
      ? `The agent just attached ${attachedCount} client photo(s) (shown below). They are ALREADY placed on the site's hero + gallery. Do not place them yourself — instead write galleryCaptions (${totalPhotos} short captions in EN and ES, in order) and make the copy reflect that the site shows their real work.`
      : totalPhotos
        ? `The agent has uploaded ${totalPhotos} client photo(s) which already replaced the hero/gallery images on the live preview — you don't need to handle photos, but you may write galleryCaptions for them.`
        : "";

    const contextBlock = `CURRENT WEBSITE STATE (for slug "${body.slug}", industry: ${body.industry ?? body.slug}):

BRAND:
${JSON.stringify(body.currentBrand, null, 2)}

CONTENT (EN):
${JSON.stringify(body.currentContent.en, null, 2)}

CONTENT (ES):
${JSON.stringify(body.currentContent.es, null, 2)}

${photoNote}`;

    const finalUserContent: Anthropic.ContentBlockParam[] = [{ type: "text", text: body.userMessage }];
    for (const block of imageBlocks) finalUserContent.push(block as unknown as Anthropic.ContentBlockParam);

    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: contextBlock },
      ...body.chatHistory.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: finalUserContent },
    ];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      tools: [UPDATE_TOOL],
      tool_choice: { type: "tool", name: "update_website" },
      messages,
    });

    const toolBlock = response.content.find((c) => c.type === "tool_use");
    if (!toolBlock || toolBlock.type !== "tool_use") {
      res.status(500).json({ error: "AI did not return a structured response" });
      return;
    }

    // Salvage per-field/per-section: never drop the whole patch because one field
    // is malformed. Keep everything that individually validates.
    const raw = (toolBlock.input ?? {}) as Record<string, unknown>;
    const rawReply = raw.reply;
    const reply =
      typeof rawReply === "string" && rawReply.trim().length > 0
        ? rawReply.slice(0, 800)
        : "Done — I updated the site.";

    const brand = sanitizeBrand(raw.brand);
    const rawContent = (raw.content ?? {}) as Record<string, unknown>;
    const en = sanitizeLocale(rawContent.en);
    const es = sanitizeLocale(rawContent.es);
    const captions = sanitizeCaptions(raw.galleryCaptions);

    const out: {
      reply: string;
      brand?: Record<string, string>;
      content?: { en?: unknown; es?: unknown };
      galleryCaptions?: { en?: string[]; es?: string[] };
    } = { reply };
    if (brand) out.brand = brand;
    if (en || es) out.content = { ...(en ? { en } : {}), ...(es ? { es } : {}) };
    if (captions) out.galleryCaptions = captions;

    res.json(out);
  } catch (err) {
    req.log.error({ err }, "customize route failed");
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
