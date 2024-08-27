'use server'

import { revalidateTag } from 'next/cache'

import { createSlug } from '@/utils/create-slug'
import { prisma } from '@/lib/prisma'
import { authProcedure } from '../procedures/auth-procedure'
import { companySchema } from './company-schema'

export const createCompanyAction = authProcedure
  .createServerAction()
  .input(companySchema, {
    type: 'formData',
  })
  .handler(async ({ input: { name, cpfCnpj }, ctx }) => {
    const { user } = ctx
    const slug = createSlug(name)

    if (!user.isAdmin) {
      throw new Error('You not allowed to create one company')
    }

    await prisma.company.create({
      data: {
        name,
        cnpj: cpfCnpj,
        slug,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: 'SUPER_ADMIN',
          },
        },
      },
    })
    revalidateTag('companies')
  })
