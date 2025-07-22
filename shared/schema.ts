import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  propertyType: text("property_type").notNull(), // apartment, villa, plot, commercial
  bhkConfig: text("bhk_config").notNull(), // 1BHK, 2BHK, 3BHK, 4+BHK
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  carpetArea: integer("carpet_area").notNull(), // in sq ft
  builtUpArea: integer("built_up_area").notNull(), // in sq ft
  imageUrl: text("image_url").notNull(),
  vastuCompliant: boolean("vastu_compliant").default(false),
  readyToMove: boolean("ready_to_move").default(false),
  furnished: boolean("furnished").default(false),
  premium: boolean("premium").default(false),
  newLaunch: boolean("new_launch").default(false),
  luxury: boolean("luxury").default(false),
  contactNumber: text("contact_number").notNull(),
  featured: boolean("featured").default(false),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredLocation: text("preferred_location"),
  budgetRange: text("budget_range"),
  message: text("message"),
  createdAt: text("created_at").notNull(),
});

export const insertPropertySchema = createInsertSchema(properties).pick({
  title: true,
  description: true,
  location: true,
  city: true,
  state: true,
  price: true,
  propertyType: true,
  bhkConfig: true,
  bedrooms: true,
  bathrooms: true,
  carpetArea: true,
  builtUpArea: true,
  imageUrl: true,
  vastuCompliant: true,
  readyToMove: true,
  furnished: true,
  premium: true,
  newLaunch: true,
  luxury: true,
  contactNumber: true,
  featured: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  preferredLocation: true,
  budgetRange: true,
  message: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
