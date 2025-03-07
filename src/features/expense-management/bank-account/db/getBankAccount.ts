import { db } from "@/drizzle/db"
import { bankAccountDbTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getBankAccountByManagementSystemIdAndName = async (managementSystemId: string, name: string) => {
    return await db.query.bankAccountDbTable.findFirst(
        {
            where: and(
                eq(bankAccountDbTable.managementSystemId, managementSystemId),
                eq(bankAccountDbTable.name, name)
            )
        }
    )
}

export const getBankAccountByIdAndManagementSystemId = async (id: string, managementSystemId: string,) => {
    return await db.query.bankAccountDbTable.findFirst(
        {
            where: and(
                eq(bankAccountDbTable.managementSystemId, managementSystemId),
                eq(bankAccountDbTable.id, id)
            )
        }
    )
}


export const getBankAccountsFieldsIdNameByManagementSystem = async (managementSystemId: string) => {

    return await db
        .select({ id: bankAccountDbTable.id, label: bankAccountDbTable.name })
        .from(bankAccountDbTable)
        .where(eq(bankAccountDbTable.managementSystemId, managementSystemId));
}


export const getBankAccountsByManagementSystemId = async (managementSystemId: string) => {
    return await db.query.bankAccountDbTable.findMany(
        {
            where: eq(bankAccountDbTable.managementSystemId, managementSystemId),
        }
    )
}

export const getBankAccountByManagementSystemId = async (managementSystemId: string) => {
    return await db.query.bankAccountDbTable.findFirst(
        {
            where: eq(bankAccountDbTable.managementSystemId, managementSystemId),
        }
    )
}