import { Router, type IRouter, type RequestHandler } from "express";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

const router: IRouter = Router();

const COOKIE_NAME = "kc_session";
// Session version — bump the suffix to instantly invalidate ALL existing
// sessions (everyone gets logged out and must re-enter the PIN).
const COOKIE_VALUE = "ok-v2";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

// The display identity shown in the operator bar once logged in.
const OPERATOR = { name: "Gersson", role: { en: "Sales Advisor", es: "Asesor de Ventas" } };

const LoginBody = z.object({ password: z.string().min(1).max(200) });

// Simple in-memory per-IP rate limit to slow brute force on the access code.
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 1000 * 60 * 15;
const MAX_ATTEMPTS = 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

// Site-wide access PIN. Keep this in deployment secrets; never commit the real value.
const ACCESS_PIN: string = process.env.ACCESS_PIN ?? "";

if (!ACCESS_PIN) {
  throw new Error("ACCESS_PIN environment variable is required");
}

function passwordMatches(input: string): boolean {
  const expected = ACCESS_PIN;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function isAuthed(req: import("express").Request): boolean {
  return req.signedCookies?.[COOKIE_NAME] === COOKIE_VALUE;
}

// Express middleware: gate operator-only routes behind the team session cookie.
// Public routes (gallery data, share retrieval, TTS for share pages) must NOT
// use this — only state-changing / metered operator actions.
export const requireTeamAuth: RequestHandler = (req, res, next) => {
  if (isAuthed(req)) {
    next();
    return;
  }
  res.status(401).json({ error: "Sign in required" });
};

function cookieOpts() {
  return {
    httpOnly: true as const,
    signed: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_MS,
    path: "/",
  };
}

router.post("/auth/login", (req, res) => {
  const ip = req.ip ?? "unknown";
  if (rateLimited(ip)) {
    res.status(429).json({ error: "Too many attempts. Please wait a few minutes and try again." });
    return;
  }
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  if (!passwordMatches(parsed.data.password.trim())) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }
  res.cookie(COOKIE_NAME, COOKIE_VALUE, cookieOpts());
  res.json({ authed: true, operator: OPERATOR });
});

router.get("/auth/me", (req, res) => {
  res.json(isAuthed(req) ? { authed: true, operator: OPERATOR } : { authed: false });
});

router.post("/auth/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOpts(), maxAge: undefined });
  res.json({ authed: false });
});

export default router;
