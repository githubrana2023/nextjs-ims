import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { assignProductPackingsTable } from "./product-assign-packaging";


// Product Packing Table
export const productPackingsTable = pgTable("product_packings", {
    id: uuid("id").primaryKey().defaultRandom(),
    unit: varchar("unit", { length: 50 }).notNull(),
    packing: numeric("packing", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Product Table relation 
export const productPackingsRelation = relations(productPackingsTable, ({
    many
}) => ({
    assignProductPackings:many(assignProductPackingsTable)
}))
