import { getCompaniesTablesAction } from '@/actions/companies/get-companies-tables-action'
import { Table3594 } from '@/components/tables/3594/table-3594'

export default async function Table() {
  const [tablesData, err] = await getCompaniesTablesAction()

  if (err) {
    console.error(err)
    return
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tabela</h1>
      <Table3594 tableData={tablesData} />
    </div>
  )
}
