import { columns } from './tables/3594/colums-3594'
import { DataTable } from './tables/3594/data-table-3594'
import { Loader2 } from 'lucide-react'
import { getUserTables } from '@/http/get-user-tables'
import { getCurrentTableId } from '@/auth/auth'

export async function TestXlsx() {
  const isLoading = false
  const currentTableId = getCurrentTableId()
  const { tables } = await getUserTables()

  const currentTable = tables.find((table) => table.id === currentTableId)

  // const jsonData = tables[0].fileJson.t
  const data = JSON.parse(currentTable!.fileJson)

  return (
    <>
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : data !== null ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <p>Import </p>
      )}
    </>
  )
}
