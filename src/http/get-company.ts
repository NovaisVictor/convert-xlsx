import { api } from './api-client'

interface GetCompanyResponse {
  company: {
    id: string
    name: string
    slug: string
    cnpj: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export async function getCompany(co: string) {
  const result = await api.get(`companies/${co}`).json<GetCompanyResponse>()
  return result
}
