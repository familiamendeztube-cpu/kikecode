import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const websiteDemosTable = pgTable("website_demos", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  city: text("city"),
  phone: text("phone"),
  email: text("email"),
  existingWebsite: text("existing_website"),
  socialLinks: text("social_links"),
  googleMaps: text("google_maps"),
  services: text("services"),
  mainOffer: text("main_offer"),
  about: text("about"),
  customerNotes: text("customer_notes"),
  preferredColors: text("preferred_colors"),
  style: text("style").notNull(),
  language: text("language").notNull(),
  websiteType: text("website_type").notNull(),
  owner: text("owner").notNull(),
  repo: text("repo").notNull(),
  issueNumber: integer("issue_number"),
  issueUrl: text("issue_url"),
  prUrl: text("pr_url"),
  demoUrl: text("demo_url"),
  status: text("status").notNull().default("Website request created"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type WebsiteDemoRow = typeof websiteDemosTable.$inferSelect;
export type InsertWebsiteDemoRow = typeof websiteDemosTable.$inferInsert;
