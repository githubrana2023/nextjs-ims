import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { storesTable } from "./store-schema";
import { createdAt, updatedAt } from "../schema-helper";
import { expenseCategoriesTable } from "./expense-category-schema";




// Expense Table
export const expensesTable = pgTable("expenses", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    expenseCategoryId: uuid("expense_category_id").notNull().references(() => expenseCategoriesTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    expenseDate: timestamp("expense_date").notNull(),
    createdAt,
    updatedAt,
});



export const expenseRelation = relations(expensesTable, ({
    one
}) => ({
    expenseCategory: one(expenseCategoriesTable, {
        fields: [expensesTable.expenseCategoryId],
        references: [expenseCategoriesTable.id]
    }),
    store: one(storesTable, {
        fields: [expensesTable.storeId],
        references: [storesTable.id]
    }),
}))