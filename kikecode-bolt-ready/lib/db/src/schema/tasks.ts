import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
  id: serial("id").primaryKey(),
  owner: text("owner").notNull(),
  repo: text("repo").notNull(),
  taskType: text("task_type").notNull(),
  userPrompt: text("user_prompt").notNull(),
  carefulness: text("carefulness").notNull(),
  riskLevel: text("risk_level"),
  status: text("status").notNull().default("Sent to Claude"),
  issueNumber: integer("issue_number").notNull(),
  issueUrl: text("issue_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type TaskRow = typeof tasksTable.$inferSelect;
export type InsertTaskRow = typeof tasksTable.$inferInsert;
