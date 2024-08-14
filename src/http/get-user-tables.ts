import { api } from './api-client'

interface getUserTablesResponse {
  tables: {
    id: string
    name: string | null
    fileJson: string
    userId: string
  }[]
}

export async function getUserTables() {
  const result = await api
    .get('tables', {
      next: {
        tags: ['tables'],
      },
    })
    .json<getUserTablesResponse>()
  return result
}
