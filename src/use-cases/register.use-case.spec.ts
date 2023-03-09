import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { RegisterUseCase } from '@/use-cases/register.use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
