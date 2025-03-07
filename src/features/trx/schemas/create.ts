import { z } from "zod";

export const trxFormSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    amount: z.coerce.number(),
    date: z.date(),
    managementSystemId: z.string().nonempty(),
    transactionNameId: z.string().nonempty(),
    sourceBankAccountId: z.string().optional(),
    receiveBankAccountId: z.string().optional(),
})

export type TrxFormValue = z.infer<typeof trxFormSchema>