import { db } from "@/drizzle/db"
import { assignReceiveBankToTransactionNameDbTable, assignSourceBankToTransactionNameDbTable, bankAccountDbTable, transactionNameDbTable } from "@/drizzle/schema"
import { returnResponse } from "@/lib/utils"
import { and, eq } from "drizzle-orm"


type InsertAssignBank = {

    BOTH: {
        existingSourceBank: typeof bankAccountDbTable.$inferSelect
        existingReceiveBank: typeof bankAccountDbTable.$inferSelect
        existingTrxName: typeof transactionNameDbTable.$inferSelect

        existAssignedSourceBank: typeof assignSourceBankToTransactionNameDbTable.$inferSelect | undefined
        existAssignedReceiveBank: typeof assignReceiveBankToTransactionNameDbTable.$inferSelect | undefined
    },
    SOURCE: {
        existingSourceBank: typeof bankAccountDbTable.$inferSelect
        existingTrxName: typeof transactionNameDbTable.$inferSelect
    },
    RECEIVE: {
        existingReceiveBank: typeof bankAccountDbTable.$inferSelect
        existingTrxName: typeof transactionNameDbTable.$inferSelect
    }
}


export const insertAssignBankBoth = async ({
    existAssignedSourceBank,
    existAssignedReceiveBank,
    existingSourceBank,
    existingReceiveBank,
    existingTrxName
}: InsertAssignBank['BOTH']) => {
    if (existAssignedSourceBank && existAssignedReceiveBank) return returnResponse(false, { error: null }, `Source Bank: ${existingSourceBank.name} & Receive Bank: ${existingReceiveBank.name} already assigned to ${existingTrxName.name}`)


    const [insertedAssignedSourceBank] = await db.insert(assignSourceBankToTransactionNameDbTable).values({
        sourceBankAccountId: existingSourceBank.id,
        transactionNameId: existingTrxName.id
    }).returning()

    if (!insertedAssignedSourceBank) return returnResponse(false, { error: null }, 'Failed To Assigned Source Bank')

    const [insertedAssignedReceiveBank] = await db.insert(assignReceiveBankToTransactionNameDbTable).values({
        receiveBankAccountId: existingReceiveBank.id,
        transactionNameId: existingTrxName.id
    }).returning()

    if (!insertedAssignedReceiveBank) {

        await db.delete(assignSourceBankToTransactionNameDbTable).where(and(
            eq(assignSourceBankToTransactionNameDbTable.sourceBankAccountId, insertedAssignedSourceBank.sourceBankAccountId),
            eq(assignSourceBankToTransactionNameDbTable.transactionNameId, insertedAssignedSourceBank.transactionNameId),
            eq(assignSourceBankToTransactionNameDbTable.id, insertedAssignedSourceBank.id),
        ))

        return returnResponse(false, { error: null }, 'Failed To Assigned Receive Bank')
    }


    return returnResponse(true, {
        data: {
            insertedAssignedSourceBank, insertedAssignedReceiveBank
        }
    }, 'Assigned Source & Receive Bank Succeed!')
}

//! insert assign receive bank
export const insertAssignReceiveBank = async ({
    existingReceiveBank,
    existingTrxName
}: InsertAssignBank['RECEIVE']) => {
    const [inserted] = await db.insert(assignReceiveBankToTransactionNameDbTable).values({
        receiveBankAccountId: existingReceiveBank.id,
        transactionNameId: existingTrxName.id
    }).returning()

    if (!inserted) return returnResponse(false, { error: null }, 'Failed to Assign Receive bank')
    return returnResponse(
        true, { data: inserted }, 'Assigned Receive Bank Successfully'
    )
}

//! insert assign source bank
export const insertAssignSourceBank = async ({
    existingTrxName,
    existingSourceBank
}: InsertAssignBank['SOURCE']) => {
    const [inserted] = await db.insert(assignSourceBankToTransactionNameDbTable).values({
        sourceBankAccountId: existingSourceBank.id,
        transactionNameId: existingTrxName.id
    }).returning()
    if (!inserted) return returnResponse(false, { error: null }, 'Failed to Assign Source bank')
    return returnResponse(
        true, { data: inserted }, 'Assigned Source Bank Successfully'
    )
}

//! assign bank
export const assignBank = async ({
    existAssignedReceiveBank,
    existAssignedSourceBank,
    existingReceiveBank,
    existingSourceBank,
    existingTrxName
}: InsertAssignBank['BOTH']) => {

    if (existAssignedReceiveBank && existAssignedSourceBank) return returnResponse(false, { error: null }, 'Already assigned!')


    if (!existAssignedSourceBank && !existAssignedReceiveBank) {
        const res = await insertAssignBankBoth({
            existAssignedReceiveBank,
            existAssignedSourceBank,
            existingReceiveBank,
            existingSourceBank,
            existingTrxName
        })

        return res
    }

    if (!existAssignedReceiveBank) {
        const newAssignedReceiveBank = await insertAssignReceiveBank(
            { existingReceiveBank, existingTrxName }
        )
        return newAssignedReceiveBank
    }

    return await insertAssignSourceBank({
        existingSourceBank,
        existingTrxName
    })
}