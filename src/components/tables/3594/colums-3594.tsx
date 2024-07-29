'use client'

import type { Sheet3594 } from '@/utils/convert-xlsx'
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

export const columns: ColumnDef<Sheet3594>[] = [
  {
    accessorKey: 'COD_ITEM',
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
    accessorKey: 'ALIQ_ICMS',
    header: 'ALIQ_ICMS',
  },
  {
    accessorKey: 'ALIQ_ICMS_PADRAO',
    header: 'ALIQ_ICMS_PADRAO',
  },
  {
    accessorKey: 'COD_NCM',
    header: 'COD_NCM',
  },
  {
    accessorKey: 'FUNDAMENTO',
    header: 'FUNDAMENTO',
  },
  {
    accessorKey: 'OBS',
    header: 'OBS',
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
              onClick={() => navigator.clipboard.writeText(data.COD_ITEM)}
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
