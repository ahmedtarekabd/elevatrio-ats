import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import axio from '@/lib/axios'
import { LoginSchema } from '@/schema/authentication'
import { addToken } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignInForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    // const response = await axio.post('/auth/signin', data)
    const res = await signIn('credentials', {
      ...form.getValues(),
      redirect: false,
    })
    // console.log(res)
    if (res?.ok) {
      toast({
        title: 'Success',
        description: 'You have been logged in Successfully',
      })
      router.push('/')
      router.refresh()
    } else {
      console.log(res)
      toast({
        title: 'Error',
        description: 'Login Failed\n' + res?.error,
      })
    }
    // if (response.status === 200) {
    //   addToken(response.data)
    //   toast({
    //     title: 'Success!',
    //     description: 'Redirecting to your Dashboard.',
    //   })
    //   setTimeout(() => {
    //     window.location.href = '/dashboard'
    //   }, 1000)
    // } else {
    //   toast({
    //     title: 'Error',
    //     description: response.data,
    //     variant: 'destructive',
    //   })
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' autoFocus {...field} />
              </FormControl>
              <FormDescription>Enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isSubmitting ? (
          <Button type='submit' disabled={!form.formState.isSubmitting}>
            <Loader2 size={24} className='animate-spin' />
          </Button>
        ) : (
          <Button type='submit' disabled={!form.formState.isValid}>
            Submit
          </Button>
        )}
      </form>
    </Form>
  )
}

export default SignInForm
