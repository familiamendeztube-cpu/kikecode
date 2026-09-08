import { pgTable, integer, boolean, text, timestamp } from "drizzle-orm/pg-core";

export const settingsTable = pgTable("settings", {
  id: integer("id").primaryKey().default(1),
  advancedMode: boolean("advanced_mode").notNull().default(false),
  defaultRiskLevel: text("default_risk_level").notNull().default("Pull request only"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SettingsRow = typeof settingsTable.$inferSelect;
export type InsertSettingsRow = typeof settingsTable.$inferInsert;
