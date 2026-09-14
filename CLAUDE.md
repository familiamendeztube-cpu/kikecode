# KikeCode

Bilingual (en/es) website-demo builder for Latino small businesses. Operators pick an industry template, customize it (brand, photos, AI-written copy), and share a live demo link with the client. Originally built on Replit; migrated for Bolt / local dev (see `BOLT_MIGRATION.md`).

## Layout (pnpm monorepo)

- `artifacts/kike-code/` — Vite 7 + React 19 + Tailwind 4 frontend. Router is `wouter` (`src/App.tsx`). shadcn/ui in `src/components/ui/`.
  - `src/lib/templates/` — one file per industry template, registered in `index.ts`; shape in `types.ts`. `BRAND_OVERRIDES` names must match the prerecorded MP3 greetings in `enrichments.ts`.
  - `src/components/pin-gate.tsx` — whole app sits behind an operator PIN (`/api/auth/me`). In `import.meta.env.DEV` only, it opens if the API is unreachable.
  - Client domains (`src/lib/domain-sites.ts`) bypass the PIN gate and render one site full-page.
- `artifacts/api-server/` — Express 5 API, bundled with esbuild (`build.mjs`) to `dist/index.mjs`. Routes in `src/routes/`, all mounted under `/api`.
  - `auth` (PIN login, signed cookie), `customized-sites` (Postgres), `customize` + `generate` (Anthropic), `tts` (OpenAI).
  - Operator-only routes use `requireTeamAuth`; public share routes must not.
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
- Bolt runs only the frontend (browser WebContainer). The Express API + Postgres must be hosted elsewhere, or ported to Bolt/Supabase functions.
- The Replit Postgres data was not migrated; a fresh DB starts empty.
