import {z} from 'zod'

export const updateStoreFormSchema = z.object({
    name:z.string().optional(),
    storeCode:z.string().optional(),
})

export type UpdateStoreFormValue = z.infer<typeof updateStoreFormSchema>
