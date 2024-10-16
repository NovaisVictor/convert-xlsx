'use server'

import { z } from 'zod'
import { authProcedure } from '../procedures/auth-procedure'
import { prisma } from '@/lib/prisma'

export const getCompanyTableAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .output(
    z.object({
      table: z.object({
        id: z.string(),
        fileName: z.string(),
        competence: z.date(),
        companyId: z.string(),
        ownerId: z.string(),
        createdAt: z.date(),
        owner: z.object({
          id: z.string(),
          name: z.string().nullable(),
          avatarUrl: z.string().nullable(),
        }),
      }),
    }),
  )

  .handler(async ({ input: { id } }) => {
    const table = await prisma.importedTable.findUnique({
      select: {
        id: true,
        fileName: true,
        competence: true,
        ownerId: true,
        companyId: true,
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
        id,
      },
    })

    if (!table) {
      throw new Error(`Table with id ${id} not found`)
    }

    return { table }
  })
