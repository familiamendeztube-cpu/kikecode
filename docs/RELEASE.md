# Releasing feat/plw-integration-hardening

The full, ordered rollout (database, PLW functions, then this app) is PLW's
`docs/kikecode-lifecycle/README.md`. This file is Kike Code's part of it: merging this branch
together with the refactor that is staged (uncommitted) in the main checkout, then publishing.
**Do not merge or publish before PLW's steps 3–6 are done**: this editor expects the new
`kike-sites` answers (`preview_token`, `publish`, `history`).

## 1. Merge it with the staged refactor without losing either

`C:\Users\jaymu\GitHub\kikecode` has a refactor staged and not committed (16 files: `pick()` in
`src/lib/i18n.ts`, `Eyebrow`, `GHOST_CTA` and `WhatsAppButton`, `whatsapp.ts` → `whatsapp.tsx`).
It is behavior-preserving; this branch changes behavior in ten of the same files, so they conflict:
`CLAUDE.md`, `src/pages/share-preview.tsx`, `src/sites/business/{assistant,contact,data,hero,proof,services}.tsx`
(`data.ts`), `src/sites/{leonardo,oryzo}-site.tsx`.

The merge was rehearsed on 2026-10-30: branch `rehearsal/staged-refactor-plus-hardening` (local
only, worktree `C:\Users\jaymu\GitHub\kikecode-merge-rehearsal`) is the refactor committed as-is
plus this branch merged in, resolved. Typecheck, the 82 tests and the build pass on it. It is not
pushed because it contains the refactor's uncommitted work.

Resolution rules (what the rehearsal did, if it is ever redone by hand):
- Keep this branch's behavior everywhere: the lead-form states and preview notice, the booking
  request copy, `/share` showing only published sites (the approval ask lives in
  `src/pages/preview.tsx`), and the removed fabrications (ratings, "verified" reviews, the
  Comparison section, 24/7 and "live AI" claims).
- Write it in the refactor's style: `pick(lang, en, es)` instead of `lang === "en" ? … : …`,
  `<Eyebrow>`, `GHOST_CTA`, `<WhatsAppButton>`; merge both import lists.
- Carry the refactor's `WhatsAppButton` change of the "Sí, quiero este sitio" link into
  `src/pages/preview.tsx`, where this branch moved that component.
- Drop the two `pick` imports left unused (`data.ts`, `oryzo-site.tsx`): their only uses were the
  invented time slots and the old form error, both removed.

Recommended order:
1. In `C:\Users\jaymu\GitHub\kikecode`, the refactor's author moves the staged work onto its own
   branch and commits it (`git switch -c refactor/site-copy-helpers`, then `git commit`): the
   staged files come along untouched. Push it.
2. Merge this branch's PR into `main` (with Netlify auto publishing stopped and Bolt not publishing;
   see PLW step 2).
3. Bring `refactor/site-copy-helpers` up to date with `main` (`git merge main`). For the ten
   conflicted files, take the rehearsal's resolution:
   `git checkout rehearsal/staged-refactor-plus-hardening -- CLAUDE.md src`
   then check `git diff main` shows only the refactor's changes, and run `npm run typecheck`,
   `npm test`, `npm run build`. Open its PR; merge after CI.

Merging the refactor first works too: then merge `main` into this branch and take the same
rehearsal files.

## 2. Publish

- **Bolt** (Kike Code project): bring in the merged `main`, then **Publish**. Bolt installs with npm
  from `package.json`; Netlify with pnpm from `pnpm-lock.yaml` (kept in sync on this branch).
- **Check**: `SMOKE_APP_URL=https://familiamendeztube-cp-q9tc.bolt.host SMOKE_SUPABASE_URL=<PLW URL> node scripts/smoke.mjs`
  passes; on 2026-10-30 its app check failed only because the live build predates the generator
  meta. Then, signed in: a saved site shows the Publish panel; `/preview/<token>` shows the
  preview banner.
- **Netlify** (the site that serves client domains, only when the first client domain goes live):
  environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with scope **All** (the
  edge function `netlify/edge-functions/site-meta.ts` reads the URL at runtime), optional
  `KIKE_APP_HOSTS`; turn auto publishing back on or deploy by hand. Check:
  `https://<site>.netlify.app/robots.txt` answers `Disallow: /`, and a client domain's page source
  has the business's `<title>`.
- **GitHub**: protect `main` (require the `verify` check and a PR); set the Actions variables
  `SMOKE_APP_URL`, `SMOKE_SUPABASE_URL` (and `SMOKE_SITES` once sites exist); run **Production
  smoke test** by hand once.

## 3. Roll back

Bolt: republish the previous version. Netlify: **Publish deploy** on the previous deploy. The
previous editor keeps saving against the new `kike-sites` but has no Publish button; PLW's runbook
has the function and database rollbacks.
