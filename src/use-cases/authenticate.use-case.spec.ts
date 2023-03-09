import { AuthenticateUseCase } from './authenticate.use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate user', async () => {
    const prismaUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(prismaUsersRepository)

    await prismaUsersRepository.create({
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
})
