import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { customersTable } from "./customer";
import { storesTable } from "./store";
import { salesProductsTable } from "./sales-product";
import { salesReturnTable } from "./sales-return";
// Sales Table
export const salesTable = pgTable("sales", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesReferenceId: text('sales_reference_id').notNull().unique(),
    salesDate: timestamp("sales_date").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    paid: numeric("paid", { precision: 10, scale: 2 }).notNull(),
    due: numeric("due", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const salesRelations = relations(salesTable,({one,many})=>({
    customer:one(customersTable,{
        fields:[salesTable.customerId],
        references:[customersTable.id]
    }),
    store:one(storesTable,{
        fields:[salesTable.customerId],
        references:[storesTable.id]
    }),
    salesProducts: many(salesProductsTable),
    salesReturns: many(salesReturnTable),
}))
