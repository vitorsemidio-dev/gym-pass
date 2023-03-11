import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms.use-case'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch User Check-ins Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch check-ins history', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -22,
      longitude: -42,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -20,
      longitude: -40,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22,
      userLongitude: -42,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Near Gym',
        }),
      ]),
    )
  })
})
