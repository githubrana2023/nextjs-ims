import { pgTable, varchar, uuid} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"
import { createdAt, updatedAt } from "../schema-helper";
import { suppliersTable } from "./supplier-schema";

// SalesMan Table
export const salesMansTable = pgTable("sales_mans", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    nid: varchar("nid", { length: 50 }).unique(),
    email: varchar("email", { length: 255 }).unique(),
    createdAt,
    updatedAt,
});

// SalesMan Table relation 
export const salesMansRelation = relations(salesMansTable, ({
    one,
}) => ({
    supplier: one(suppliersTable, {
        fields: [salesMansTable.supplierId],
        references: [suppliersTable.id]
    }),
}))
