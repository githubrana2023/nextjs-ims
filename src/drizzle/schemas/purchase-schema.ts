import { pgTable, varchar, uuid, boolean, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { suppliersTable } from "./supplier-schema";
import { storesTable } from "./store-schema";
import { productCategoriesTable } from "./product-category-schema";
import { purchaseProductsTable } from "./purchase-product-schema";


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
    createdAt,
    updatedAt,
});

// Purchase Table Relation
export const purchasesRelation = relations(purchasesTable,({one,many})=>({
     supplier: one(suppliersTable, {
            fields: [purchasesTable.supplierId],
            references: [suppliersTable.id]
        }),
        store: one(storesTable, {
            fields: [purchasesTable.storeId],
            references: [storesTable.id]
        }),
    purchaseProducts : many(purchaseProductsTable)
}))
