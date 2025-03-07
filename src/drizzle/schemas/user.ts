import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schema-helper";
import { relations } from "drizzle-orm";
import { managementSystemDbTable } from "./management-system";


export const userRoleEnum = ['ADMIN', 'MEMBER', 'SUPER_ADMIN'] as const;
export type UserRole = typeof userRoleEnum[number];


export const userDbTable = pgTable('users', {
    id: uuid('id').unique().primaryKey().defaultRandom().notNull(),
    clerkUserId: text('clerkUserId').notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: varchar('role', { enum: userRoleEnum }).default('MEMBER').notNull(),
    imageUrl: text('imageUrl'),
    createdAt,
    updatedAt
})

export const userRelation = relations(userDbTable, ({ one }) => ({
    managementSystem: one(managementSystemDbTable, {
        fields: [userDbTable.id],
        references: [managementSystemDbTable.userId]
    })
}))