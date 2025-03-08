import { pgTable, varchar, uuid, timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
// Expense Category Table
export const expenseCategoriesTable = pgTable("expense_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: varchar("description", { length: 500 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});