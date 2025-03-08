import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { productPackingsTable } from "./product-packaging";
import { productsTable } from "./product";
// Assign Product Packing Table
export const assignProductPackingsTable = pgTable("assign_product_packings", {
    id: uuid("id").primaryKey().defaultRandom(),
    productPakingId: uuid("product_paking_id").notNull().references(() => productPackingsTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Product Table relation 
export const assignProductPackingsRelation = relations(assignProductPackingsTable, ({
    one,
    many
}) => ({
    productPacking: one(productPackingsTable, {
        fields: [assignProductPackingsTable.productPakingId],
        references: [productPackingsTable.id]
    }),
    product: one(productsTable, {
        fields: [assignProductPackingsTable.productId],
        references: [productsTable.id]
    }),

}))

