'use server'

import { getProfileAction } from '@/actions/auth/get-profile-action'
import { getCompanyAction } from '@/actions/companies/get-company-action'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

import { z } from 'zod'

const uploadTableSchema = z.object({
  name: z.string({ message: 'Por favor, insira um nome' }),
  competence: z.string({ message: 'Por favor, insira uma competência' }),
  file: z.string(),
})

export async function uploadTableAction(data: FormData) {
  const result = uploadTableSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const [company, err1] = await getCompanyAction()
  const [profile, err2] = await getProfileAction()

  if (err1) {
    throw new Error(err1.data)
  }
  if (err2) {
    throw new Error(err2.data)
  }

  const { name, competence, file } = result.data

  const tableWithSameFile = await prisma.tables.findMany({
    where: {
      fileJson: file,
      companyId: company.company.id,
    },
  })

  if (tableWithSameFile.length > 0) {
    return {
      success: false,
      message: 'Tabela já cadastrada',
      errors: null,
    }
  }

  try {
    await prisma.tables.create({
      data: {
        name,
        companyId: company.company.id,
        competence,
        fileJson: file,
        ownerId: profile.user.id,
      },
    })
    revalidateTag('tables')
  } catch (error) {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
