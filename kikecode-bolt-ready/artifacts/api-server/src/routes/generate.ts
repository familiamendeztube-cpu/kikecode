import { Router, type IRouter } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You match a small-business description to the best-fitting website template.

You receive a short command/description from the user about a business they want a website for, plus a list of available base templates (each has a slug + industry). Every base already ships with professional photos and a complete bilingual layout.

Your only job: pick the SINGLE base template whose industry most closely matches the business the user described, and return its slug as "baseSlug". Choose the closest fit even if it is not exact (e.g. a taquería or food truck → a restaurant template; a mobile mechanic → an auto template). "baseSlug" MUST be exactly one of the provided slugs.

Also write "reply": one short, friendly sentence (in the user's language) telling them which template you started from and that they can now edit everything. Respond ONLY via the tool "pick_template".`;

const PICK_TOOL = {
  name: "pick_template",
  description: "Return the chosen base template slug and a short reply.",
  input_schema: {
    type: "object" as const,
    properties: {
      baseSlug: { type: "string", description: "slug of the chosen base template — must match one of the provided slugs" },
      reply: { type: "string", description: "one short friendly sentence in the user's language" },
    },
    required: ["baseSlug", "reply"],
  },
};

const ResultSchema = z
  .object({
    baseSlug: z.string().min(1).max(40),
    reply: z.string().min(1).max(400),
  })
  .strict();

const RequestBodySchema = z.object({
  prompt: z.string().min(1).max(4000),
  templates: z
    .array(
      z.object({
        slug: z.string().min(1).max(40),
        industry: z.string().min(1).max(80),
        industryEs: z.string().max(80).optional(),
      }),
    )
    .min(1)
    .max(80),
});

/* -------- Simple in-memory rate limiter ---------- */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10; // 10 template picks per minute per IP
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

router.post("/generate-template", async (req, res) => {
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
    const validSlugs = new Set(body.templates.map((t) => t.slug));

    const client = new Anthropic({ ...(baseURL ? { baseURL } : {}), apiKey });

    const templateList = body.templates
      .map((t) => `- slug "${t.slug}" — ${t.industry}${t.industryEs ? ` / ${t.industryEs}` : ""}`)
      .join("\n");

    const contextBlock = `USER REQUEST:
${body.prompt}

AVAILABLE BASE TEMPLATES (choose baseSlug from exactly these slugs):
${templateList}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [PICK_TOOL],
      tool_choice: { type: "tool", name: "pick_template" },
      messages: [{ role: "user", content: contextBlock }],
    });

    const toolBlock = response.content.find((c) => c.type === "tool_use");
    if (!toolBlock || toolBlock.type !== "tool_use") {
      res.status(500).json({ error: "AI did not return a structured response" });
      return;
    }

    const parsed = ResultSchema.safeParse(toolBlock.input);
    if (!parsed.success) {
      req.log.warn({ issues: parsed.error.issues }, "AI returned invalid pick result");
      // Fall back to the first template rather than failing the flow.
      res.json({ baseSlug: body.templates[0].slug, reply: "Started you from a template — edit anything below." });
      return;
    }

    const result = parsed.data;
    // Guard: baseSlug must be one we offered; otherwise fall back to the first.
    if (!validSlugs.has(result.baseSlug)) {
      result.baseSlug = body.templates[0].slug;
    }

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "generate-template route failed");
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

export default router;
