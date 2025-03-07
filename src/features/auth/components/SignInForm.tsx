'use client'
import { useForm } from 'react-hook-form'
import { signInFormSchema, SignInFormValue } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Form, FormField } from '@/components/ui/form'

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
    <Form {...signInForm}>
      <form onSubmit={onSubmit}>
        <FormField
        control={control}
        name='email'
        render={({})=>(
          <Formco
        )}
        />
      </form>
    </Form>
  )
}
