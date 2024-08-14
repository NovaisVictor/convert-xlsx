import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'
import { env } from 'process'
import { prisma } from '@/lib/prisma'

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

export function getCurrentCo() {
  return cookies().get('co')?.value ?? null
}

export async function userFromJwt(request: NextRequest) {
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

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId?.toString(),
      },
    })
    if (!user) {
      throw new Error('Unautorized')
    }
    return { user }
  } catch {
    throw new Error('Unautorized')
  }
}

export async function getUserMembership(slug: string, request: NextRequest) {
  const { user } = await userFromJwt(request)

  const member = await prisma.member.findFirst({
    where: {
      userId: user.id,
      company: {
        slug,
      },
    },
    include: {
      company: true,
    },
  })

  if (!member) {
    throw new Error(`You're not a member of this company.`)
  }

  const { company, ...membership } = member

  return { company, membership }
}
