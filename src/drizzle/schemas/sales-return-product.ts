import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { salesReturnTable } from "./sales-return";
import { salesProductsTable } from "./sales-product";

export const productReturnType = ['Expired','Damage','Good'] as const

export const salesReturnProductsTable = pgTable('sales_return_products',{
    id: uuid("id").primaryKey().defaultRandom(),
    salesReturnId:uuid('sales_return_id').notNull().references(()=>salesReturnTable.id),
    salesProductId:uuid('salesProductId').notNull().references(()=>salesProductsTable.id),
    returnQuantity: numeric("return_quantity", { precision: 10, scale: 2 }).notNull(),
    productCondition:text('product_condition',{enum:productReturnType}).notNull(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})



export const salesReturnProductsTableRelation = relations(salesReturnProductsTable,({one,many})=>({
    salesReturn:one(salesReturnTable,{
        fields:[salesReturnProductsTable.salesReturnId],
        references:[salesReturnTable.id]
    }),
    salesProduct:one(salesProductsTable,{
        fields:[salesReturnProductsTable.salesProductId],
        references:[salesProductsTable.id]
    }),
}))