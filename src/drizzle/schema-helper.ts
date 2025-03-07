import { uuid, timestamp } from "drizzle-orm/pg-core";

export const id = uuid('id').unique().primaryKey().defaultRandom().notNull();
export const createdAt = timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
export const updatedAt = timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$defaultFn(() => new Date());