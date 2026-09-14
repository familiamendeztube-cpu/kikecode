# KikeCode

Bilingual (en/es) website-demo builder for Latino small businesses. Operators pick an industry template, customize it (brand, photos, AI-written copy), and share a live demo link with the client. Originally built on Replit; migrated for Bolt / local dev (see `BOLT_MIGRATION.md`).

## Layout (pnpm monorepo)

- `artifacts/kike-code/` — Vite 7 + React 19 + Tailwind 4 frontend. Router is `wouter` (`src/App.tsx`). shadcn/ui in `src/components/ui/`.
  - `src/lib/templates/` — one file per industry template, registered in `index.ts`; shape in `types.ts`. `BRAND_OVERRIDES` names must match the prerecorded MP3 greetings in `enrichments.ts`.
  - **Backend = Professional Latino Workers' Supabase project** (`src/lib/plw.ts`; env `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, read from the repo-root `.env`). Saved sites: PLW's `kike-sites` function (table `kike_sites`). Editor AI + greeting audio: `kike-ai`. Contact forms: `lead-intake`, through `submitLead(template.plwSiteId, …)`. Those functions live in the PLW repo (`supabase/functions/kike-*`, `docs/KIKECODE_WEBSITE_INTEGRATION.md`).
  - `src/components/staff-gate.tsx` — the operator app needs a PLW staff account (email + password + emailed code, like PLW's `/acceso`). `/share/:id` and `/video/:id` stay public.
  - Client domains: the hand-built ones are mapped in `src/lib/domain-sites.ts`; any other non-localhost host is looked up as a saved site's `custom_domain` (`ClientDomainSite`) before the operator app renders.
  - `template.plwSiteId` is set only on a published site loaded from PLW, so forms in template previews and the editor never create leads. A published site's phone is the client's PLW number once one is assigned (set server-side); the typed number moves to `brand.whatsapp`, which WhatsApp buttons use.
- `artifacts/api-server/` — **legacy** Express 5 API that the Replit deployment still runs; the web app no longer calls it. Retire it (with `lib/db`) once Replit is switched off.
- `lib/db/` — Drizzle + `pg`. Schema in `src/schema/`. `DATABASE_URL` is required at import time.
- `lib/api-spec/` — OpenAPI spec; `pnpm --filter @workspace/api-spec run codegen` (orval) regenerates `lib/api-client-react` and `lib/api-zod`. Never hand-edit `src/generated/`.
- `lib/integrations-openai-ai-server/` — OpenAI client; throws at import if `OPENAI_API_KEY` is unset.

## Commands

Root scripts call pnpm through `npx pnpm@10.17.1`, so only npm needs to be installed.

| Task | Command |
|---|---|
| Frontend dev (5173) | `npm run dev` |
| API dev (8080) | `npm run dev:api` |
| Both | `npm run dev:full` |
| Build frontend | `npm run build` → `artifacts/kike-code/dist/public` |
| Typecheck everything | `npm run typecheck` |
| Push DB schema | `DATABASE_URL=... npx pnpm@10.17.1 --filter @workspace/db run push` |

Vite proxies `/api` → `http://localhost:8080`. Frontend calls use relative `/api/...` paths.

## Local setup

1. `cp .env.example .env` and fill it in. The API dev script loads the root `.env` via `node --env-file-if-exists`; Vite does not read it.
   Required for the API to boot: `DATABASE_URL`, `ACCESS_PIN`, `OPENAI_API_KEY`. `SESSION_SECRET` signs the cookie. AI routes need real `ANTHROPIC_API_KEY` / `OPENAI_API_KEY`.
2. No Postgres installed? Run PGlite as a throwaway server (data in gitignored `.local/`):
   `mkdir .local; npx @electric-sql/pglite-socket --db=./.local/pglite --port=5432 --max-connections=10`
   with `DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/postgres`.
3. Push the schema (table above), then `npm run dev:full`.

Smoke test: `GET /api/healthz` → `{"status":"ok"}`; `POST /api/auth/login {"password": ACCESS_PIN}` → sets `kc_session`.

## Gotchas

- **Don't re-add Replit's platform-binary overrides** to `pnpm-workspace.yaml` (`"esbuild>@esbuild/darwin-arm64": "-"` etc.). They stripped every native binary except linux-x64 and broke Windows, macOS and Bolt. Only the `esbuild` pin and `@esbuild-kit` override remain.
- `minimumReleaseAge: 1440` in `pnpm-workspace.yaml` is intentional (supply-chain defense) — don't remove it.
- Dependency versions shared across packages live in the pnpm `catalog:`; use `catalog:` in package.json rather than a literal version.
- Scripts must work on Windows: no `export VAR=...`, no `rm -rf` in npm scripts. Save JSON as UTF-8 **without BOM** (Windows PowerShell 5.1 adds one by default).
- drizzle-kit globbing breaks on Windows backslash paths — keep `schema` in `lib/db/drizzle.config.ts` relative.
- Bolt runs only the frontend (browser WebContainer), which is all Kike Code needs now: its backend is PLW's Supabase functions. The Express API + Postgres only matter to the Replit deployment.
- The Replit Postgres data was not migrated; a fresh DB starts empty.
