import { getUserMembershipAction } from '@/actions/auth/get-membership-action'
import { cookies } from 'next/headers'
import { defineAbilityFor } from '../../../casl'
import { getProfileAction } from '@/actions/auth/get-profile-action'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentCo() {
  return cookies().get('co')?.value ?? null
}

export async function ability() {
  const [data, err] = await getUserMembershipAction()

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

export async function isAdmin() {
  const [data, err] = await getProfileAction()

  if (err) {
    return console.error(err)
  }

  return data.user.isAdmin
}
