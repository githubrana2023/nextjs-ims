import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { bankAccountDbTable } from "./bank-account";
import { transactionNameDbTable } from "./transaction-name";
import { relations } from "drizzle-orm";

export const assignSourceBankToTransactionNameDbTable = pgTable('assign_source_bank_to_transaction_names', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    sourceBankAccountId: uuid('source_bank_account_id').notNull().references(() => bankAccountDbTable.id, { onDelete: 'cascade' }),
    transactionNameId: uuid('transaction_name_id').notNull().references(() => transactionNameDbTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
});


export const assignSourceBankToTransactionNameRelations = relations(assignSourceBankToTransactionNameDbTable, ({ one }) => ({
    sourceBankAccount: one(bankAccountDbTable, {
        fields: [assignSourceBankToTransactionNameDbTable.sourceBankAccountId],
        references: [bankAccountDbTable.id],
        relationName: "assignSourceBankInBankAccount"
    }),

    transactionName: one(transactionNameDbTable, {
        fields: [assignSourceBankToTransactionNameDbTable.transactionNameId],
        references: [transactionNameDbTable.id],
        relationName: 'assignedSourceBankInTrxName'
    })
}))
