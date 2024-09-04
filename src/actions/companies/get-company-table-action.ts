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
    }),
  )

  .handler(async ({ input: { id } }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const table = await prisma.tables.findUnique({
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
        id,
      },
    })

    if (!table) {
      throw new Error(`Table with id ${id} not found`) // Lança um erro se não encontrado
    }

    return { table } // Aqui 'table' nunca será null
  })
