import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email.',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
})

export const SignUpSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email.',
  }),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
})
