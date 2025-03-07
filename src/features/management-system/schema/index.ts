import { z } from "zod";

export const managementSystemFormSchema = z.object({
    name: z.string({ required_error: "Name is required" }).nonempty(),
})

export type ManagementSystemFormValue = z.infer<typeof managementSystemFormSchema>