'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { membershipProcedure } from '../procedures/membership-procedure'

export const getCompanyTablesAction = membershipProcedure
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
          fileName: z.string(),
          competence: z.date(),
          companyId: z.string(),
          createdAt: z.date(),
          owner: z.object({
            id: z.string(),
            name: z.string().nullable(),
            avatarUrl: z.string().url().nullable(),
          }),
        }),
      ),
    }),
  )

  .handler(
    async ({
      input: { competence },
      ctx: {
        membership: { companyId },
      },
    }) => {
      const year = competence.getFullYear()
      const month = competence.getMonth() // getMonth() retorna 0-11

      const startDate = new Date(year, month, 1) // Primeiro dia do mês
      const endDate = new Date(year, month + 1, 0) // Último dia do mês

      const tables = await prisma.importedTable.findMany({
        select: {
          id: true,
          companyId: true,
          competence: true,
          fileName: true,
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
          companyId,
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
    },
  )
