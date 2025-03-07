import { db } from "@/drizzle/db"
import { transactionDbTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getTrxsByManagementSystemId = async (managementSystemId: string) => {
    return await db.query.transactionDbTable.findMany({ where: eq(transactionDbTable.managementSystemId, managementSystemId) })
}