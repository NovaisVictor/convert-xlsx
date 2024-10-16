'use server'

import { z } from 'zod'

import { authProcedure } from '@/actions/procedures/auth-procedure'
import { prisma } from '@/lib/prisma'

export const getProductsAction = authProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .output(
    z.object({
      products: z.array(
        z.object({
          id: z.string(),
          emission: z.date(),
          productCode: z.string(),
          productDecription: z.string(),
          nmcCode: z.string(),
          cfop: z.string(),
          icmsBase: z.string(),
          pisCofinsBase: z.string(),
          competence: z.date(),
          importedTableId: z.string(),
          companyId: z.string(),
        }),
      ),
    }),
  )
  .handler(async ({ input: { id } }) => {
    const products = await prisma.product.findMany({
      where: {
        importedTableId: id,
      },
    })

    return { products }
  })
