import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { storesTable } from "./store-schema";
import { createdAt, updatedAt } from "../schema-helper";
import { expensesTable } from "./expense-schema";


// Expense Category Table
export const expenseCategoriesTable = pgTable("expense_categories", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt,
    updatedAt,
});

export const expenseCategoriesRelation = relations(expenseCategoriesTable, ({ one,many }) => ({
    store: one(storesTable, {
        fields: [expenseCategoriesTable.storeId],
        references: [storesTable.id]
    }),
    expenses:many(expensesTable)
}))