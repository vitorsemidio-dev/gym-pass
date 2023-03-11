import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile.use-case'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
    })

    expect(user).toBeTruthy()
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
