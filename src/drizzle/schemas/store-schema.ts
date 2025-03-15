import { pgTable, varchar, uuid, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { suppliersTable } from "./supplier-schema";
import { customersTable } from "./customer-schema";
import { productsTable } from "./product-schema";
import { productCategoriesTable } from "./product-category-schema";
import { salesTable } from "./sales-schema";
import { purchasesTable } from "./purchase-schema";
import { expenseCategoriesTable } from "./expense-category-schema";
import { expensesTable } from "./expense-schema";
import { purchasePaidBillsTable } from "./purchase-bill-schema";
import { salesProductsTable } from "./sales-product-schema";

export const storesTable = pgTable("stores", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    storeCode: varchar("store_code", { length: 50 }).notNull().unique(),
    clerkUserId: uuid("clerk_user_id").notNull().unique(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt,
    updatedAt,
});

// Store Table relation 
export const storesRelation = relations(storesTable, ({
    many
}) => ({
    suppliers: many(suppliersTable),
    customers: many(customersTable),
    products: many(productsTable),
    productCategories: many(productCategoriesTable),
    expenseCategories:many(expenseCategoriesTable),
    expenses:many(expensesTable),
    purchases: many(purchasesTable),
    paidPurchaseBills:many(purchasePaidBillsTable),
    sales: many(salesTable),
    salesProducts:many(salesProductsTable)
}))
