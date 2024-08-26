'use client'
import { useParams } from 'next/navigation'
import { columns } from './colums-3594'
import { DataTable } from './data-table-3594'

interface tablesData {
  tableData: {
    tables: {
      id: string
      name: string
      createdAt: Date
      competence: string
      fileJson: string
      companyId: string
      ownerId: string
      owner: {
        id: string
        name: string | null
        avatarUrl: string | null
      }
    }[]
  }
}
export function Table3594({ tableData }: tablesData) {
  const { id } = useParams<{ id: string }>()
  const currentTable = tableData.tables.find((table) => table.id === id)

  // const jsonData = tables[0].fileJson.t
  const data = JSON.parse(currentTable!.fileJson)

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
