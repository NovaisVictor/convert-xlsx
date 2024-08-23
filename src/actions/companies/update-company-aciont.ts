'use server'

import { revalidateTag } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { authProcedure } from '../procedures/auth-procedure'

import { getCurrentCo } from '@/app/auth/auth'
import { companySchema } from './company-schema'

export const updateCompanyAction = authProcedure
  .input(companySchema, {
    type: 'formData',
  })
  .handler(async ({ input: { name, cpfCnpj } }) => {
    // const { user } = ctx
    const currentCo = getCurrentCo()!

    await prisma.company.update({
      data: {
        name,
        cnpj: cpfCnpj,
      },
      where: {
        slug: currentCo,
      },
    })

    revalidateTag('companies')
  })
