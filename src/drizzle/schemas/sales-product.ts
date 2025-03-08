import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";
import { salesTable } from "./sales";
import { productsTable } from "./product";
import { salesReturnProductsTable } from "./sales-return-product";
// Sales Product Table
export const salesProductsTable = pgTable("sales_products", {
    id: uuid("id").primaryKey().defaultRandom(),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesId: uuid("sales_id").notNull().references(() => salesTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade" }),
    salesQuantity: numeric("sales_quantity", { precision: 10, scale: 2 }).notNull(),
    salesPrice: numeric("sales_price", { precision: 10, scale: 2 }).notNull(),
    isReturned:boolean('is_returned').notNull().default(false),
    returnDate:timestamp('return_date'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});



export const salesProductsTableRelation = relations(salesProductsTable,({one,many})=>({
    store:one(storesTable,{
        fields:[salesProductsTable.storeId],
        references:[storesTable.id]
    }),
    sale:one(salesTable,{
        fields:[salesProductsTable.salesId],
        references:[salesTable.id]
    }),
    product:one(productsTable,{
        fields:[salesProductsTable.productId],
        references:[productsTable.id]
    }),
    salesReturnProducts:many(salesReturnProductsTable),
}))