import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { relations } from "drizzle-orm";
import { userDbTable } from "./user";
import { transactionNameDbTable } from "./transaction-name";
import { transactionDbTable } from "./transaction";
import { bankAccountDbTable } from "./bank-account";
import { bankTransactionDbTable } from "./bank-transaction";

export const managementSystemDbTable = pgTable('management_systems', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    name: varchar('name').notNull(),
    userId: uuid('user_id').notNull().unique().references(() => userDbTable.id, { onDelete: 'cascade' },),
    createdAt,
    updatedAt,
});


export const managementSystemRelation = relations(managementSystemDbTable, ({ one, many }) => ({
    user: one(userDbTable, {
        fields: [managementSystemDbTable.userId],
        references: [userDbTable.id]
    }),

    bankAccounts: many(bankAccountDbTable),
    transactionNames: many(transactionNameDbTable),
    transactions: many(transactionDbTable),
    bankTransactions: many(bankTransactionDbTable)
}))



// export const managementSystemRelations = relations(managementSystems, ({ many }) => ({
//     bankAccounts: many(bankAccounts),
//     transactions: many(transactions),
//     bankTransactions: many(bankTransactions)
// }));
