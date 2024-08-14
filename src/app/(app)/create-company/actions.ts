'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createCompany } from '@/http/create-company'
import { revalidateTag } from 'next/cache'
import { getCurrentCo } from '@/app/auth/auth'
import { updateCompany } from '@/http/update-company'

const companySchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Por favor, insira ao menos 4 caracteres.' }),
  cpfCnpj: z
    .string({
      required_error: 'CPF/CNPJ é obrigatório.',
    })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length >= 11
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return replacedDoc.length <= 14
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '')
      return !!Number(replacedDoc)
    }, 'CPF/CNPJ deve conter apenas números.'),
})

export type CompanySchema = z.infer<typeof companySchema>

export async function createCompanyAction(data: FormData) {
  const result = companySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }
  const { name, cpfCnpj } = result.data

  // await new Promise((resolve) => setTimeout(resolve, 2000))
  try {
    await createCompany({
      name,
      cnpj: cpfCnpj,
    })
    revalidateTag('companies')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
  return {
    success: true,
    message: 'Successfully saved the company',
    errors: null,
  }
}

export async function updateCompanyAction(data: FormData) {
  const currentCo = getCurrentCo()
  const result = companySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }
  const { name, cpfCnpj } = result.data

  try {
    await updateCompany({
      co: currentCo!,
      name,
      cnpj: cpfCnpj,
    })
    revalidateTag('companies')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }
    console.error(err)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}
