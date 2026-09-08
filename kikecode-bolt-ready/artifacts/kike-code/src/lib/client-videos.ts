/**
 * Client-ready commercial videos with their own shareable links.
 * Each entry powers a public landing page at `/video/:id` and the
 * "My Videos" hub at `/videos`. The same files are also surfaced in the
 * Los Primos Plumbing template's on-site video gallery.
 */
export type ClientVideo = {
  /** URL slug — also the human-readable link name. */
  id: string;
  /** Internal label shown in the My Videos hub. */
  label: string;
  /** Which business template provides the branding for the share page. */
  businessSlug: string;
  src: string;
  poster: string;
  title: { en: string; es: string };
  caption: { en: string; es: string };
};

const lpp = "/template-assets/los-primos-plumbing";

export const CLIENT_VIDEOS: ClientVideo[] = [
  {
    id: "professional-latino-workers-1",
    label: "Professional Latino Workers 1",
    businessSlug: "los-primos-plumbing",
    src: `${lpp}/video-1.mp4`,
    poster: `${lpp}/video-1.jpg`,
    title: { en: "Expert Plumbing Service", es: "Servicio de Plomería Experto" },
    caption: {
      en: "Top-quality work, done right the first time — by Los Primos Plumbing.",
      es: "Trabajo de primera calidad, bien hecho a la primera — por Los Primos Plumbing.",
    },
  },
  {
    id: "professional-latino-workers-2",
    label: "Professional Latino Workers 2",
    businessSlug: "los-primos-plumbing",
    src: `${lpp}/video-2.mp4`,
    poster: `${lpp}/video-2.jpg`,
    title: { en: "Premium Plumbing Work", es: "Trabajo de Plomería Premium" },
    caption: {
      en: "Licensed, insured & bilingual — serving the Los Angeles area, Whittier & La Habra.",
      es: "Con licencia, asegurados y bilingües — al servicio de Los Ángeles, Whittier y La Habra.",
    },
  },
];

export function getClientVideo(id: string): ClientVideo | null {
  return CLIENT_VIDEOS.find((v) => v.id === id) ?? null;
}

/** Absolute, copy-pasteable share URL for a given video id. */
export function videoShareUrl(id: string): string {
  return new URL(`${import.meta.env.BASE_URL}video/${id}`, window.location.origin).toString();
}
