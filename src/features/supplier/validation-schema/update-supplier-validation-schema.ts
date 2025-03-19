import { z } from 'zod'

export const updateSupplierFormSchema = z.object({
    name: z.string().optional(),
    supplierCode: z.string().optional(),
})

export type UpdateSupplierFormValue = z.infer<typeof updateSupplierFormSchema>