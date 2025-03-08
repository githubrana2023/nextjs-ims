import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helper";
import { relations } from "drizzle-orm";
import { managementSystemDbTable } from "./management-system";
import { assignReceiveBankToTransactionNameDbTable } from "./assign-receive-bank";
import { assignSourceBankToTransactionNameDbTable } from "./assign-source-bank";


export const transactionNameVariantEnum = ['BOTH', 'SOURCE', 'RECEIVE'] as const;
export type TransactionNameVariant = typeof transactionNameVariantEnum[number];

export const transactionNameDbTable = pgTable('transaction_names', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    name: varchar('name').notNull(),
    variant: varchar('variant', { enum: transactionNameVariantEnum }).notNull(),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
});

export const transactionNameRelations = relations(transactionNameDbTable, ({ one, many }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [transactionNameDbTable.managementSystemId],
        references: [managementSystemDbTable.id],
    }),
    assignReceiveBanks: many(assignReceiveBankToTransactionNameDbTable, { relationName: 'assignedReceiveBankInTrxName', }),
    assignSourceBanks: many(assignSourceBankToTransactionNameDbTable, { relationName: 'assignedSourceBankInTrxName' })
}))