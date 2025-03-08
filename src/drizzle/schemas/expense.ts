import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
import { expenseCategoriesTable } from "./expense-category";
// Expense Table
export const expensesTable = pgTable("expenses", {
    id: uuid("id").primaryKey().defaultRandom(),
    expenseCategoryId: uuid("expense_category_id").notNull().references(() => expenseCategoriesTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    expenseDate: timestamp("expense_date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const expensesTableRelation = relations(expensesTable,({one,many})=>({
    store:one(storesTable,{
        fields:[expensesTable.storeId],
        references:[storesTable.id]
    }),
    expenseCategory:one(expenseCategoriesTable,{
        fields:[expensesTable.expenseCategoryId],
        references:[expenseCategoriesTable.id]
    }),
}))