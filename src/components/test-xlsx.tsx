import { cookies } from 'next/headers'
import { DownloadXlsxAction } from './downloadXlsxAction'
import { columns } from './tables/3594/colums-3594'
import { DataTable } from './tables/3594/data-table-3594'
import { Loader2 } from 'lucide-react'

export async function TestXlsx() {
  const isLoading = false
  const fileUrl = cookies().get('file-url')!.value ?? null

  const data = await DownloadXlsxAction(fileUrl)

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
