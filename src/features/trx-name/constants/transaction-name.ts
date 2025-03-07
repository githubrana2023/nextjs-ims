import { OmitIdFields } from "@/data/types";
import { TransactionNameFormValue } from "../schemas/transaction-name";
import { HTMLInputTypeAttribute } from "react";

export type TransactionInputKey = keyof OmitIdFields<TransactionNameFormValue>

export const transactionNameInputType: Record<TransactionInputKey, HTMLInputTypeAttribute> = {
    name: 'text'
}

export const transactionNameInputLabel: Record<TransactionInputKey, string> = {
    name: 'Transaction Name'
}

export const transactionNameInputPlaceholder: Record<TransactionInputKey, string> = {
    name: 'e.g. INCOME'
}
export const transactionNameInputDefaultValue: Record<TransactionInputKey, string> = {
    name: ''
}