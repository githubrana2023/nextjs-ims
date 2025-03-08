import { pgTable, varchar, uuid, numeric, timestamp, boolean ,text } from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"

import { storesTable } from "./store";
import { suppliersTable } from "./supplier";

export const purchaseReturnTable = pgTable('purchase_return',{
    id: uuid("id").primaryKey().defaultRandom(),
    supplierId: uuid("supplier_id").notNull().references(() => suppliersTable.id, { onDelete: "cascade" }),
    storeId: uuid("store_id").notNull().references(() => storesTable.id, { onDelete: "cascade" }),
    dateOfReturn: timestamp('date_of_return').notNull(),
    returnReferenceId:text('return_reference_id').notNull().unique(),
    createdAt:timestamp('create_at').notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().$defaultFn(()=>new Date()),
})

export const purchaseReturnRelation = relations(purchaseReturnTable,({one,many})=>({
    supplier:one(suppliersTable,{
        fields:[purchaseReturnTable.supplierId],
        references:[suppliersTable.id]
    }),
    store:one(storesTable,{
        fields:[purchaseReturnTable.supplierId],
        references:[storesTable.id]
    }),
}))