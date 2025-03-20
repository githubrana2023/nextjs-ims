import { z } from "zod";

export const createProductCategoryFormSchema = z.object({
    name: z.string({required_error:"Product Category Name is Required!"}).min(3,{message:'Product Category Name must be 3 characters long!'}).trim(),
    storeId: z.string({required_error:"Select a store!"}).uuid({message:'Invalid Store Id'}),
    description: z.string().optional()
})


export const updateProductCategoryFormSchema = z.object({
    name: z.string().min(3,{message:'Product Category Name must be 3 characters long!'}).trim().optional(),
    storeId: z.string().uuid({message:'Invalid Store Id'}).uuid().optional(),
    description: z.string().optional()
})


export type CreateProductCategoryFormValue = z.infer<typeof createProductCategoryFormSchema>
export type UpdateProductCategoryFormValue = z.infer<typeof updateProductCategoryFormSchema>