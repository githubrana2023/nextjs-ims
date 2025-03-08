import { pgTable, varchar, uuid, timestamp, boolean} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { usersTable } from "./user";
import { suppliersTable } from "./supplier";
import { customersTable } from "./customer";
import { productsTable } from "./product";
import { productCategoriesTable } from "./product-category";
import { salesTable } from "./sales";
import { purchasesTable } from "./purchase";
// Store Table
export const storesTable = pgTable("stores", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    storeCode: varchar("store_code", { length: 50 }).notNull().unique(),
    userId: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }).unique(),
    isDeleted:boolean('is_deleted').notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Store Table relation 
export const storesRelation = relations(storesTable, ({
    one,
    many
}) => ({
    store: one(usersTable, {
        fields: [storesTable.userId],
        references:[usersTable.id]
    }),
    suppliers:many(suppliersTable),
    customers:many(customersTable),
    products:many(productsTable),
    productCategories:many(productCategoriesTable),
    sales:many(salesTable),
    purchases:many(purchasesTable),
}))
