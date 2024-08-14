import { api } from './api-client'

interface UpdateCompanyRequest {
  name: string
  cnpj: string
  co: string
}

type UpdateCompanyResponse = void

export async function updateCompany({
  co,
  name,
  cnpj,
}: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
  await api.put(`companies/${co}`, {
    json: {
      name,
      cnpj,
    },
  })
}
