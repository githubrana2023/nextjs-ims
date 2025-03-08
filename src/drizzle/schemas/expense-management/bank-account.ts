import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helper";
import { managementSystemDbTable } from "./management-system";
import { relations } from "drizzle-orm";
import { assignSourceBankToTransactionNameDbTable } from "./assign-source-bank";
import { assignReceiveBankToTransactionNameDbTable } from "./assign-receive-bank";

export const bankAccountDbTable = pgTable('bank_accounts', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id, { onDelete: 'cascade' }),
    name: varchar('name').notNull(),
    balance: numeric('balance', { precision: 8, scale: 2 }).notNull(),
    createdAt,
    updatedAt
});

export const bankAccountRelations = relations(bankAccountDbTable, ({ one, many }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [bankAccountDbTable.managementSystemId],
        references: [managementSystemDbTable.id]
    }),
    assignReceiveBanks: many(assignReceiveBankToTransactionNameDbTable, { relationName: 'assignReceiveBankInBankAccount' }),
    assignSourceBanks: many(assignSourceBankToTransactionNameDbTable, { relationName: 'assignSourceBankInBankAccount' })
}))