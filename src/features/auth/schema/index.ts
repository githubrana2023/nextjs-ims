import { z } from "zod";

export const signInFormSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).nonempty(),
    password: z.string({ required_error: 'Password is required!' }).nonempty(),
})

export type SignInFormValue = z.infer<typeof signInFormSchema>

