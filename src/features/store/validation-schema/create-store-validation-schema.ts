import {z} from 'zod'

export const createStoreFormSchema = z.object({
    name:z.string({required_error:'Store Name is Required!'}).min(5,{message:'Store Name must be 5 characters long!'}),
    storeCode:z.string({required_error:'Store Code is Required!'}).min(6,{message:'Store Code must be 6 characters long!'})
})

export type CreateStoreFormValue = z.infer<typeof createStoreFormSchema>