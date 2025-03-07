'use server'

import { updateTrxNameFormSchema, UpdateTrxNameFormValue } from "../schemas/transaction-name"
import { currentUser } from "@/services/clerk"
import { getUserById } from "@/features/expense-management/users/db/user"
import { getManagementSystemByUserId } from "@/features/expense-management/management-system/db/getManagementSystem"
import { getTrxNameByIdAndManagementSystemId, getTrxNameByManagementIdTrxName } from "../db/getTrxName"
import { db } from "@/drizzle/db"
import { assignReceiveBankToTransactionNameDbTable, transactionNameDbTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const updateTrxNameAction = async (formValue: UpdateTrxNameFormValue, trxNameId: string, managementSystemId: string) => {
    const user = await currentUser()
    if (!user.userId) return {}

    const existUser = await getUserById(user.userId)
    if (!existUser) return {}

    const existManagementSystem = await getManagementSystemByUserId(existUser.id)
    if (!existManagementSystem) return {}
    if (existManagementSystem.id !== managementSystemId) return {}


    const existTrxName = await getTrxNameByIdAndManagementSystemId(trxNameId, existManagementSystem.id)
    if (!existTrxName) return {}

    const validation = updateTrxNameFormSchema.safeParse(formValue)

    if (!validation.success) return {}
    const { name, variantId: variant } = validation.data

    if (existTrxName.variant === 'BOTH' && variant !== 'BOTH') {
        if (variant === 'SOURCE') {
            //! update to source variant & delete all exist assigned received bank
            const [updatedToSource] = await db.update(transactionNameDbTable).set({ variant }).where(eq(transactionNameDbTable.id, existTrxName.id)).returning()

            if (!updatedToSource) return {}
            const deleted = await db.delete(assignReceiveBankToTransactionNameDbTable).where(
                eq(assignReceiveBankToTransactionNameDbTable.transactionNameId, existTrxName.id)
            ).returning()

            if (deleted.length <= 0) {
                await db.update(transactionNameDbTable).set({ variant: 'BOTH' }).where(eq(transactionNameDbTable.id, existTrxName.id)).returning()

            }

        } else {

            //! update to receive variant & delete all exist assigned sources bank
        }

    }



}