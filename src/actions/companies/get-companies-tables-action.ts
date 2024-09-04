'use server'

import { z } from 'zod'
import { authProcedure } from '../procedures/auth-procedure'
import { prisma } from '@/lib/prisma'
import { getCurrentCo } from '@/app/auth/auth'

export const getCompaniesTablesAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      competence: z.date(),
    }),
  )
  .output(
    z.object({
      tables: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          createdAt: z.date(),
          competence: z.date(),
          fileJson: z.string(),
          companyId: z.string(),
          ownerId: z.string(),
          owner: z.object({
            id: z.string(),
            name: z.string().nullable(),
            avatarUrl: z.string().nullable(),
          }),
        }),
      ),
    }),
  )

  .handler(async ({ input: { competence } }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const currentCo = getCurrentCo()!

    const company = await prisma.company.findUniqueOrThrow({
      where: {
        slug: currentCo,
      },
    })

    const year = competence.getFullYear()
    const month = competence.getMonth() // getMonth() retorna 0-11

    const startDate = new Date(year, month, 1) // Primeiro dia do mês
    const endDate = new Date(year, month + 1, 0) // Último dia do mês

    const tables = await prisma.tables.findMany({
      select: {
        id: true,
        name: true,
        competence: true,
        ownerId: true,
        companyId: true,
        fileJson: true,
        createdAt: true,
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
        competence: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { tables }
  })
