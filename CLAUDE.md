# KikeCode

Bilingual (en/es) website-demo builder for Latino small businesses. Operators pick an industry template, customize it (brand, photos, AI-written copy), and share a live demo link with the client.

One Vite 7 + React 19 + Tailwind 4 app at the repo root; router is `wouter` (`src/App.tsx`). There is no server of its own.

## Layout (`src/`)

- `templates/` — one file per template holds everything about it: brand, copy, media, assistant, offers, `facts`, `category`, `realBusiness`. Register new ones in `index.ts`; the shape is `types.ts`. Bump `TEMPLATE_VERSIONS` in `index.ts` when a change could alter sites already saved from a template, and never remove a slug sites use (`registry.test.ts` lists them).
- `sites/` — the public sites clients see. `site-renderer.tsx` picks the component by `template.siteVariant`.
  - `business/` — the shared site for every template without a variant. `business-site.tsx` is only the section order; each section takes `SiteProps` and renders nothing when the template has no data for it. Static copy and fallbacks are in `data.ts`, small parts in `ui.tsx`.
  - `rym/`, `fenix/`, `leonardo-site.tsx`, `oryzo-site.tsx` — hand-built sites.
  - `shared/` — used across sites: `whatsappLink(brand, text)` (all wa.me links), `useLeadForm` (every lead form: pending, sent, preview, failed), `FadeInView`, `useReturnFocus` (spread on a Radix `Dialog.Content` opened from plain buttons).
- `editor/` — the operator's customizer. `customizer.tsx` holds the state; `panels.tsx` only renders; `save.ts` (kike-sites save), `lifecycle.ts` (publish, approve, rollback, status, domain check), `ai.ts` (kike-ai), `images.ts` (compression, Storage uploads) and `edit-path.ts` are plain logic. `editable.tsx` is the inline-edit context the sites use.
- `pages/` — routes. `components/` — operator-app chrome, `StatusScreen`, and the shadcn/ui primitives actually used (`components/ui/`).
- `lib/` — `plw.ts` (Supabase client, `callFn`, `submitLead`), `saved-site.ts` (sites for visitors, `usePublishedSite`, preview/public links), `site-meta.ts` (each site's `<head>` for crawlers), `domain-sites.ts`, `client-videos.ts`.
- `netlify/edge-functions/site-meta.ts` — on the Netlify build only: rewrites a client site's head, robots.txt and sitemap.xml.

## Backend

**Professional Latino Workers' Supabase project** (`src/lib/plw.ts`; env `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` in the root `.env`). Saved sites: PLW's `kike-sites` function (table `kike_sites`). Editor AI + greeting audio: `kike-ai`. Contact forms: `lead-intake`, through `submitLead(template.plwSiteId, …)`. Those functions live in the PLW repo (`supabase/functions/kike-*`, `docs/KIKECODE_WEBSITE_INTEGRATION.md`).

- `src/components/staff-gate.tsx` — the operator app needs a PLW staff account (email + password + emailed code, like PLW's `/acceso`). `/share/:id`, `/preview/:token` and `/video/:id` stay public.
- A saved site is a draft until staff publish it from the editor: `/preview/:token` shows the draft (noindex, forms off), `/share/:id` and the client's domain show only the published version. Rollout and rollback: PLW's `docs/kikecode-lifecycle/README.md`.
- Client domains: the hand-built ones are mapped in `src/lib/domain-sites.ts`; any other non-localhost host is looked up as a saved site's `custom_domain` (`ClientDomainSite`) before the operator app renders; a domain serves only after its TXT proof and HTTPS check pass. Client domains are served by Netlify (`netlify.toml`, each domain a domain alias), not Bolt: Bolt's aliases redirect to the primary domain, which hides the hostname this lookup needs.
- `template.plwSiteId` is set only on a published site loaded from PLW, so forms in template previews, preview links and the editor never create leads, and say so. A form says "received" only when lead-intake answered `{ ok: true }`. A published site's phone is the client's PLW number once one is assigned (set server-side); the typed number moves to `brand.whatsapp`, which `whatsappLink` uses.
- The site assistant takes appointment **requests** (a preferred time) and never claims a booking: the site cannot see the business's calendar (`booking-copy.test.ts`).

## Commands

| Task | Command |
|---|---|
| Dev server (5173) | `npm run dev` |
| Build | `npm run build` → `dist/` (Bolt and Netlify publish it) |
| Typecheck | `npm run typecheck` |
| Tests (vitest) | `npm test` |
| Production smoke test (read-only) | `SMOKE_APP_URL=… SMOKE_SUPABASE_URL=… node scripts/smoke.mjs` |

Setup: `cp .env.example .env` and fill in the two PLW values, `npm install`, `npm run dev`. CI (`.github/workflows/ci.yml`) runs the pnpm frozen install, typecheck, tests and build on every push and PR.

## Gotchas

- Bolt installs with npm from `package.json`; Netlify installs with pnpm from `pnpm-lock.yaml`. After changing dependencies run `npx pnpm@10.17.1 install` so the lockfile matches, or the Netlify build fails.
- `minimumReleaseAge: 1440` in `pnpm-workspace.yaml` is intentional (supply-chain defense) — don't remove it. Don't re-add Replit's platform-binary overrides there (`"esbuild>@esbuild/darwin-arm64": "-"` etc.): they broke Windows, macOS and Bolt.
- `tsconfig.json` has `noUnusedLocals`/`noUnusedParameters`: dead code fails the typecheck.
- Template media lives in PLW's public `template-assets` bucket (`TEMPLATE_ASSETS`), not `public/` — Bolt drops large files.
- Scripts must work on Windows: no `export VAR=...`, no `rm -rf` in npm scripts. Save JSON as UTF-8 **without BOM** (Windows PowerShell 5.1 adds one by default).
