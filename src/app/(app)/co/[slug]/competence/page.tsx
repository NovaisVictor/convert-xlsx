import { XlsxImporter } from '@/components/uploader/xlsx-importer'
import { ability } from '@/app/auth/auth'
import { TableList } from './table-list'

export default async function Competence() {
  const permissions = await ability()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Competência</h1>
        {permissions?.can('create', 'Table') && <XlsxImporter />}
      </div>

      {permissions?.can('get', 'Table') ? (
        <TableList />
      ) : (
        <p className="texxt-sm text-muted-foreground">
          Você não tem autorização para ver as tabelas dessa empresa.
        </p>
      )}
    </div>
  )
}
