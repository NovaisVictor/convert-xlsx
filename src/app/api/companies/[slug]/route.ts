import { userFromJwt } from '@/app/auth/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

import { z } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug

  // const { user } = await userFromJwt(request)

  const company = await prisma.company.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
      cnpj: true,
      avatarUrl: true,
    },
    where: {
      slug,
    },
  })
  return NextResponse.json({ company }, { status: 200 })
}

const updateCompanySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { user } = await userFromJwt(request)

  if (user.isAdmin === false) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const slug = params.slug

  const body = await request.json()

  const { name, cnpj } = updateCompanySchema.parse(body)
  await prisma.company.update({
    data: {
      name,
      cnpj,
    },
    where: {
      slug,
    },
  })
  return NextResponse.json({ message: 'Success' }, { status: 200 })
}
