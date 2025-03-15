import { pgTable, uuid, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { purchasesTable } from "./purchase-schema";
import { productsTable } from "./product-schema";
import { relations } from "drizzle-orm";

// Purchase Product Table
export const purchaseProductsTable = pgTable("purchase_products", {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseId: uuid("purchase_id").notNull().references(() => purchasesTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }).notNull(),
    isReturned: boolean('is_returned').notNull().default(false),
    returnDate: timestamp('return_date'),
    createdAt,
    updatedAt,
});



// Store Table relation 
export const purchaseProductsRelation = relations(purchaseProductsTable, ({
    one,
}) => ({
    purchase: one(purchasesTable, {
        fields: [purchaseProductsTable.purchaseId],
        references: [purchasesTable.id]
    }),
    product: one(productsTable, {
        fields: [purchaseProductsTable.productId],
        references: [productsTable.id]
    }),

}))
