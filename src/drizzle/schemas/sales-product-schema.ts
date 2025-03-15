import { pgTable, varchar, uuid, boolean, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { storesTable } from "./store-schema";
import { salesTable } from "./sales-schema";
import { productsTable } from "./product-schema";
import { createdAt,updatedAt } from "../schema-helper";


// Sales Product Table
export const salesProductsTable = pgTable("sales_products", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesId: uuid("sales_id").notNull().references(() => salesTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    salesQuantity: numeric("sales_quantity", { precision: 10, scale: 2 }).notNull(),
    salesPrice: numeric("sales_price", { precision: 10, scale: 2 }).notNull(),
    isReturned:boolean('is_returned').notNull().default(false),
    returnDate:timestamp('return_date'),
    createdAt,
    updatedAt,
});

// Supplier Table relation 
export const salesProductsRelation = relations(salesProductsTable, ({
    one,
}) => ({
    store: one(storesTable, {
        fields: [salesProductsTable.storeId],
        references: [storesTable.id]
    }),
    sales: one(salesTable, {
        fields: [salesProductsTable.salesId],
        references: [salesTable.id]
    }),
    product: one(productsTable, {
        fields: [salesProductsTable.productId],
        references: [productsTable.id]
    }),
}))
