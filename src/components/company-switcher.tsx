import { ChevronsUpDown, CircleFadingPlus } from 'lucide-react'
import Link from 'next/link'

import { getCurrentCo } from '@/app/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { getInitials } from '@/utils/get-initials'
import { getCompaniesAction } from '@/actions/companies/get-companies-action'

export async function CompanySwitcher() {
  const currentCo = getCurrentCo()
  const [data, err] = await getCompaniesAction()
  if (err) {
    return
  }
  const companies = data.companies
  const currentCompany = companies.find((company) => company.slug === currentCo)
  console.log(currentCompany)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[184px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentCompany ? (
          <>
            <Avatar className="mr-1 size-7">
              {currentCompany.avatarUrl && (
                <AvatarImage src={currentCompany.avatarUrl} />
              )}
              <AvatarFallback>
                {getInitials(currentCompany.name)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-left">{currentCompany.name}</span>
          </>
        ) : (
          <span className="text-muted-foreground">Selecionar empresa</span>
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
          <DropdownMenuLabel>Empresas</DropdownMenuLabel>
          {companies.map((company) => {
            return (
              <DropdownMenuItem key={company.id} asChild>
                <Link href={`/co/${company.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {company.avatarUrl && (
                      <AvatarImage src={company.avatarUrl} />
                    )}
                    <AvatarFallback>{getInitials(company.name)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{company.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={'/create-company'}>
              <CircleFadingPlus className="mr-2 size-4" />
              Cadastrar nova
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
