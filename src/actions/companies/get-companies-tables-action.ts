'use server'

import { z } from 'zod'
import { authProcedure } from '../procedures/auth-procedure'
import { prisma } from '@/lib/prisma'
import { getCurrentCo } from '@/app/auth/auth'

export const getCompaniesTablesAction = authProcedure
  .createServerAction()
  .output(
    z.object({
      tables: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          createdAt: z.date(),
          competence: z.string(),
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

  .handler(async () => {
    const currentCo = getCurrentCo()!

    const company = await prisma.company.findUniqueOrThrow({
      where: {
        slug: currentCo,
      },
    })

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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { tables }
  })
