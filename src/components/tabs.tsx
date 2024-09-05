import { ability, getCurrentCo } from '@/app/auth/auth'
import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentCo = getCurrentCo()!
  const permissions = await ability()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          variant={'ghost'}
          size={'sm'}
          className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/co/${currentCo}`}>Dashboard</NavLink>
        </Button>
        <Button
          variant={'ghost'}
          size={'sm'}
          className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/co/${currentCo}/tables`}>Tabelas</NavLink>
        </Button>

        {permissions?.can('get', 'User') && (
          <Button
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/co/${currentCo}/members`}>Membros</NavLink>
          </Button>
        )}

        {permissions?.can('manage', 'Company') && (
          <Button
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/co/${currentCo}/settings`}>Configurações</NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
