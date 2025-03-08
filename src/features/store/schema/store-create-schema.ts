import { z } from "zod";


export const storeFormSchema = z.object({
    name:z.string({required_error:"Store Name is Required!"}).nonempty(),
    storeCode:z.string({required_error:'Store Code is Required!'}).nonempty().min(6,'Store Code must be 6 characters long!')
})

export type StoreFormValue = z.infer<typeof storeFormSchema>