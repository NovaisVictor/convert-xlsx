'use client'

import { getCompaniesAction } from '@/actions/companies/get-companies-action'
import { useServerActionQuery } from '@/hooks/server-action-hooks'
import { ClientsDataTable } from './clients-data-table'

export function ClientsTable() {
  const { data, isLoading } = useServerActionQuery(getCompaniesAction, {
    queryKey: ['clients-table'],
    input: undefined,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data available</div> // Ou qualquer outra mensagem
  }

  return (
    <div>
      <ClientsDataTable data={data.companies} />
    </div>
  )
}
