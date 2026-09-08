# KikeCode → Bolt migration

This repository was reconstructed from the eight Replit ZIP parts on 2026-09-08.

## What was cleaned

- Removed Replit runtime metadata (`.replit`, `.replit-artifact`, `replit.md`).
- Removed the Replit-only mockup sandbox.
- Removed the top-level `attached_assets/` scratch/reference folder. Runtime template assets are already in `artifacts/kike-code/public/template-assets/`.
- Removed Replit-only Vite plugins.
- Added portable local port defaults and a Vite `/api` development proxy.
- Replaced the hard-coded operator access PIN with `ACCESS_PIN`.
- Added support for standard `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` secret names (legacy Replit names still work as fallbacks).
- Added `.env.example` and secret ignore rules.

## App layout

- `artifacts/kike-code/` — Vite + React frontend.
- `artifacts/api-server/` — Express API used by the frontend.
- `lib/db/` — PostgreSQL + Drizzle schema/client.
- `lib/api-*` — generated API client/schema packages.
- `lib/integrations-openai-ai-server/` — OpenAI server integration.

## Local development

1. Install Node.js 24 and pnpm.
2. Copy `.env.example` to `.env` and fill the required secrets.
3. Run `pnpm install`.
4. Run `pnpm dev`.

The web app runs on port 5173 and proxies `/api` to the Express API on port 8080.

## Important Bolt deployment note

The frontend can be imported into Bolt as a Vite project, but the current backend is a long-running Express server. Bolt Cloud's native backend model is server/edge functions. Before publishing KikeCode entirely on Bolt Cloud, port the Express routes under `artifacts/api-server/src/routes/` to Bolt/Supabase server functions, or deploy the Express API separately and point the frontend at that API.

## Database

The code expects PostgreSQL via `DATABASE_URL`. The ZIP export contains schema/code only, not the live Replit PostgreSQL data. Export the Replit database separately if existing customized-site/demo records must be preserved.

## Required secrets

At minimum, depending on which features are enabled:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ACCESS_PIN`
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`

Do not commit real values.

## Validation note

The source tree and package metadata were statically validated after reconstruction. A fresh `pnpm install` / full build could not be executed in the migration sandbox because outbound npm registry access was unavailable. Run `pnpm install --frozen-lockfile` and `pnpm build` as the first CI/Bolt validation step.
