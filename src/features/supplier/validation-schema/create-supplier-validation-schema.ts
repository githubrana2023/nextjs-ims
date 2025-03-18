import {z} from 'zod'

export const createSupplierFormSchema = z.object({
    name:z.string({required_error:'Supplier Name is Required!'}).min(6,'Supplier Name must be 6 characters long!'),
    storeId:z.string({required_error:'Select your store!'}).uuid({message:'Invalid Store Id'}),
    supplierCode:z.string({required_error:'Supplier Code is Required!'}).min(6,'Supplier Code must be 6 characters long!'),
    totalDue:z.string({required_error:'Supplier Total is Required!'}).min(6,'Supplier Code must be 6 characters long!'),
})

export type CreateSupplierFormValue = z.infer<typeof createSupplierFormSchema>