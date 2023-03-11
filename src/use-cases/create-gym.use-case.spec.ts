import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { CreateGymUseCase } from '@/use-cases/create-gym.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      description: 'Gym 1 description',
      latitude: 1,
      longitude: 1,
      phone: '123456',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
