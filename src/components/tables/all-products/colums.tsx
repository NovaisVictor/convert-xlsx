'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Products = {
  id: string
  emission: Date
  productCode: string
  productDecription: string
  nmcCode: string
  cfop: string
  icmsBase: string
  pisCofinsBase: string
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: 'productCode',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          COD_ITEM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'nmcCode',
    header: 'ALIQ_ICMS',
  },
  {
    accessorKey: 'cfop',
    header: 'ALIQ_ICMS_PADRAO',
  },
  {
    accessorKey: 'icmsBase',
    header: 'COD_NCM',
  },
  {
    accessorKey: 'pisCofinsBase',
    header: 'FUNDAMENTO',
  },
  {
    accessorKey: 'productDecription',
    header: 'OBS',
  },
  {
    accessorKey: 'emission',
    header: 'EMISSION',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.productCode)}
            >
              Copy COD_ITEM
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
