import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john_doe@test.com',
      password: '123456',
    })

    expect(user).toBeTruthy()
  })

  it('should not be able to authenticate with wrong email', async () => {
    const wrongEmail = 'wrong-email@test.com'

    await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: wrongEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const wrongPassword = 'wrong-password'

    await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'john_doe@test.com',
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with no exists email', async () => {
    await expect(
      sut.execute({
        email: 'john_doe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
