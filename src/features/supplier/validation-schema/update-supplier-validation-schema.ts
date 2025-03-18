import {z} from 'zod'

export const updateSupplierFormSchema = z.object({
    name:z.string({required_error:'Supplier - is Required!'}).min(6,'Supplier Name must be 6 characters long!'),
    storeId:z.string({required_error:'Select your store!'}).uuid({message:'Invalid Store Id'}),
    supplierCode:z.string({required_error:'Supplier - is Required!'}).min(6,'Supplier Code must be 6 characters long!'),
})

export type UpdateSupplierFormValue = z.infer<typeof updateSupplierFormSchema>