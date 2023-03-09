import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)
    return user || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
    } as User
    this.users.push(user)
    return user
  }
}
