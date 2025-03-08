import { pgTable, uuid, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { purchasesTable } from "./purchase";
import { productsTable } from "./product";

// Purchase Product Table
export const purchaseProductsTable = pgTable("purchase_products", {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseId: uuid("purchase_id").notNull().references(() => purchasesTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
    purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }).notNull(),
    isReturned: boolean('is_returned').notNull().default(false),
    returnDate: timestamp('return_date'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const purchaseProductsTableRelation = relations(purchaseProductsTable, ({ one, many }) => ({
    purchase: one(purchasesTable, {
        fields: [purchaseProductsTable.purchaseId],
        references: [purchasesTable.id]
    }),
    product: one(productsTable, {
        fields: [purchaseProductsTable.productId],
        references: [productsTable.id]
    })
}))