import { pgTable, uuid, numeric, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { storesTable } from "./store-schema";
import { customersTable } from "./customer-schema";

// Sales Paid Bill Table
export const salesPaidBillsTable = pgTable("sales_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt,
    updatedAt,
});



// Supplier Table relation 
export const salesPaidBillsRelation = relations(salesPaidBillsTable, ({
    one,
    many
}) => ({
    store: one(storesTable, {
        fields: [salesPaidBillsTable.storeId],
        references: [storesTable.id]
    }),
    customer: one(customersTable, {
        fields: [salesPaidBillsTable.customerId],
        references: [customersTable.id]
    }),
}))
