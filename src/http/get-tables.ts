import { api } from './api-client'

interface getTablesResponse {
  tables: {
    name: string
    id: string
    createdAt: string
    companyId: string
    competence: string
    fileJson: string
    ownerId: string
    owner: {
      name: string | null
      id: string
      avatarUrl: string | null
    }
  }[]
}

export async function getTables(slug: string) {
  const result = await api
    .get(`companies/${slug}/tables`, {
      next: {
        tags: [`tables/${slug}`],
      },
    })
    .json<getTablesResponse>()
  return result
}
