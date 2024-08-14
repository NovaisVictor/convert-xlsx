import { getUserMembership } from '@/app/auth/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug

  const { company } = await getUserMembership(slug, request)

  const tables = await prisma.tables.findMany({
    select: {
      id: true,
      name: true,
      competence: true,
      ownerId: true,
      companyId: true,
      createdAt: true,
      fileJson: true,
      owner: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
    where: {
      companyId: company.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return NextResponse.json({ tables }, { status: 200 })
}
