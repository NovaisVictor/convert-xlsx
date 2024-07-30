'use server'

import { signIn } from '@/http/sign-in'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { z } from 'zod'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }
  const { email, password } = result.data

  try {
    const { token } = await signIn({
      email,
      password,
    })
    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      return {
        success: false,
        message: 'Invalid credentials',
        errors: null,
      }
    }
    console.error(err)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
  return { success: true, message: null, errors: null }
}
