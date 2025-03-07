import { HTMLInputTypeAttribute } from "react";
import { ManagementSystemFormValue } from "../schema";

type InputPropsObj<T = string> = Record<keyof ManagementSystemFormValue, T>

export const managementSystemInputType: InputPropsObj<HTMLInputTypeAttribute> = {
    name: 'text'
}

export const managementSystemInputPlaceholder: InputPropsObj = {
    name: "e.g. Your Management System"
}

export const managementSystemInputLabel: InputPropsObj = {
    name: "Name"
}

export const managementSystemDefaultValues: InputPropsObj = {
    name: ""
}
