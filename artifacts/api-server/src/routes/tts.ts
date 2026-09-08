import { Router, type IRouter } from "express";
import { createHash } from "node:crypto";
import { z } from "zod";
import { textToSpeech } from "@workspace/integrations-openai-ai-server/audio";

const router: IRouter = Router();

const Query = z.object({
  text: z.string().min(1).max(600),
  voice: z.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]).default("nova"),
});

// Greeting text repeats heavily (same templates, same business names), so cache
// generated audio in memory to avoid paying for identical TTS calls.
const cache = new Map<string, Buffer>();
const MAX_CACHE = 200;

// Coalesce concurrent identical misses so a single upstream call serves them all.
const inFlight = new Map<string, Promise<Buffer>>();

// TTS is a metered, paid upstream call, so cap how often any one client can
// trigger fresh generations. Sliding window per IP.
const RATE_LIMIT = 30; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    // Bound the map: drop entries with no recent activity.
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

router.get("/tts", async (req, res) => {
  const ip = req.ip ?? "unknown";
  if (rateLimited(ip)) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const parsed = Query.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { text, voice } = parsed.data;
  const key = createHash("sha256").update(`${voice}:${text}`).digest("hex");

  let audio = cache.get(key);
  if (audio) {
    // Refresh LRU position.
    cache.delete(key);
    cache.set(key, audio);
  } else {
    try {
      let pending = inFlight.get(key);
      if (!pending) {
        pending = textToSpeech(text, voice, "mp3");
        inFlight.set(key, pending);
        pending.finally(() => inFlight.delete(key));
      }
      audio = await pending;
    } catch (err) {
      req.log.error({ err }, "TTS generation failed");
      res.status(502).json({ error: "Could not generate audio" });
      return;
    }
    if (!audio || audio.length === 0) {
      res.status(502).json({ error: "Empty audio response" });
      return;
    }
    cache.set(key, audio);
    if (cache.size > MAX_CACHE) {
      const oldest = cache.keys().next().value;
      if (oldest) cache.delete(oldest);
    }
  }

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(audio);
});

export default router;
