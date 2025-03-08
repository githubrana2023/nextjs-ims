import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { suppliersTable } from "./supplier";
// SalesMan Table
export const salesMansTable = pgTable("sales_mans", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nid: varchar("nid", { length: 50 }).unique(),
    email: varchar("email", { length: 255 }).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// SalesMan Table relation 
export const salesMansRelation = relations(salesMansTable, ({
    one,
    many
}) => ({
    supplier: one(suppliersTable, {
        fields: [salesMansTable.supplierId],
        references: [suppliersTable.id]
    }),
}))
