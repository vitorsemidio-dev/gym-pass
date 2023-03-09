import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { RegisterUseCase } from '@/use-cases/register.use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)
    const email = 'john_doe@test.com'

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

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

  it('should not be able to register with same email twice', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)
    const email = 'john_doe@test.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
