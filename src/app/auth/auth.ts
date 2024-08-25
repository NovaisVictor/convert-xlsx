import { getUserMembershipAction } from '@/actions/auth/get-membership-action'
import { cookies } from 'next/headers'
import { defineAbilityFor } from '../../../casl'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentCo() {
  return cookies().get('co')?.value ?? null
}

export async function ability(slug: string) {
  const [data, err] = await getUserMembershipAction({ slug })

  if (err) {
    return
  }
  if (!data.membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: data.membership.userId,
    role: data.membership.role,
  })

  return ability
}
