'use server'

import { z } from 'zod'
import { membershipProcedure } from '../procedures/membership-procedure'
import { prisma } from '@/lib/prisma'

export const uploadTableAction = membershipProcedure
  .createServerAction()
  .input(
    z.object({
      competence: z.date(),
      arrayTable: z.array(
        z.object({
          // cnpj: z.string(),
          emission: z.string(),
          productCode: z.string(),
          productDecription: z.string(),
          nmcCode: z.string(),
          cfop: z.string(),
          icmsBase: z.string(),
          pisCofinsBase: z.string(),
        }),
      ),
      hash: z.string(),
      name: z.string(),
    }),
  )
  .handler(
    async ({
      input: { competence, arrayTable, hash, name },
      ctx: { company, user },
    }) => {
      if (!user.isAdmin) {
        throw new Error(`You're not allowed to upload tables`)
      }

      const tableAlreadyImported = await prisma.importedTable.findUnique({
        where: {
          fileHash: hash,
        },
      })

      if (tableAlreadyImported) {
        throw new Error(`This table already imported`)
      }

      const competenceAlreadyRegistred = await prisma.product.findFirst({
        where: {
          companyId: company.id,
          competence,
        },
      })

      if (competenceAlreadyRegistred) {
        throw new Error(`This competence already imported`)
      }

      try {
        const { id: importedTableId } = await prisma.importedTable.create({
          data: {
            fileName: name,
            fileHash: hash,
            competence,
            companyId: company.id,
            ownerId: user.id,
          },
        })

        const productsToInsert = arrayTable.map((item) => ({
          emission: new Date(item.emission).toISOString(),
          productCode: item.productCode,
          productDecription: item.productDecription,
          nmcCode: item.nmcCode,
          cfop: item.cfop,
          icmsBase: item.icmsBase,
          pisCofinsBase: item.pisCofinsBase,
          importedTableId,
          companyId: company.id,
          competence,
        }))

        await prisma.product.createMany({
          data: productsToInsert,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Unexpected error, try again in a few minutes.')
      }
    },
  )
