import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { UsersRepository } from '@/repositories/users.repository'

export class InMemoryUsersRepository implements UsersRepository {
  private data: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      created_at: new Date(),
      email: data.email,
      name: data.name || null,
      password_hash: data.password_hash,
    }
    this.data.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.data.find((user) => user.email === email)
    return user || null
  }

  async findById(id: string): Promise<User | null> {
    const user = this.data.find((user) => user.id === id)
    return user || null
  }
}
