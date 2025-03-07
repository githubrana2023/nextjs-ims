'use server'

import { db } from "@/drizzle/db"
import { bankAccountDbTable } from "@/drizzle/schema"
import { BankAccount, ManagementSystem } from "@/drizzle/types"
import { and, eq } from "drizzle-orm"

export const deleteBankAccount = async ({ existBankAccount, existManagementSystem }: { existManagementSystem: ManagementSystem, existBankAccount: BankAccount }) => {
    const [deletedBankAccount] = await db
        .delete(bankAccountDbTable)
        .where(
            and(
                eq(bankAccountDbTable.managementSystemId, existManagementSystem.id),
                eq(bankAccountDbTable.id, existBankAccount.id)
            )
        )
        .returning()

    return deletedBankAccount
}