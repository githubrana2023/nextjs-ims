import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { managementSystemDbTable } from "./management-system";
import { createdAt, updatedAt } from "../schema-helper";
import { relations } from "drizzle-orm";
import { userDbTable } from "./user";
import { familyExpenseSystemDbTable } from "./family-expense-system";

export const familyMemberRoles = ['FATHER', 'MOTHER', 'SISTER', 'BROTHER', 'WIFE', 'SON', 'DAUGHTER'] as const
export type FamilyMemberRole = typeof familyMemberRoles[number]

export const familyMemberDbTable = pgTable('family_member', {
    id: uuid('id').primaryKey().notNull().unique(),
    phone: varchar('phone').notNull().unique().references(() => userDbTable.phone),
    managementSystemId: uuid('management_system_id').notNull().references(() => managementSystemDbTable.id),
    familyExpenseSystemId: uuid('family_expense_system_id').notNull().references(() => familyExpenseSystemDbTable.id),
    familyMemberRole: varchar('family_member_role', { enum: familyMemberRoles }).notNull(),
    createdAt,
    updatedAt
});

export const familyMemberRelation = relations(familyMemberDbTable, (({ one }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [familyMemberDbTable.managementSystemId],
        references: [managementSystemDbTable.id]
    }),
    familyExpenseSystem: one(familyExpenseSystemDbTable, {
        fields: [familyMemberDbTable.familyExpenseSystemId],
        references: [familyExpenseSystemDbTable.id]
    }),
    member: one(userDbTable, {
        fields: [familyMemberDbTable.phone],
        references: [userDbTable.phone]
    })
})))