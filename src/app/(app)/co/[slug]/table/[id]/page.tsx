import { AllProductsTable } from '@/components/tables/all-products/table'

export default async function Table() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tabela</h1>
      <AllProductsTable />
    </div>
  )
}
