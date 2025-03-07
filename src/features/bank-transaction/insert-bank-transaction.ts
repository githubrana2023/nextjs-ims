'use server'

import { db } from "@/drizzle/db";
import { bankTransactionDbTable } from "@/drizzle/schema"

import { BankAccount, ManagementSystem, Trx } from "@/drizzle/types"



type InsertBankTransaction = {
    BOTH: {
        existManagementSystem: ManagementSystem;
        newTrx: Trx
        existSourceBank: BankAccount;
        existReceiveBank: BankAccount;
    };
    SOURCE: {
        existManagementSystem: ManagementSystem;
        newTrx: Trx
        existSourceBank: BankAccount;
    };
    RECEIVE: {
        existManagementSystem: ManagementSystem;
        newTrx: Trx
        existReceiveBank: BankAccount;
    };
}

export const insertBankTransactionForBoth = async ({
    existManagementSystem,
    newTrx,
    existSourceBank,
    existReceiveBank
}: InsertBankTransaction['BOTH']
) => {
    const [newBankTrx] = await db.insert(bankTransactionDbTable).values({
        managementSystemId: existManagementSystem.id,
        transactionId: newTrx.id,
        sourceBankAccountId: existSourceBank.id,
        receiveBankAccountId: existReceiveBank.id
    }).returning()
    return newBankTrx
}

export const insertBankTransactionForSource = async ({
    existManagementSystem,
    newTrx,
    existSourceBank,
}: InsertBankTransaction['SOURCE']
) => {
    const [newBankTrx] = await db.insert(bankTransactionDbTable).values({
        managementSystemId: existManagementSystem.id,
        transactionId: newTrx.id,
        sourceBankAccountId: existSourceBank.id,
    }).returning()
    return newBankTrx
}

export const insertBankTransactionForReceive = async ({
    existManagementSystem,
    newTrx,
    existReceiveBank,
}: InsertBankTransaction['RECEIVE']
) => {
    const [newBankTrx] = await db.insert(bankTransactionDbTable).values({
        managementSystemId: existManagementSystem.id,
        transactionId: newTrx.id,
        sourceBankAccountId: existReceiveBank.id,
    }).returning()
    return newBankTrx
}


