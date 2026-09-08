export type FenixEvent =
  | "Product viewed"
  | "Product searched"
  | "Category selected"
  | "Product added to consultation list"
  | "Product removed from consultation list"
  | "Single-product WhatsApp inquiry"
  | "Multi-product WhatsApp inquiry"
  | "WhatsApp clicked"
  | "Location clicked"
  | "Instagram clicked";

export function trackFenixEvent(eventName: FenixEvent, props?: Record<string, unknown>) {
  // Developer log (no-op for production until a backend is wired)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Fenix Analytics] ${eventName}`, props || "");
  }
}