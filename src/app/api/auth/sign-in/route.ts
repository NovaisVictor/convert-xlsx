import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { sign } from 'jsonwebtoken'
import { env } from 'process'

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { email, password } = signInSchema.parse(body)

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Credenciais invalidas' },
      { status: 400 },
    )
  }

  const isPasswordValid = compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: 'Credenciais invalidas' },
      { status: 400 },
    )
  }

  const token = sign({ sub: user.id }, env.JWT_SECRET!, {
    expiresIn: 60 * 60 * 24 * 7,
  })

  return NextResponse.json({ token }, { status: 200 })
}
