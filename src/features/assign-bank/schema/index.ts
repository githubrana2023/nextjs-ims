import { z } from "zod";


export const assignBankFormSchema = z.object({
    sourceBankAccountId: z.string({ required_error: "Select a Source Bank" }).optional(),
    receiveBankAccountId: z.string({ required_error: "Select a Receive Bank" }).optional(),
    transactionNameId: z.string({ required_error: 'Missing Transaction Name Id' }).nonempty()
})

export type AssignBankFormValue = z.infer<typeof assignBankFormSchema>