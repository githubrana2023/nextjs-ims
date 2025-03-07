import { AssignBankFormValue } from "../schema"

export const DEFAULT_TRANSACTION_NAME = {
    INCOME: "INCOME",
    WITHDRAWAL: "WITHDRAWAL",
    DEPOSIT: "DEPOSIT",
    TRANSFER: "TRANSFER",
    EXPENSES: "EXPENSES",
    EXCHANGE: "EXCHANGE",
} as const

export const DEFAULT_BANK_NAME = {
    CASH: "CASH",
} as const

export type DEFAULT_TRANSACTION_NAME_TYPE = keyof typeof DEFAULT_TRANSACTION_NAME

type AssignBankInput = Record<keyof AssignBankFormValue, string>

export const assignBankDefaultValues: AssignBankInput = {
    sourceBankAccountId: "",
    receiveBankAccountId: "",
}

export const assignBankSelectLabel: AssignBankInput = {
    sourceBankAccountId: "Your Bank Account",
    receiveBankAccountId: "Your Bank Account",
}

export const assignBankSelectPlaceholder: AssignBankInput = {
    sourceBankAccountId: "Select a Source Bank Account",
    receiveBankAccountId: "Select a Receive Bank Account",
}



