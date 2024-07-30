import { verifyJwt } from '@/auth/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { userId } = verifyJwt(request)
  console.log('here')
  const tables = await prisma.tables.findMany({
    where: {
      userId,
    },
  })

  return NextResponse.json({ tables }, { status: 200 })
}
