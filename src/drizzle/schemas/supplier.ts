import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
import { purchasesTable } from "./purchase";
import { salesMansTable } from "./salesman";
// Supplier Table
export const suppliersTable = pgTable("suppliers", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull().unique(),
    supplierCode: varchar("supplier_code", { length: 50 }).notNull().unique(),
    totalDue: numeric("total_due", { precision: 10, scale: 2 }).notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Supplier Table relation 
export const suppliersRelation = relations(suppliersTable, ({
    one,
    many
}) => ({
    store: one(storesTable, {
        fields: [suppliersTable.storeId],
        references: [storesTable.id]
    }),
    sales: many(purchasesTable),
    salesMans: many(salesMansTable),
}))
