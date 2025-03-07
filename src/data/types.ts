import { HTMLInputTypeAttribute } from "react";

export type PickIdFields<T extends Record<string, unknown>> = {
    [K in keyof T as K extends `${infer _Prefix}Id` ? K : never]: T[K]
};
export type OmitIdFields<T extends Record<string, unknown>> = {
    [K in keyof T as K extends `${infer _Prefix}Id` ? never : K]: T[K]
};

export type InputType<T> = Record<keyof T, HTMLInputTypeAttribute>;
export type InputLabel<T> = Record<keyof T, string>;
export type InputPlaceholder<T> = Record<keyof T, string>;

export type SelectOptionType = { id: string, label: string }[]

export type Id = string | string[] | undefined


