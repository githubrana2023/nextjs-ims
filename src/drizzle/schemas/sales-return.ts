import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { customersTable } from "./customer";
import { storesTable } from "./store";
export const salesReturn = pgTable('sales_return',{
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    salesReferenceId:text('sales_reference_id').notNull(),
    dateOfReturn: timestamp('date_of_return').notNull(),
    returnReferenceId:text('return_reference_id').notNull().unique(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})
