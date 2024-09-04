'use client'
import { useParams } from 'next/navigation'
import { columns } from './colums-3594'
import { DataTable } from './data-table-3594'
import { useServerActionQuery } from '@/hooks/server-action-hooks'
import { getCompanyTableAction } from '@/actions/companies/get-company-table-action'
import { Loader2 } from 'lucide-react'

export function Table3594() {
  const { id } = useParams<{ id: string }>()

  const { isLoading, data } = useServerActionQuery(getCompanyTableAction, {
    input: {
      id,
    },
    queryKey: ['table3594', id],
  })

  if (isLoading) {
    return (
      <div className="w-full justify-center flex">
        <Loader2 className="animate-spin" />
      </div>
    )
  }
  // const jsonData = tables[0].fileJson.t
  const jsonData = JSON.parse(data!.table.fileJson)

  return (
    <div>
      <DataTable columns={columns} data={jsonData} />
    </div>
  )
}
