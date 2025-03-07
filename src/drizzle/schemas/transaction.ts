import { numeric, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { relations } from "drizzle-orm";
import { managementSystemDbTable } from "./management-system";
import { transactionNameDbTable } from "./transaction-name";

export const transactionDbTable = pgTable('transactions', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id, { onDelete: 'cascade' }),
    transactionNameId: uuid('transaction_name_id').notNull().references(() => transactionNameDbTable.id, { onDelete: 'restrict' }),
    title: varchar('title').notNull(),
    description: text('description'),
    amount: numeric('amount', { precision: 8, scale: 2 }).notNull(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
});

export const transactionRelations = relations(transactionDbTable, ({ one }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [transactionDbTable.managementSystemId],
        references: [managementSystemDbTable.id]
    }),
    transactionName: one(transactionNameDbTable, {
        fields: [transactionDbTable.transactionNameId],
        references: [transactionNameDbTable.id]
    })
}))