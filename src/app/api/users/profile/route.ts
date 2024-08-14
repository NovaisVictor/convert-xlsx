import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { userFromJwt } from '@/app/auth/auth'

export async function GET(request: NextRequest) {
  const { user } = await userFromJwt(request)

  const userFiltered = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      isAdmin: true,
    },
  })

  if (!userFiltered) {
    return NextResponse.json({ message: 'User not exists' }, { status: 400 })
  }
  return NextResponse.json({ user: userFiltered }, { status: 200 })
}
