import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { verifyJwt } from '@/auth/auth'

export async function GET(request: NextRequest) {
  const { userId } = verifyJwt(request)

  const user = await prisma.user.findFirst({
    where: {
      id: userId?.toString(),
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      isAdmin: true,
    },
  })

  if (!user) {
    return NextResponse.json({ message: 'User not exists' }, { status: 400 })
  }
  return NextResponse.json({ user }, { status: 200 })
}
