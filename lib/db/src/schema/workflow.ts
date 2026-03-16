import { pgTable, serial, integer, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workflowStatusTable = pgTable("workflow_status", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull(),
  status: text("status").notNull().default("new"),
  adminNotes: text("admin_notes"),
  statusHistory: jsonb("status_history").default([]),
  assignedTo: text("assigned_to"),
  dueAt: timestamp("due_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const conciergeRequestsTable = pgTable("concierge_requests", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id").notNull(),
  sessionId: text("session_id").notNull(),
  requestType: text("request_type").notNull().default("purchase"),
  productList: jsonb("product_list").default([]),
  estimatedTotal: text("estimated_total"),
  serviceFee: text("service_fee"),
  shippingEstimate: text("shipping_estimate"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWorkflowStatusSchema = createInsertSchema(workflowStatusTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertWorkflowStatus = z.infer<typeof insertWorkflowStatusSchema>;
export type WorkflowStatus = typeof workflowStatusTable.$inferSelect;

export const insertConciergeRequestSchema = createInsertSchema(conciergeRequestsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertConciergeRequest = z.infer<typeof insertConciergeRequestSchema>;
export type ConciergeRequest = typeof conciergeRequestsTable.$inferSelect;
