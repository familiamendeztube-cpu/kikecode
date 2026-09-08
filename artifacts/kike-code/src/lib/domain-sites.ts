// Custom-domain → template mapping.
//
// When the app is opened from one of these hostnames (a client's own domain
// linked to the deployment), we skip the Kike Code chrome (PIN gate, operator
// bar, template browser) and render that client's site full-page, exactly like
// a share link. Any other hostname (replit.app, replit.dev, localhost) gets the
// normal Kike Code app.
//
// To hook up a new client domain: link the domain to the deployment in
// Replit's Domains tab, then add "domain.com": "<template-slug>" below
// (bare domain and www both listed).

export const DOMAIN_SITES: Record<string, string> = {
  "autoserviciorym.com": "auto-servicio-rym",
  "www.autoserviciorym.com": "auto-servicio-rym",
  "suplidorafenix.com": "suplidora-fenix",
  "www.suplidorafenix.com": "suplidora-fenix",
};

export function getDomainSiteSlug(hostname: string): string | null {
  return DOMAIN_SITES[hostname.toLowerCase()] ?? null;
}
