import { pgTable, varchar, uuid, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { suppliersTable } from "./supplier";
import { storesTable } from "./store";
import { productCategoriesTable } from "./product-category";
import {  salesProductsTable } from "./sales-product";
import { purchaseProductsTable } from "./purchase-product";
import { assignProductPackingsTable } from "./product-assign-packaging";
// Product Table
export const productsTable = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").notNull().references(() => productCategoriesTable.id, { onDelete: "cascade" }),
    sku: varchar("sku", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Product Table relation 
export const productsRelation = relations(productsTable, ({
    one,
    many
}) => ({
    supplier: one(suppliersTable, {
        fields: [productsTable.supplierId],
        references: [suppliersTable.id]
    }),
    store: one(storesTable, {
        fields: [productsTable.storeId],
        references: [storesTable.id]
    }),
    productCategory: one(productCategoriesTable, {
        fields: [productsTable.categoryId],
        references: [productCategoriesTable.id]
    }),
    salesProducts:many(salesProductsTable),
    purchaseProducts:many(purchaseProductsTable),
    assignProductPackings:many(assignProductPackingsTable)
}))