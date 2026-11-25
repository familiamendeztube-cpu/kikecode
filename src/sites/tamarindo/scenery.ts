/*
  The scenery the journey flies through. Every photo is a free photo on
  Unsplash (Unsplash License: free to use; hotlinking images.unsplash.com is
  what Unsplash asks for), and every one is tagged on Unsplash as taken in
  Tamarindo, Guanacaste. The site credits them in its footer.

  The tour cards use this scenery full screen and show the business's own
  photo of each tour beside its price.
*/

export type Scenery = { id: string; page: string; by: string };

const u = (id: string, slug: string, by: string): Scenery => ({ id, page: `https://unsplash.com/photos/${slug}`, by });

export const SCENERY = {
  /** Playa Tamarindo from a drone, surf rolling in: the middle window, then the flight. */
  bay: u("photo-1649365016349-bda28a580454", "0FDF6E1xLE4", "Dominick Legotte"),
  /** Tamarindo's hills at golden hour, from a drone: the left window. */
  shore: u("photo-1728956214436-2536af3523ee", "79pu_mGq8Ls", "Darcy Calvin"),
  /** Playa Tamarindo's curve from the air: the right window. */
  beach: u("photo-1728956211637-4d55c54218a1", "AHhpyT3fFkU", "Darcy Calvin"),
  /** A small island off Tamarindo: the right window at night. */
  headland: u("photo-1735675561652-e48e0be5dc68", "x87ZvkrsgVw", "Emily Heist"),
  /** Tamarindo's beach and bay from above: where the flight comes down (the right window's view, closer). */
  above: u("photo-1728956211637-4d55c54218a1", "AHhpyT3fFkU", "Darcy Calvin"),
  /** Playa Tamarindo, palms and moored boats: the windows at night. */
  night: u("photo-1709006393613-fecd943784e2", "BDVt8_BuiU4", "Joseph Piña"),
  /** One per tour, in the template's order; all in Tamarindo. */
  inshore: u("photo-1735675413541-ae4fe13109ab", "2Lz0HxOBqt0", "Emily Heist"),
  offshore: u("photo-1735675518093-06de4b0b6df9", "u9LZ0oy4Zys", "Emily Heist"),
  snorkel: u("photo-1679497600934-78558c489136", "-GWGVJWft6c", "Jeffrey Eisen"),
  sunset: u("photo-1687529500646-99b5cbadd978", "lUHca1JpVq8", "Jeffrey Eisen"),
  coast: u("photo-1657731569034-9b5f9cb5f4d2", "9Lo1Rbt_eAw", "Carmela Biana"),
  custom: u("photo-1735625135246-8a0dd2e072cf", "aAoohIcdGW4", "Emily Heist"),
} satisfies Record<string, Scenery>;

/** The full-screen scene for each tour, matched by its English title. */
export function tourScenery(titleEn: string, i: number): Scenery {
  if (/inshore/i.test(titleEn)) return SCENERY.inshore;
  if (/offshore/i.test(titleEn)) return SCENERY.offshore;
  if (/snorkel/i.test(titleEn)) return SCENERY.snorkel;
  if (/sunset/i.test(titleEn)) return SCENERY.sunset;
  if (/coast/i.test(titleEn)) return SCENERY.coast;
  if (/custom/i.test(titleEn)) return SCENERY.custom;
  return [SCENERY.inshore, SCENERY.offshore, SCENERY.snorkel, SCENERY.sunset, SCENERY.coast, SCENERY.custom][i % 6];
}

/** A sized, compressed Unsplash image. */
export function scenery(s: Scenery, width: number): string {
  return `https://images.unsplash.com/${s.id}?auto=format&fit=crop&w=${width}&q=72`;
}

/** srcset for a full-screen picture. */
export function scenerySet(s: Scenery): string {
  return [960, 1600, 2400].map((w) => `${scenery(s, w)} ${w}w`).join(", ");
}
