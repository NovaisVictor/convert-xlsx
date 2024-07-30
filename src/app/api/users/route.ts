import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { hash } from 'bcrypt'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatarUrl: z.string().nullish(),
})

export async function POST(request: Request) {
  const body = await request.json()

  const { name, email, password, avatarUrl } = createUserSchema.parse(body)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return NextResponse.json(
      { message: 'User with this e-mail already exists.' },
      { status: 409 },
    )
  }

  const passwordHash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      avatarUrl,
    },
  })
  return NextResponse.json({}, { status: 201 })
}
