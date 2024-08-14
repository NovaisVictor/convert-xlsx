import { api } from './api-client'

interface CreateCompanyRequest {
  name: string
  cnpj: string
}

type CreateCompanyResponse = void

export async function createCompany({
  name,
  cnpj,
}: CreateCompanyRequest): Promise<CreateCompanyResponse> {
  await api.post('companies', {
    json: {
      name,
      cnpj,
    },
  })
}
