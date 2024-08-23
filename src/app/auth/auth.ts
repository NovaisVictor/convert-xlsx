import { cookies } from 'next/headers'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentCo() {
  return cookies().get('co')?.value ?? null
}

// export async function getUserMembership(slug: string, request: NextRequest) {
//   const { user } = await userFromJwt(request)

//   const member = await prisma.member.findFirst({
//     where: {
//       userId: user.id,
//       company: {
//         slug,
//       },
//     },
//     include: {
//       company: true,
//     },
//   })

//   if (!member) {
//     throw new Error(`You're not a member of this company.`)
//   }

//   const { company, ...membership } = member

//   return { company, membership }
// }
