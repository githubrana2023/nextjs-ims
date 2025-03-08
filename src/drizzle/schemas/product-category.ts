import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
import { productsTable } from "./product";
// Product Category Table
export const productCategoriesTable = pgTable("product_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SalesMan Table relation 
export const productCategoriesRelation = relations(productCategoriesTable, ({
    one,
    many
}) => ({
    store:one(storesTable,{
        fields:[productCategoriesTable.storeId],
        references:[storesTable.id],
    }),
    products:many(productsTable)
}))
