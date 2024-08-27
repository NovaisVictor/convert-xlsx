import { CompanySwitcher } from './company-switcher'
import { CompetenceSwitcher } from './competence-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div>
        <CompanySwitcher />
      </div>
      <div>
        <CompetenceSwitcher />
      </div>
      <div className="flex items-center space-x-4">
        <PendingInvites />
        <ThemeToggle />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
