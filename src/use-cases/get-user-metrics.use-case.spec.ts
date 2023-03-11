import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics.use-case'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from user metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_02',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user_id_01',
    })

    expect(checkInsCount).toEqual(3)
  })

  it('should be able to get check-ins count from specific user metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_02',
      user_id: 'user_id_01',
    })
    await checkInsRepository.create({
      gym_id: 'gym_id_01',
      user_id: 'user_id_02',
    })

    const { checkInsCount: checkInsCountUser01 } = await sut.execute({
      userId: 'user_id_01',
    })
    const { checkInsCount: checkInsCountUser02 } = await sut.execute({
      userId: 'user_id_02',
    })

    expect(checkInsCountUser01).toEqual(3)
    expect(checkInsCountUser02).toEqual(1)
  })

  it('should be able to get check-ins count from user metrics in different gyms', async () => {
    const checkInsCountOnGym01 = 15
    const checkInsCountOnGym02 = 5
    const checkInsCountOnGym03 = 10
    const totalCountCheckins =
      checkInsCountOnGym01 + checkInsCountOnGym02 + checkInsCountOnGym03

    for (let i = 0; i < checkInsCountOnGym01; i++) {
      await checkInsRepository.create({
        gym_id: 'gym_id_01',
        user_id: 'user_id_01',
      })
    }
    for (let i = 0; i < checkInsCountOnGym02; i++) {
      await checkInsRepository.create({
        gym_id: 'gym_id_02',
        user_id: 'user_id_01',
      })
    }
    for (let i = 0; i < checkInsCountOnGym03; i++) {
      await checkInsRepository.create({
        gym_id: 'gym_id_03',
        user_id: 'user_id_01',
      })
    }

    const { checkInsCount } = await sut.execute({
      userId: 'user_id_01',
    })

    expect(checkInsCount).toEqual(totalCountCheckins)
  })
})
