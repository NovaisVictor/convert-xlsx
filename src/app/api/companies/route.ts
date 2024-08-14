import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'
import { userFromJwt } from '@/app/auth/auth'
import { z } from 'zod'
import { createSlug } from '@/utils/create-slug'

export async function GET(request: NextRequest) {
  const { user } = await userFromJwt(request)

  if (user.isAdmin) {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        cnpj: true,
        avatarUrl: true,
      },
    })
    return NextResponse.json({ companies }, { status: 200 })
  }

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarUrl: true,
    },
    where: {
      member_on: {
        some: {
          userId: user.id,
        },
      },
    },
  })
  return NextResponse.json({ companies }, { status: 200 })
}

const createCompanySchema = z.object({
  name: z.string(),
  cnpj: z.string(),
})

export async function POST(request: NextRequest) {
  const { user } = await userFromJwt(request)
  const body = await request.json()
  const { name, cnpj } = createCompanySchema.parse(body)

  if (!user.isAdmin) {
    return NextResponse.json(
      { message: 'Você não pode cadastrar novas empresas' },
      { status: 401 },
    )
  }

  const slug = createSlug(name)

  await prisma.company.create({
    data: {
      name,
      cnpj,
      slug,
    },
  })
  return NextResponse.json({ status: 200 })
}
