'use server'

import { db } from "@/drizzle/db"
import { bankAccountDbTable } from "@/drizzle/schema"
import { BankAccount, ManagementSystem } from "@/drizzle/types"
import { and, eq } from "drizzle-orm"
import { UpdateBankAccountFormValue } from "../schemas/bank-account-schema"



export const reduceSourceBankAccountBalanceWithPgTrx = async ({
    existSourceBankAccountBalance, convertedAmount, existSourceBank }: {
        existSourceBankAccountBalance: number;
        convertedAmount: number;
        existSourceBank: BankAccount
    }) => {
    const [updated] = await db.update(bankAccountDbTable).set({
        balance: (existSourceBankAccountBalance - convertedAmount).toString(),
    }).where(eq(bankAccountDbTable.id, existSourceBank.id)).returning()
    return updated
}


export const addReceiveBankAccountBalanceWithPgTrx = async ({
    existReceiveBankAccountBalance, convertedAmount, existReceiveBank }: {
        existReceiveBankAccountBalance: number;
        convertedAmount: number;
        existReceiveBank: BankAccount
    }) => {
    const [updated] = await db.update(bankAccountDbTable).set({
        balance: (existReceiveBankAccountBalance + convertedAmount).toString(),
    }).where(eq(bankAccountDbTable.id, existReceiveBank.id)).returning()

    return updated
}


export const updateBankAccount = async ({ name, balance }: UpdateBankAccountFormValue, existManagementSystem: ManagementSystem, existBankAccount: BankAccount) => {
    const [updatedBankAccount] = await db
        .update(bankAccountDbTable)
        .set({
            name,
            balance: balance?.toString(),
        })
        .where(
            and(
                eq(bankAccountDbTable.managementSystemId, existManagementSystem.id),
                eq(bankAccountDbTable.id, existBankAccount.id)
            )
        )
        .returning()

    return updatedBankAccount
}