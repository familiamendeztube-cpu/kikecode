import { pgTable, text, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";

export const customizedSitesTable = pgTable("customized_sites", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull(),
  brand: jsonb("brand").notNull(),
  content: jsonb("content").notNull(),
  photos: jsonb("photos").notNull(),
  /** Deep-partial of every other editable template field (offers, assistant,
   *  availability, premium sections, inventory, heritage, media incl. videos,
   *  brand extras). Nullable for backward compatibility with older rows. */
  overrides: jsonb("overrides"),
  /** When false the share link is disabled (client didn't want the demo). */
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CustomizedSiteRow = typeof customizedSitesTable.$inferSelect;
export type InsertCustomizedSiteRow = typeof customizedSitesTable.$inferInsert;
