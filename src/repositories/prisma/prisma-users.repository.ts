import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users.repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({ data })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })
    return user
  }
}
