import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { relations } from "drizzle-orm";
import { managementSystemDbTable } from "./management-system";
import { familyMemberDbTable } from "./family-member";

export const familyExpenseSystemDbTable = pgTable('family_expense_system', {
    id: uuid('id').primaryKey().unique().notNull(),
    name: text('name').notNull(),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id),
    createdAt,
    updatedAt,
})

export const familyExpenseSystemRelation = relations(familyExpenseSystemDbTable, ({ one, many }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [familyExpenseSystemDbTable.managementSystemId],
        references: [managementSystemDbTable.id]
    }),
    familyMembers: many(familyMemberDbTable)
}))