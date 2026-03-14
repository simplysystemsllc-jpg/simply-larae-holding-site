import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const approvedRetailersTable = pgTable("approved_retailers", {
  id: serial("id").primaryKey(),
  retailerName: text("retailer_name").notNull(),
  website: text("website").notNull(),
  retailerType: text("retailer_type").notNull().default("major_beauty_retailer"),
  priorityRank: integer("priority_rank").notNull().default(99),
  isActive: boolean("is_active").notNull().default(true),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertApprovedRetailerSchema = createInsertSchema(approvedRetailersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertApprovedRetailer = z.infer<typeof insertApprovedRetailerSchema>;
export type ApprovedRetailer = typeof approvedRetailersTable.$inferSelect;
