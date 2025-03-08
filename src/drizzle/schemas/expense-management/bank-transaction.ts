import { pgTable, uuid, } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helper";
import { managementSystemDbTable } from "./management-system";
import { transactionDbTable } from "./transaction";
import { bankAccountDbTable } from "./bank-account";
import { relations } from "drizzle-orm";

export const bankTransactionDbTable = pgTable('bank_transactions', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id, { onDelete: 'cascade' }),
    transactionId: uuid('transaction_id').notNull().references(() => transactionDbTable.id, { onDelete: 'restrict' }),
    sourceBankAccountId: uuid('source_bank_account_id'),
    receiveBankAccountId: uuid('receive_bank_account_id'),
    createdAt,
    updatedAt
});


export const bankTransactionRelations = relations(bankTransactionDbTable, ({ one }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [bankTransactionDbTable.managementSystemId],
        references: [managementSystemDbTable.id]
    }),

    transaction: one(transactionDbTable, {
        fields: [bankTransactionDbTable.transactionId],
        references: [transactionDbTable.id]
    }),

    sourceBankAccount: one(bankAccountDbTable, {
        fields: [bankTransactionDbTable.sourceBankAccountId],
        references: [bankAccountDbTable.id],
        relationName: 'sourceBankAccount'
    }),

    receiveBankAccount: one(bankAccountDbTable, {
        fields: [bankTransactionDbTable.receiveBankAccountId],
        references: [bankAccountDbTable.id],
        relationName: 'receiveBankAccount'
    })
}))