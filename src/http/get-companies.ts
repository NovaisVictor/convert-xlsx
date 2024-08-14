import { api } from './api-client'

interface GetCompaniesResponse {
  companies: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
  }[]
}

export async function getCompanies() {
  const result = await api
    .get('companies', {
      next: {
        tags: ['companies'],
      },
    })
    .json<GetCompaniesResponse>()
  return result
}
