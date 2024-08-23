import { getCompaniesTablesAction } from '@/actions/companies/get-companies-tables-action'
import { columns } from './colums-3594'
import { DataTable } from './data-table-3594'
import { Loader2 } from 'lucide-react'

export async function Table3594() {
  const isLoading = false
  const currentTableId = '1dc19040-4ada-4bfb-9af9-846cd6707281'
  const [tablesData, err] = await getCompaniesTablesAction()

  if (err) {
    console.error(err)
    return
  }

  const currentTable = tablesData.tables.find(
    (table) => table.id === currentTableId,
  )

  console.log(currentTable)
  // const jsonData = tables[0].fileJson.t
  const data = JSON.parse(currentTable!.fileJson)

  return (
    <>
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : data !== null ? (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      ) : (
        <p>Import </p>
      )}
    </>
  )
}
