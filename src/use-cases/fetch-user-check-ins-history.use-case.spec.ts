import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { FetchUserCheckInsUseCase } from './fetch-user-check-ins-history.use-case'

let prismaCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsUseCase

describe('Fetch User Check-ins Use Case', () => {
  beforeEach(() => {
    prismaCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsUseCase(prismaCheckInsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_02',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user_id_01',
    })

    expect(checkIns.length).toEqual(3)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym_id_01',
        user_id: 'user_id_01',
      }),
      expect.objectContaining({
        gym_id: 'gym_id_01',
        user_id: 'user_id_01',
      }),
      expect.objectContaining({
        gym_id: 'gym_id_02',
        user_id: 'user_id_01',
      }),
    ])
  })

  it('should be able to fetch check-ins history from especific user', async () => {
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_02',
      user_id: 'user_id_01',
    })
    await prismaCheckInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_02',
    })

    const { checkIns: checkInsUser01 } = await sut.execute({
      userId: 'user_id_01',
    })
    const { checkIns: checkInsUser02 } = await sut.execute({
      userId: 'user_id_02',
    })

    expect(checkInsUser01.length).toEqual(3)
    expect(checkInsUser02.length).toEqual(1)
  })
})
