import { pgTable, uuid, numeric, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { suppliersTable } from "./supplier-schema";
import { storesTable } from "./store-schema";

// Purchase Paid Bill Table
export const purchasePaidBillsTable = pgTable("purchase_paid_bills", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).notNull(),
    dateOfPaid: timestamp("date_of_paid").notNull(),
    createdAt,
    updatedAt,
});


// Supplier Table relation 
export const purchasePaidBillsRelation = relations(purchasePaidBillsTable, ({
    one
}) => ({
    store: one(storesTable, {
        fields: [purchasePaidBillsTable.storeId],
        references: [storesTable.id]
    }),
    supplier: one(suppliersTable, {
        fields: [purchasePaidBillsTable.storeId],
        references: [suppliersTable.id]
    }),
}))
