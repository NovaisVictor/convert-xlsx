import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

async function seed() {
  const prisma = new PrismaClient()

  await prisma.user.deleteMany()
  const passwordHash = await hash('123456', 1)

  await prisma.user.create({
    data: {
      name: 'Victor Novais',
      email: 'victornovaislima@gmail.com',
      avatarUrl: 'https://github.com/novaisvictor.png',
      passwordHash,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Bruno Lima',
      email: 'arquitetobrunolima@gmail.com',
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })
}
seed().then(() => {
  console.log('Database seeded!')
})
