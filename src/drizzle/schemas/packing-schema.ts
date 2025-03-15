import { pgTable, varchar, uuid, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { assignProductPackingsTable } from "./assign-packing-schema";


// Product Packing Table
export const productPackingsTable = pgTable("product_packings", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    unit: varchar("unit", { length: 50 }).notNull(),
    packing: numeric("packing", { precision: 10, scale: 2 }).notNull(),
    createdAt,
    updatedAt,
});


// Product Table relation 
export const productPackingsRelation = relations(productPackingsTable, ({
    one,
    many
}) => ({
    assignProductPackings: many(assignProductPackingsTable)
}))
