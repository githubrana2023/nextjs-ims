import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { customersTable } from "./customer";
import { storesTable } from "./store";
import { salesReturnProductsTable } from "./sales-return-product";
import { salesTable } from "./sales";
export const salesReturnTable = pgTable('sales_return',{
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesReferenceId:text('sales_reference_id').notNull().references(()=>salesTable.salesReferenceId),
    dateOfReturn: timestamp('date_of_return').notNull(),
    returnReferenceId:text('return_reference_id').notNull().unique(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})


export const salesReturnRelation = relations(salesReturnTable,({one,many})=>({
    customer:one(customersTable,{
        fields:[salesReturnTable.customerId],
        references:[customersTable.id]
    }),
    store:one(storesTable,{
        fields:[salesReturnTable.customerId],
        references:[storesTable.id]
    }),
    sale:one(salesTable,{
        fields:[salesReturnTable.salesReferenceId],
        references:[salesTable.salesReferenceId]
    }),
    salesReturnProducts:many(salesReturnProductsTable)
    
}))