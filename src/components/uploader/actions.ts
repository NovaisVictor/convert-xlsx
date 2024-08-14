'use server'

import { getCurrentCo } from '@/app/auth/auth'
import { getCompany } from '@/http/get-company'
import { getProfile } from '@/http/get-profile'
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

  const currentCo = getCurrentCo()
  const { company } = await getCompany(currentCo!)
  const { user } = await getProfile()

  const { name, competence, file } = result.data

  const tableWithSameFile = await prisma.tables.findMany({
    where: {
      fileJson: file,
      companyId: company.id,
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
        companyId: company.id,
        competence,
        fileJson: file,
        ownerId: user.id,
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
