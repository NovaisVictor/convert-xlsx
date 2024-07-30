import { ProfileButton } from './profile-button'
import { TableSwitcher } from './table-switcher'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="mx-auto flex h-16 w-full container items-center justify-between px-2 border-b">
      <div className="flex items-center gap-4">
        <TableSwitcher />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
