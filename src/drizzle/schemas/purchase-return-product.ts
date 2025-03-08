import { pgTable, uuid, numeric, timestamp, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm"

import {purchaseReturnTable} from './purchase-return'

export const productReturnType = ['Expired', 'Damage', 'Good'] as const

export const purchaseReturnProductsTable = pgTable('purchase_return_products', {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseReturnId: uuid('purchase_return_id').notNull(),
    salesProductId: uuid('salesProductId').notNull(),
    returnQuantity: numeric("return_quantity", { precision: 10, scale: 2 }).notNull(),
    productCondition: text('product_condition', { enum: productReturnType }).notNull(),
    createdAt: timestamp('create_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$defaultFn(() => new Date()),
})

export const purchaseReturnProductsRelation = relations(purchaseReturnProductsTable,({one,many})=>({
    purchaseReturn:one(purchaseReturnTable,{
        fields:[purchaseReturnProductsTable.purchaseReturnId],
        references:[purchaseReturnTable.id]
    })
}))

