import { pgTable, uuid, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { storesTable } from "./store-schema";
import { customersTable } from "./customer-schema";
import { salesProductsTable } from "./sales-product-schema";



// Sales Table
export const salesTable = pgTable("sales", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesReferenceId: text('sales_reference_id').notNull().unique(),
    salesDate: timestamp("sales_date").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    paid: numeric("paid", { precision: 10, scale: 2 }).notNull(),
    due: numeric("due", { precision: 10, scale: 2 }).notNull(),
    createdAt,
    updatedAt,
});


export const salesRelations = relations(salesTable, ({ one, many }) => ({
    store: one(storesTable, {
        fields: [salesTable.storeId],
        references: [storesTable.id]
    }),
    customer: one(customersTable, {
        fields: [salesTable.customerId],
        references: [customersTable.id]
    }),
    salesProducts: many(salesProductsTable)
}))
