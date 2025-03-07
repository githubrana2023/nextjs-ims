import { db } from "@/drizzle/db"
import { managementSystemDbTable, transactionNameDbTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getTrxNameByManagementIdTrxName = async (managementId: string, name: string) => {
    return await db.query.transactionNameDbTable.findFirst(
        {
            where: and(
                eq(managementSystemDbTable.id, managementId),
                eq(transactionNameDbTable.name, name)
            )
        }
    )
}

export const getTrxNameByIdAndManagementSystemId = async (id: string, managementSystemId: string) => {
    return await db.query.transactionNameDbTable.findFirst(
        {
            where: and(
                eq(transactionNameDbTable.managementSystemId, managementSystemId),
                eq(transactionNameDbTable.id, id)
            )
        }
    )

}

export const getTrxNameById = async (id: string) => {
    return await db.query.transactionNameDbTable.findFirst(
        {
            where: and(
                eq(transactionNameDbTable.id, id)
            )
        }
    )
}

export const getTrxNamesWithM_SystemNameByManagementSystemId = async (managementSystemId: string) => {
    return await db
        .select({
            id: transactionNameDbTable.id,
            managementSystemId: managementSystemDbTable.id,
            name: transactionNameDbTable.name,
            variant: transactionNameDbTable.variant,
            managementSystemName: managementSystemDbTable.name,
            createdAt: transactionNameDbTable.createdAt,
            updatedAt: transactionNameDbTable.updatedAt,
        })
        .from(transactionNameDbTable)
        .innerJoin(
            managementSystemDbTable,
            eq(managementSystemDbTable.id, transactionNameDbTable.managementSystemId)
        )
        .where(eq(transactionNameDbTable.managementSystemId, managementSystemId));
}

export const getTrxNameByManagementId = async (managementSystemId: string) => {
    return await db.query.transactionNameDbTable.findFirst(
        {
            where: eq(transactionNameDbTable.managementSystemId, managementSystemId)
        }
    )
}

export const getTrxNamesByManagementId = async (managementSystemId: string) => {
    return await db.query.transactionNameDbTable.findMany(
        {
            where: eq(transactionNameDbTable.managementSystemId, managementSystemId)
        }
    )
}

