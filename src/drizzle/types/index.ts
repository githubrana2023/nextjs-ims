import {
    assignReceiveBankToTransactionNameDbTable,
    assignSourceBankToTransactionNameDbTable,
    bankAccountDbTable,
    bankTransactionDbTable,
    managementSystemDbTable,
    transactionDbTable,
    transactionNameDbTable
} from "../schema";

import { ExtractTablesWithRelations } from "drizzle-orm"
import { PgTransaction } from "drizzle-orm/pg-core"
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";

export type InsertTrxName = typeof transactionNameDbTable.$inferInsert
export type TrxName = typeof transactionNameDbTable.$inferSelect

export type InsertBankAccount = typeof bankAccountDbTable.$inferInsert
export type BankAccount = typeof bankAccountDbTable.$inferSelect

export type InsertManagementSystem = typeof managementSystemDbTable.$inferInsert
export type ManagementSystem = typeof managementSystemDbTable.$inferSelect

export type InsertAssignSourceBank = typeof assignSourceBankToTransactionNameDbTable.$inferInsert
export type AssignSourceBank = typeof assignSourceBankToTransactionNameDbTable.$inferSelect

export type InsertAssignReceiveBank = typeof assignReceiveBankToTransactionNameDbTable.$inferInsert
export type AssignReceiveBank = typeof assignReceiveBankToTransactionNameDbTable.$inferSelect

export type InsertTrx = typeof transactionDbTable.$inferInsert
export type Trx = typeof transactionDbTable.$inferSelect

export type InsertBankTransaction = typeof bankTransactionDbTable.$inferInsert
export type BankTransaction = typeof bankTransactionDbTable.$inferSelect


export type PgTrx = PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>
