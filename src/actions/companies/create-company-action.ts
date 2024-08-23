'use server'

import { revalidateTag } from 'next/cache'

import { createSlug } from '@/utils/create-slug'
import { prisma } from '@/lib/prisma'
import { authProcedure } from '../procedures/auth-procedure'
import { companySchema } from './company-schema'

export const createCompanyAction = authProcedure
  .input(companySchema, {
    type: 'formData',
  })
  .handler(async ({ input: { name, cpfCnpj }, ctx }) => {
    const { user } = ctx
    const slug = createSlug(name)

    await prisma.company.create({
      data: {
        name,
        cnpj: cpfCnpj,
        slug,
        members: {
          create: {
            userId: user.id,
          },
        },
      },
    })
    revalidateTag('companies')

    return {
      success: true,
      message: 'Successfully saved the company',
      errors: null,
    }
  })
