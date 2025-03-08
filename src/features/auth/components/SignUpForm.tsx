'use client'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'

import { signUpFormSchema, SignUpFormValue } from '@/features/auth/schema'
import { CardWrapper } from '@/components/CardWrapper'

export const SignUpForm = () => {
    const [isPending, startTransaction] = useTransition()

    const signUpForm = useForm<SignUpFormValue>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })


    const { control, handleSubmit } = signUpForm
    const onSubmit = handleSubmit(formValue => {
        startTransaction(
            async () => {
                console.log(formValue)
            }
        )
    })
    return (
        <CardWrapper
            title='Sign Up'
            description='Create Your Account.'
        >
            <Form {...signUpForm}>
                <form onSubmit={onSubmit} className="space-y-6">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Guljar hussain" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. example@example.com" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="********" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="********" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} className='w-full'>Sing Up</Button>
                </form>
                <Separator className='my-2' />
                <div className='w-full flex items-center justify-center gap-2'>
                    Don't have account? <Link href={'/auth/sign-in'} className='font-semibold'>Sign In</Link>
                </div>
            </Form>
        </CardWrapper>
    )
}
