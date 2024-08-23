'use server'

import { prisma } from '@/lib/prisma'
import { authProcedure } from '../procedures/auth-procedure'

export const getCompaniesAction = authProcedure.handler(async ({ ctx }) => {
  const { user } = ctx

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
    return { companies }
  }

  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      avatarUrl: true,
    },
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  })

  return { companies }
})
