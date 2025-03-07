import { z } from "zod";

export const bankAccountFormSchema = z.object(
    {
        name: z.string({ required_error: 'Bank Name is required!' }),
        balance: z.coerce.number().nonnegative({ message: "Balance must be greater than zero!" })
    }
)

export const updateBankAccountFormSchema = z.object(
    {
        name: z.string().optional(),
        balance: z.coerce.number().optional()
    }
)




export type UpdateBankAccountFormValue = z.infer<typeof updateBankAccountFormSchema>
export type BankAccountFormValue = z.infer<typeof bankAccountFormSchema>