import { XlsxImporter } from '@/components/uploader/xlsx-importer'
import { TableList } from './table-list'

export default async function Tables() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tabelas</h1>
        <XlsxImporter />
      </div>
      <TableList />
    </div>
  )
}
