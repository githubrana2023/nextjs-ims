'use server'

import { db } from "@/drizzle/db"
import { transactionDbTable } from "@/drizzle/schema"
import { InsertTrx, } from "@/drizzle/types"

export const createTrx = async (payload: InsertTrx) => {
    const [newTrx] = await db.insert(transactionDbTable).values(payload).returning()
    return newTrx
}