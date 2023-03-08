import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users.repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseParams) {
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (userExists) {
    throw new Error('User already exists')
  }

  const passwordHash = await hash(password, 6)

  const prismaUsersRepository = new PrismaUsersRepository()

  const user = await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })

  return {
    user,
  }
}
