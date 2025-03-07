import { transactionNameVariantEnum } from "@/drizzle/schema";
import { z } from "zod";

export const transactionNameFormSchema = z.object({
    name: z.string({ required_error: "Name is required" }).nonempty(),
    variantId: z.enum(transactionNameVariantEnum)
})
export const updateTrxNameFormSchema = z.object({
    name: z.string().optional(),
    variantId: z.enum(transactionNameVariantEnum).optional()
})

export type TransactionNameFormValue = z.infer<typeof transactionNameFormSchema>
export type UpdateTrxNameFormValue = z.infer<typeof updateTrxNameFormSchema>