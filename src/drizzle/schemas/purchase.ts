import { pgTable, varchar, uuid, numeric, timestamp, boolean, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { suppliersTable } from "./supplier";
import { storesTable } from "./store";
import { purchaseProductsTable } from "./purchase-product";
// Purchase Table
export const purchasesTable = pgTable("purchases", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    purchaseReferenceId: text('purchase_reference_id').notNull().unique(),
    purchaseDate: timestamp("purchase_date").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    paid: numeric("paid", { precision: 10, scale: 2 }).notNull(),
    due: numeric("due", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Purchase Table Relation
export const purchasesRelation = relations(purchasesTable, ({ one, many }) => ({
    store: one(storesTable, {
        fields: [purchasesTable.storeId],
        references: [storesTable.id]
    }),
    supplier: one(suppliersTable, {
        fields: [purchasesTable.storeId],
        references: [suppliersTable.id]
    }),
    purchaseProducts: many(purchaseProductsTable)
}))