/*
  Read-only production smoke test: GET requests only, nothing written.

    SMOKE_APP_URL=https://… SMOKE_SUPABASE_URL=https://….supabase.co \
    SMOKE_SITES="<site id>,cliente.com" node scripts/smoke.mjs

  Checks that the app answers with Kike Code's page (the generator meta that
  kike-sites' domain check also looks for), that kike-sites answers (404 for a
  site that does not exist), and that every listed site id loads through
  kike-sites and every listed domain serves the app. Exits 1 on any failure.
*/

const app = process.env.SMOKE_APP_URL?.replace(/\/$/, "");
const supabase = process.env.SMOKE_SUPABASE_URL?.replace(/\/$/, "");
const sites = (process.env.SMOKE_SITES ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MARKER = /<meta\s+name=["']generator["']\s+content=["']Kike Code["']/i;

if (!app || !supabase) {
  console.error("Set SMOKE_APP_URL and SMOKE_SUPABASE_URL.");
  process.exit(1);
}

/** One retry on a network error, so a single blip does not raise the alarm. */
async function get(url) {
  try {
    return await fetch(url, { signal: AbortSignal.timeout(15_000), redirect: "follow" });
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await fetch(url, { signal: AbortSignal.timeout(15_000), redirect: "follow" });
  }
}

const failures = [];
async function check(label, url, test) {
  const started = Date.now();
  try {
    const res = await get(url);
    const body = await res.text();
    const problem = test(res, body);
    console.log(`${problem ? "FAIL" : "ok  "} ${label} (${res.status}, ${Date.now() - started} ms)${problem ? `: ${problem}` : ""}`);
    if (problem) failures.push(label);
  } catch (err) {
    console.log(`FAIL ${label}: ${err instanceof Error ? err.message : err}`);
    failures.push(label);
  }
}

const servesApp = (res, body) => (!res.ok ? `HTTP ${res.status}` : MARKER.test(body) ? null : "not Kike Code's page");

await check("app", `${app}/`, servesApp);
await check("kike-sites", `${supabase}/functions/v1/kike-sites?id=00000000-0000-4000-8000-000000000000`,
  (res) => (res.status === 404 ? null : `expected 404 for an unknown site, got ${res.status}`));

for (const site of sites) {
  if (UUID.test(site)) {
    await check(`site ${site}`, `${supabase}/functions/v1/kike-sites?id=${site}`, (res, body) => {
      if (!res.ok) return `HTTP ${res.status} (404: not published, 410: suspended or archived)`;
      try { return JSON.parse(body).slug ? null : "no slug in the answer"; } catch { return "not JSON"; }
    });
  } else {
    await check(`domain ${site}`, `https://${site}/`, servesApp);
    await check(`domain lookup ${site}`, `${supabase}/functions/v1/kike-sites?domain=${encodeURIComponent(site)}`,
      (res) => (res.ok ? null : `HTTP ${res.status} (410: domain not verified or site not published)`));
  }
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("\nAll checks passed.");
