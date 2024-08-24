import { prisma } from '@/lib/prisma'
import { authProcedure } from '../procedures/auth-procedure'
import { string, z } from 'zod'
import { roleSchema } from '../../../casl/roles'

export const getUserMembershipAction = authProcedure
  .input(
    z.object({
      slug: string(),
    }),
  )
  .output(
    z.object({
      company: z.object({
        id: z.string(),
        name: z.string(),
        cnpj: z.string(),
        slug: z.string(),
        avatarUrl: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      membership: z.object({
        id: z.string(),
        companyId: z.string(),
        userId: z.string(),
        role: roleSchema,
      }),
    }),
  )
  .handler(async ({ ctx: { user }, input: { slug } }) => {
    const member = await prisma.member.findFirst({
      where: {
        userId: user.id,
        company: {
          slug,
        },
      },
      include: {
        company: true,
      },
    })

    if (!member) {
      throw new Error(`You're not a member of this company.`)
    }

    const { company, ...membership } = member

    return { company, membership }
  })
