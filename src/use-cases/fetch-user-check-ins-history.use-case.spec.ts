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
      page: 1,
    })

    expect(checkIns).toHaveLength(3)
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
      page: 1,
    })
    const { checkIns: checkInsUser02 } = await sut.execute({
      userId: 'user_id_02',
      page: 1,
    })

    expect(checkInsUser01).toHaveLength(3)
    expect(checkInsUser02).toHaveLength(1)
  })

  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await prismaCheckInsRepository.create({
        gym_id: `gym_id_${i}`,
        user_id: 'user_id_01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user_id_01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym_id_21',
        user_id: 'user_id_01',
      }),
      expect.objectContaining({
        gym_id: 'gym_id_22',
        user_id: 'user_id_01',
      }),
    ])
  })
})
