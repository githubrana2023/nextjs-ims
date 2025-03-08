'use server'

import { trxFormSchema, TrxFormValue } from "../schemas/create"
import { currentUser } from "@/services/auth"
import { getUserByClerkId } from "@/features/expense-management/users/db/user"
import { getManagementSystemByIdAndUserId } from "@/features/expense-management/management-system/db/getManagementSystem"
import { getTrxNameById } from "@/features/expense-management/trx-name/db/getTrxName"
import { getBankAccountByIdAndManagementSystemId } from "@/features/expense-management/bank-account/db/getBankAccount"
import { insertBankTransactionForBoth, insertBankTransactionForReceive, insertBankTransactionForSource } from "@/features/expense-management/bank-transaction/insert-bank-transaction"
import { addReceiveBankAccountBalanceWithPgTrx, reduceSourceBankAccountBalanceWithPgTrx } from "@/features/expense-management/bank-account/db/updateBankAccount"
import { createTrx } from "../db/create-trx"
import { revalidatePath } from "next/cache"

export const insertTrxAction = async (formValue: TrxFormValue) => {

    //!checking authentication
    const user = await currentUser()
    if (!user.userId || !user.clerkUserId) return {}
    const existUser = await getUserByClerkId(user.clerkUserId)
    if (!existUser) return {}

    //!checking form validation
    const validation = trxFormSchema.safeParse(formValue)
    if (!validation.success) return {}
    const {
        title,
        date,
        description,
        amount,
        transactionNameId,
        sourceBankAccountId,
        receiveBankAccountId,
        managementSystemId
    } = validation.data


    //!checking user has management system

    const existManagementSystem = await getManagementSystemByIdAndUserId(managementSystemId, existUser.id)
    if (!existManagementSystem) return {}

    //!make sure source & receive bank id provided by user
    if (!sourceBankAccountId && !receiveBankAccountId) return {}

    //!make sure amount is positive number provided by user
    const convertedAmount = Math.abs(amount)


    //!make sure trx name is exist
    const existTrxName = await getTrxNameById(transactionNameId)
    if (!existTrxName) return {}


    //!creating transaction for both ( source & receive )
    if (existTrxName.variant === 'BOTH') {

        //!make sure source & receive bank id provided by user
        if (!sourceBankAccountId || !receiveBankAccountId) return {}

        //!make sure bank account exist with source & receive bank id provided by user
        const [existSourceBank, existReceiveBank] = await Promise.all([
            getBankAccountByIdAndManagementSystemId(sourceBankAccountId, existManagementSystem.id),
            getBankAccountByIdAndManagementSystemId(receiveBankAccountId, existManagementSystem.id),
        ])

        if (!existSourceBank || !existReceiveBank) return {}

        const existSourceBankAccountBalance = Number(existSourceBank.balance)
        const existReceiveBankAccountBalance = Number(existReceiveBank.balance)

        //!make sure source bank has enough balance to continue transaction
        if (existSourceBankAccountBalance < amount || existSourceBankAccountBalance === 0) return {}

        //!updating the source & receive bank account balance
        //! reduce balance from source bank account
        const updatedSourceBankAccountBalance = await reduceSourceBankAccountBalanceWithPgTrx({
            existSourceBankAccountBalance,
            convertedAmount, existSourceBank,
        })

        if (!updatedSourceBankAccountBalance) {
            return {}
        }


        //! added balance to receive bank account
        const updatedReceiveBankAccountBalance = await addReceiveBankAccountBalanceWithPgTrx({
            existReceiveBankAccountBalance, existReceiveBank, convertedAmount
        })

        if (!updatedReceiveBankAccountBalance) {
            return {}
        }

        //! creating new transaction
        const newTrx = await createTrx({
            title,
            description,
            date,
            amount: convertedAmount.toString(),
            managementSystemId: existManagementSystem.id,
            transactionNameId: existTrxName.id
        })

        //! make sure the new transaction is created
        if (!newTrx) {
            return {}
        };

        //! creating bank transaction
        const newBankTrx = await insertBankTransactionForBoth({ existManagementSystem, existReceiveBank, existSourceBank, newTrx })

        //! if any insertion is failed make sure db transaction rollback
        if (!newBankTrx) {
            return {}
        }

        revalidatePath(`/${existManagementSystem.id}/my-expense/trx`)

        return {}
    }



    if (existTrxName.variant === 'SOURCE') {
        if (!sourceBankAccountId) return {}

        const existSourceBank = await getBankAccountByIdAndManagementSystemId(sourceBankAccountId, existManagementSystem.id)

        if (!existSourceBank) return {}

        const existSourceBankAccountBalance = Number(existSourceBank.balance)

        if (existSourceBankAccountBalance < amount || existSourceBankAccountBalance === 0) return {}

        const updatedSourceBankAccountBalance = await reduceSourceBankAccountBalanceWithPgTrx({
            existSourceBankAccountBalance, convertedAmount, existSourceBank,
        })

        if (!updatedSourceBankAccountBalance) return {}

        const newTrx = await createTrx({
            title,
            description,
            date,
            amount: convertedAmount.toString(),
            managementSystemId: existManagementSystem.id,
            transactionNameId: existTrxName.id
        })

        if (!newTrx) {
            return {}
        };

        const newBankTrx = await insertBankTransactionForSource({
            existManagementSystem,
            existSourceBank, newTrx
        })

        if (!newBankTrx) {
            return {}
        }

        return {}
    }

    if (!receiveBankAccountId) return {}

    const existReceiveBank = await getBankAccountByIdAndManagementSystemId(receiveBankAccountId, existManagementSystem.id)

    if (!existReceiveBank) return {}

    const existReceiveBankAccountBalance = Number(existReceiveBank.balance)

    const updatedReceiveBankAccountBalance = await addReceiveBankAccountBalanceWithPgTrx({
        existReceiveBankAccountBalance, convertedAmount, existReceiveBank,
    })

    if (!updatedReceiveBankAccountBalance) return {}

    const newTrx = await createTrx({
        title,
        description,
        date,
        amount: convertedAmount.toString(),
        managementSystemId: existManagementSystem.id,
        transactionNameId: existTrxName.id
    })

    if (!newTrx) {
        return {}
    };

    const newBankTrx = await insertBankTransactionForReceive({
        existManagementSystem,
        existReceiveBank, newTrx
    })

    if (!newBankTrx) {
        return {}
    }

    return {}


}