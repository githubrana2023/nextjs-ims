import { pgTable, varchar, uuid, timestamp} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm"
import { storesTable } from "./store";

export const userRoles = ['ADMIN','OWNER'] as const
// User Table
export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { enum: userRoles }).default("OWNER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Store Table relation 
export const usersRelation = relations(usersTable, ({
    many
}) => ({
    stores: many(storesTable),
}))