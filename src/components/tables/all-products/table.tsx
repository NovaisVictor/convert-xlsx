'use client'
import { useParams } from 'next/navigation'
import { columns } from './colums'
import { DataTable } from './data-table'
import { useServerActionQuery } from '@/hooks/server-action-hooks'
import { Loader2 } from 'lucide-react'
import { getProductsAction } from '@/actions/tables/procucts/get-products-action'

export function AllProductsTable() {
  const { id } = useParams<{ id: string }>()

  const { isLoading, data } = useServerActionQuery(getProductsAction, {
    input: { id },
    queryKey: ['products'],
  })

  if (isLoading) {
    return (
      <div className="w-full justify-center flex">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="w-full justify-center flex">
        <p>Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={data.products} />
    </div>
  )
}
