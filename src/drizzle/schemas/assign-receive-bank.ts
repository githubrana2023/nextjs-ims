import { pgTable, uuid, } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { bankAccountDbTable } from "./bank-account";
import { transactionNameDbTable } from "./transaction-name";
import { relations } from "drizzle-orm";

export const assignReceiveBankToTransactionNameDbTable = pgTable('assign_receive_bank_to_transaction_names', {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    receiveBankAccountId: uuid('receive_bank_account_id').notNull().references(() => bankAccountDbTable.id, { onDelete: 'cascade' }),
    transactionNameId: uuid('transaction_name_id').notNull().references(() => transactionNameDbTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
});


export const assignReceiveBankToTransactionNameRelations = relations(assignReceiveBankToTransactionNameDbTable, ({ one }) => ({
    receiveBankAccount: one(bankAccountDbTable, {
        fields: [assignReceiveBankToTransactionNameDbTable.receiveBankAccountId],
        references: [bankAccountDbTable.id],
        relationName: "assignReceiveBankInBankAccount"
    }),

    transactionName: one(transactionNameDbTable, {
        fields: [assignReceiveBankToTransactionNameDbTable.transactionNameId],
        references: [transactionNameDbTable.id],
        relationName: "assignedReceiveBankInTrxName"
    })
}))
