import { HTMLInputTypeAttribute } from "react";
import { BankAccountFormValue } from "../schemas/bank-account-schema";
import { DefaultValues } from "react-hook-form";

type BankAccountInputType<T = HTMLInputTypeAttribute> = Record<keyof BankAccountFormValue, T>

export const BankAccountDefaultValues: DefaultValues<BankAccountFormValue> = {
    name: "",
    balance: 0
}

export const BankAccountInputLabel: BankAccountInputType<string> = {
    name: "Bank Account Name",
    balance: "Balance"
}

export const BankAccountInputType: BankAccountInputType = {
    name: "text",
    balance: "number"
}

export const BankAccountInputPlaceholder: BankAccountInputType<string> = {
    name: "e.g. BKash",
    balance: "e.g. 1845"
}
