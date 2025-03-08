import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { suppliersTable } from "./supplier";
import { storesTable } from "./store";
// Purchase Paid Bill Table
export const purchasePaidBillsTable = pgTable("purchase_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const purchasePaidBillsRelation = relations(purchasePaidBillsTable,({one,many})=>({
supplier:one(suppliersTable,{
    fields:[purchasePaidBillsTable.supplierId],
    references:[suppliersTable.id]
}),
store:one(storesTable,{
    fields:[purchasePaidBillsTable.supplierId],
    references:[storesTable.id]
}),
}))