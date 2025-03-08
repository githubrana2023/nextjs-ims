import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { customersTable } from "./customer";
import { storesTable } from "./store";
// Sales Paid Bill Table
export const salesPaidBillsTable = pgTable("sales_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const salesPaidBillsRelation = relations(salesPaidBillsTable,({one,many})=>({
    store:one(storesTable,{
        fields:[salesPaidBillsTable.storeId],
        references:[storesTable.id]
    }),
    customer:one(customersTable,{
        fields:[salesPaidBillsTable.storeId],
        references:[customersTable.id]
    }),
}))