'use server'
import { DEFAULT_BANK_NAME, DEFAULT_TRANSACTION_NAME } from '../constants';
import { AssignBankFormValue, assignBankFormSchema } from '../schema';
import { currentUser } from '@/services/auth';
import { getUserById } from '@/features/expense-management/users/db/user';
import { getManagementSystemByUserId } from '@/features/expense-management/management-system/db/getManagementSystem';
import { getTrxNameByIdAndManagementSystemId } from '@/features/expense-management/trx-name/db/getTrxName';
import { getBankAccountByIdAndManagementSystemId } from '@/features/expense-management/bank-account/db/getBankAccount';
import { assignBank, insertAssignReceiveBank, insertAssignSourceBank } from '../db/insert-assign-bank';

import { getAssignedReceiveBank, getAssignedSourceBank } from '../db/get-assigned-bank';


export const assignBankAction = async (assignBankFormValue: AssignBankFormValue) => {
    const user = await currentUser()

    if (!user.userId) return {}

    const existUser = await getUserById(user.userId)
    if (!existUser) return {}

    const existManagementSystem = await getManagementSystemByUserId(existUser.id)

    if (!existManagementSystem) return {}


    const validation = assignBankFormSchema.safeParse(assignBankFormValue)

    if (!validation.success) return {}


    const { receiveBankAccountId, sourceBankAccountId, transactionNameId } = validation.data


    const existingTrxName = await getTrxNameByIdAndManagementSystemId(
        transactionNameId,
        existManagementSystem.id
    )
    if (!existingTrxName) return {}

    const { variant } = existingTrxName




    if (variant === 'BOTH') {

        if (!receiveBankAccountId || !sourceBankAccountId) return {}

        const [existingReceiveBank, existingSourceBank] = await Promise.all(
            [
                getBankAccountByIdAndManagementSystemId(
                    receiveBankAccountId,
                    existManagementSystem.id
                ),
                getBankAccountByIdAndManagementSystemId(
                    sourceBankAccountId,
                    existManagementSystem.id
                )
            ]
        )

        if (!existingReceiveBank || !existingSourceBank) return {}


        const existAssignedSourceBank = await getAssignedSourceBank(existingSourceBank.id, existingTrxName.id)
        const existAssignedReceiveBank = await getAssignedReceiveBank(existingReceiveBank.id, existingTrxName.id)

        //! trx name WITHDRAWAL 
        if (existingTrxName.name === DEFAULT_TRANSACTION_NAME.WITHDRAWAL) {

            if (existingSourceBank.name === DEFAULT_BANK_NAME.CASH) return {}

            if (existingReceiveBank.name !== DEFAULT_BANK_NAME.CASH) return {}

            return await assignBank({
                existingTrxName,
                existingSourceBank,
                existingReceiveBank,
                existAssignedSourceBank,
                existAssignedReceiveBank
            })
        }

        //! trx name DEPOSIT
        if (existingTrxName.name === DEFAULT_TRANSACTION_NAME.DEPOSIT) {
            if (existingSourceBank.name !== DEFAULT_BANK_NAME.CASH) return {}

            if (existingReceiveBank.name === DEFAULT_BANK_NAME.CASH) return {}
            return await assignBank({
                existAssignedReceiveBank,
                existAssignedSourceBank,
                existingReceiveBank,
                existingSourceBank,
                existingTrxName
            })
        }

        //! trx name TRANSFER & Exchange
        if (
            existingTrxName.name === DEFAULT_TRANSACTION_NAME.TRANSFER
            || existingTrxName.name === DEFAULT_TRANSACTION_NAME.EXCHANGE
        ) {
            if (existingSourceBank.name === existingReceiveBank.name) return {}

            if (!existAssignedSourceBank && !existAssignedReceiveBank) {
                return await assignBank(
                    {
                        existAssignedReceiveBank,
                        existAssignedSourceBank,
                        existingReceiveBank,
                        existingSourceBank,
                        existingTrxName
                    }
                )
            }
        }
    }


    if (variant === 'SOURCE') {

        if (!sourceBankAccountId) return {}

        const existingSourceBank = await getBankAccountByIdAndManagementSystemId(sourceBankAccountId, existManagementSystem.id)

        if (!existingSourceBank) return {}

        return await insertAssignSourceBank({
            existingSourceBank,
            existingTrxName
        })
    }

    if (!receiveBankAccountId) return {}
    const existingReceiveBank = await getBankAccountByIdAndManagementSystemId(receiveBankAccountId, existManagementSystem.id)

    if (!existingReceiveBank) return {}
    return await insertAssignReceiveBank({
        existingReceiveBank, existingTrxName
    })

}