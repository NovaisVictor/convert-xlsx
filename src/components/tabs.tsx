import { ability, getCurrentCo, isAdmin } from '@/app/auth/auth'
import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentCo = getCurrentCo()!
  const permissions = await ability()
  const admin = await isAdmin()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        {currentCo && (
          <>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
              asChild
            >
              <NavLink href={`/co/${currentCo}`}>Dashboard</NavLink>
            </Button>
          </>
        )}

        {currentCo && (
          <>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
              asChild
            >
              <NavLink href={`/co/${currentCo}/tables`}>Auditorias</NavLink>
            </Button>
          </>
        )}

        {currentCo && (
          <>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
              asChild
            >
              <NavLink href={`/co/${currentCo}/summary`}>Resumo</NavLink>
            </Button>
          </>
        )}

        {currentCo && (
          <>
            <Button
              variant={'ghost'}
              size={'sm'}
              className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
              asChild
            >
              <NavLink href={`/co/${currentCo}/competence`}>
                Competência
              </NavLink>
            </Button>
          </>
        )}

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

        {admin && (
          <Button
            variant={'ghost'}
            size={'sm'}
            className="border border-transparent text-muted-foreground data-[current=true]:border-input data-[current=true]:text-foreground"
            asChild
          >
            <NavLink href={`/clients`}>Clientes</NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
