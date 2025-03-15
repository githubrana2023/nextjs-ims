import { pgTable, varchar, uuid, numeric, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { storesTable } from "./store-schema";
import { createdAt, updatedAt } from "../schema-helper";
import { purchasesTable } from "./purchase-schema";
import { salesMansTable } from "./salesman-schema";
import { productsTable } from "./product-schema";
import { purchasePaidBillsTable } from "./purchase-bill-schema";

// Supplier Table
export const suppliersTable = pgTable("suppliers", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    supplierCode: varchar("supplier_code", { length: 50 }).notNull().unique(),
    totalDue: numeric("total_due", { precision: 10, scale: 2 }).notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt,
    updatedAt,
});

// Supplier Table relation 
export const suppliersRelation = relations(suppliersTable, ({
    one,
    many
}) => ({
    store: one(storesTable, {
        fields: [suppliersTable.storeId],
        references: [storesTable.id]
    }),
    sales: many(purchasesTable),
    salesMans: many(salesMansTable),
    products: many(productsTable),
    billCollections:many(purchasePaidBillsTable)
}))
