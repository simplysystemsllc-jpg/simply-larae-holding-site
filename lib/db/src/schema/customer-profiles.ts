import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const customerProfilesTable = pgTable("customer_profiles", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  email: text("email"),
  fullName: text("full_name"),
  skinType: text("skin_type"),
  skinTone: text("skin_tone"),
  undertone: text("undertone"),
  hairColor: text("hair_color"),
  eyeColor: text("eye_color"),
  hasFreckles: text("has_freckles"),
  sensitivities: text("sensitivities"),
  makeupExperience: text("makeup_experience"),
  budgetPreference: text("budget_preference"),
  makeupStyle: text("makeup_style"),
  productPreferences: jsonb("product_preferences"),
  routinePreference: text("routine_preference"),
  eventNeeds: text("event_needs"),
  additionalNotes: text("additional_notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCustomerProfileSchema = createInsertSchema(customerProfilesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCustomerProfile = z.infer<typeof insertCustomerProfileSchema>;
export type CustomerProfile = typeof customerProfilesTable.$inferSelect;
