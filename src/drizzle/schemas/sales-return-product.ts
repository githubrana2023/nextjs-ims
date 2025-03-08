import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"

export const productReturnType = ['Expired','Damage','Good'] as const

export const salesReturnProducts = pgTable('sales_return_products',{
    id: uuid("id").primaryKey().defaultRandom(),
    salesReturnId:uuid('sales_return_id').notNull(),
    salesProductId:uuid('salesProductId').notNull(),
    returnQuantity: numeric("return_quantity", { precision: 10, scale: 2 }).notNull(),
    productCondition:text('product_condition',{enum:productReturnType}).notNull(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})

