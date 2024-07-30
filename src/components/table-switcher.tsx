import { ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { XlsxImporter } from './uploader/xlsx-importer'
import { getUserTables } from '@/http/get-user-tables'
import Link from 'next/link'
import { getCurrentTableId } from '@/auth/auth'

export async function TableSwitcher() {
  const { tables } = await getUserTables()
  const currentTableId = getCurrentTableId()

  const currentTable = tables.find((table) => table.id === currentTableId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        id="test"
        className="flex w-[184px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {currentTable ? (
          <>
            <span className="truncate text-left">{currentTable.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecione uma tabela</span>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tabelas</DropdownMenuLabel>
          {tables.map((table) => {
            return (
              <DropdownMenuItem key={table.id} asChild>
                <Link href={`/table/${table.id}`}>
                  <span className="truncate">{table.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <XlsxImporter />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
