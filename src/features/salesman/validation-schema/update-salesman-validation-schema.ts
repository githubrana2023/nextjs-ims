import { z } from 'zod'

export const updateSalesmanFormSchema = z.object({
    name: z.string().optional(),
    phone: z.string()
        .min(11, { message: "Salesman phone must be 11 characters long!" })
        .max(11, { message: 'Salesman phone should not be more then 11 characters long' })
        .refine(phone => /^(?:015|016|017|018|019|013|014)\d+$/.test(phone), { message: "Invalid Phone Number!" })
        .optional(),
    supplierId: z.string().uuid({ message: 'Invalid Supplier Id' }).optional(),
    email: z.string().email({ message: "Invalid Email!" }).optional(),
    nid: z.string().optional(),
})

export type UpdateSalesmanFormValue = z.infer<typeof updateSalesmanFormSchema>