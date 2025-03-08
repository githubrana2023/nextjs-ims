import { z } from "zod";


export const storeUpdateFormSchema = z.object({
    name:z.string().min(3,{message:'Store Name must be 3 characters long!'}).optional()
})

export type StoreUpdateFormValue = z.infer<typeof storeUpdateFormSchema>