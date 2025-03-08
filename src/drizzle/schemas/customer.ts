import { pgTable, varchar, uuid, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
import { salesTable } from "./sales";
import { salesPaidBillsTable } from "./sales-product-paid-bill";
import { salesReturnTable } from "./sales-return";


// Customer Table
export const customersTable = pgTable("customers", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nid: varchar("nid", { length: 50 }).unique(),
    totalDue: numeric("total_due", { precision: 10, scale: 2 }).notNull(),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Store Table relation 
export const customersRelation = relations(customersTable, ({
    one,
    many
}) => ({
    store: one(storesTable, {
        fields: [customersTable.storeId],
        references: [storesTable.id],
    }),
    purchases: many(salesTable),
    purchasePaidBills:many(salesPaidBillsTable),
    salesReturns:many(salesReturnTable),
}))
