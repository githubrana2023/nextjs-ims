import { z } from "zod";

export const signInFormSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).nonempty(),
    password: z.string({ required_error: 'Password is required!' }).nonempty(),
})

export type SignInFormValue = z.infer<typeof signInFormSchema>


export const signUpFormSchema = z.object({
    name: z.string({ required_error: 'Name is required!' }).nonempty().trim(),
    email: z.string({ required_error: 'Email is required!' }).nonempty().trim(),
    password: z.string({ required_error: 'Password is required!' }).nonempty(),
    confirmPassword: z.string({ required_error: 'Confirm Password is required!' }).nonempty(),
})

export type SignUpFormValue = z.infer<typeof signUpFormSchema>

