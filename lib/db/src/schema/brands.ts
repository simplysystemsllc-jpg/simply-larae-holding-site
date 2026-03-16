import { pgTable, serial, text, boolean, timestamp, date, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const brandsTable = pgTable("brands", {
  id: serial("id").primaryKey(),
  brandName: text("brand_name").notNull(),
  website: text("website"),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  partnershipStatus: text("partnership_status").notNull().default("none"),
  notes: text("notes"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const brandPartnershipsTable = pgTable("brand_partnerships", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull(),
  partnershipType: text("partnership_type").notNull().default("evaluation"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isAffiliateEnabled: boolean("is_affiliate_enabled").notNull().default(false),
  isSponsoredEnabled: boolean("is_sponsored_enabled").notNull().default(false),
  disclosureText: text("disclosure_text"),
  contractNotes: text("contract_notes"),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sponsoredPlacementsTable = pgTable("sponsored_placements", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull(),
  productId: integer("product_id"),
  placementType: text("placement_type").notNull().default("featured_product"),
  priorityLevel: integer("priority_level").notNull().default(99),
  disclosureLabel: text("disclosure_label").notNull().default("Sponsored"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  audienceRules: jsonb("audience_rules").default({}),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const partnershipContactLogTable = pgTable("partnership_contact_log", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").notNull(),
  contactType: text("contact_type").notNull().default("outreach"),
  contactDate: date("contact_date"),
  contactOwner: text("contact_owner"),
  summary: text("summary"),
  nextStep: text("next_step"),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBrandSchema = createInsertSchema(brandsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brandsTable.$inferSelect;

export const insertBrandPartnershipSchema = createInsertSchema(brandPartnershipsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBrandPartnership = z.infer<typeof insertBrandPartnershipSchema>;
export type BrandPartnership = typeof brandPartnershipsTable.$inferSelect;

export const insertSponsoredPlacementSchema = createInsertSchema(sponsoredPlacementsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertSponsoredPlacement = z.infer<typeof insertSponsoredPlacementSchema>;
export type SponsoredPlacement = typeof sponsoredPlacementsTable.$inferSelect;
