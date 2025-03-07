import { db } from "@/drizzle/db"
import { assignReceiveBankToTransactionNameDbTable, assignSourceBankToTransactionNameDbTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getAssignedSourceBank = async (sourceBankAccountId: string, transactionNameId: string) => {
    return await db.query.assignSourceBankToTransactionNameDbTable.findFirst({
        where: and(
            eq(assignSourceBankToTransactionNameDbTable.transactionNameId, transactionNameId),
            eq(assignSourceBankToTransactionNameDbTable.sourceBankAccountId, sourceBankAccountId)
        )
    })
}

export const getAssignedReceiveBank = async (receiveBankAccountId: string, transactionNameId: string) => {
    return await db.query.assignReceiveBankToTransactionNameDbTable.findFirst({
        where: and(
            eq(assignReceiveBankToTransactionNameDbTable.transactionNameId, transactionNameId),
            eq(assignReceiveBankToTransactionNameDbTable.receiveBankAccountId, receiveBankAccountId)
        )
    })

}