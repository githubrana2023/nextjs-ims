import { pgTable, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";

import { productsTable } from "./product-schema";
import { productPackingsTable } from "./packing-schema";

// Assign Product Packing Table
export const assignProductPackingsTable = pgTable("assign_product_packings", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    productPakingId: uuid("product_paking_id").notNull().references(() => productPackingsTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
});

// Product Table relation 
export const assignProductPackingsRelation = relations(assignProductPackingsTable, ({
    one,
}) => ({
   productPacking:one(productPackingsTable,{
    fields:[assignProductPackingsTable.productPakingId],
    references:[productPackingsTable.id]
   }),
   product:one(productsTable,{
       fields: [assignProductPackingsTable.productId],
    references:[productsTable.id]
   }),

}))
