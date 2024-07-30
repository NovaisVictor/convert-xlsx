import { getProfile } from '@/http/get-profile'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { env } from 'process'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/sign-in')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch {
    cookies().delete('token')
  }

  redirect('/sign-in')
}

export function verifyJwt(request: NextRequest) {
  const bearer = request.headers.get('authorization')

  if (!bearer) {
    throw new Error('Unautorized')
  }

  const [, token] = bearer!.split(' ')
  const { sub } = verify(token, env.JWT_SECRET!)
  if (!sub) {
    throw new Error('Unautorized')
  }
  const userId = sub.toString()

  return { userId }
}

export function getCurrentTableId() {
  return cookies().get('table')?.value ?? null
}
