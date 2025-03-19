import { z } from 'zod'

export const createSalesmanFormSchema = z.object({
    name: z.string({ required_error: 'Salesman Name is Required!' }).min(3, { message: "Salesman name must be 3 characters long!" }),
    phone: z.string({ required_error: 'Salesman Name is Required!' })
        .min(11, { message: "Salesman phone must be 11 characters long!" })
        .max(11, { message: 'Salesman phone should not be more then 11 characters long' })
        .refine(phone => /^(?:015|016|017|018|019|013|014)\d+$/.test(phone), { message: "Invalid Phone Number!" }),
    supplierId: z.string({ required_error: 'Select a supplier!' }).uuid({ message: 'Invalid Supplier Id' }),
    email: z.string().email({message:"Invalid Email!"}).optional(),
    nid: z.string().optional(),
})

export type CreateSalesmanFormValue = z.infer<typeof createSalesmanFormSchema>