'use client'
import { useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'

import { signInFormSchema, SignInFormValue } from '@/features/auth/schema'
import { CardWrapper } from '@/components/CardWrapper'
import { Separator } from '@/components/ui/separator'

export const SignInForm = () => {
  const [isPending, startTransaction] = useTransition()

  const signInForm = useForm<SignInFormValue>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })


  const { control, handleSubmit } = signInForm
  const onSubmit = handleSubmit(formValue => {
    startTransaction(
      async () => {
        console.log(formValue)
      }
    )
  })
  return (
    <CardWrapper
      title='Sign In'
      description='Welcome back to store management system.'
    >
      <Form {...signInForm}>
        <form onSubmit={onSubmit} className="space-y-6">
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="********" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className='w-full'>Sing Up</Button>
        </form>
        <Separator/>
        <div>
          Don't have account? <Link href={'/auth/sign-up'} className='font-semibold'>Sign Up</Link>
        </div>
        <div>
          Don't have account? <Link href={'/auth/sign-up'} className='font-semibold'>Sign Up</Link>
        </div>
        <div>
          Don't have account? <Link href={'/auth/sign-up'} className='font-semibold'>Sign Up</Link>
        </div>
        <div>
          Don't have account? <Link href={'/auth/sign-up'} className='font-semibold'>Sign Up</Link>
        </div>
      </Form>
    </CardWrapper>
  )
}
