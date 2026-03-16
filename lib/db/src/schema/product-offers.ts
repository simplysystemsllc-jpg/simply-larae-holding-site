import { pgTable, serial, integer, text, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productOffersTable = pgTable("product_offers", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  sellerName: text("seller_name").notNull(),
  sellerType: text("seller_type").notNull().default("major_beauty_retailer"),
  productUrl: text("product_url").notNull(),
  shadeUrl: text("shade_url"),
  price: numeric("price", { precision: 10, scale: 2 }),
  currency: text("currency").notNull().default("USD"),
  imageUrl: text("image_url"),
  availabilityStatus: text("availability_status").notNull().default("available"),
  isBrandDirect: boolean("is_brand_direct").notNull().default(false),
  isAffiliate: boolean("is_affiliate").notNull().default(false),
  affiliateUrl: text("affiliate_url"),
  lastCheckedAt: timestamp("last_checked_at"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProductOfferSchema = createInsertSchema(productOffersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProductOffer = z.infer<typeof insertProductOfferSchema>;
export type ProductOffer = typeof productOffersTable.$inferSelect;
