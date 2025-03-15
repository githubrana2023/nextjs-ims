import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { storesTable } from "./store-schema";
import { createdAt, updatedAt } from "../schema-helper";
import { productsTable } from "./product-schema";

// Product Category Table
export const productCategoriesTable = pgTable("product_categories", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt,
    updatedAt,
});

// SalesMan Table relation 
export const productCategoriesRelationTable = relations(productCategoriesTable, ({
    one,
    many
}) => ({
    store: one(storesTable, {
        fields: [productCategoriesTable.storeId],
        references: [storesTable.id],
    }),
    products: many(productsTable)
}))
