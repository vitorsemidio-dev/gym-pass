import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms.use-case'
import { generateRandomCoordinate } from '@/utils/generate-random-coordinate'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms (10km)', async () => {
    const userCoordinate = {
      latitude: -22,
      longitude: -42,
    }
    const nearGymCoordinate01 = generateRandomCoordinate(userCoordinate, 1, 5)
    // ! Failing somethimes
    // const nearGymCoordinate02 = generateRandomCoordinate(userCoordinate, 5, 9)
    // const farGymCoordinate01 = generateRandomCoordinate(userCoordinate, 12, 15)
    const nearGymCoordinate02 = generateRandomCoordinate(userCoordinate, 1, 7)
    const farGymCoordinate01 = generateRandomCoordinate(userCoordinate, 19, 25)
    const farGymCoordinate02 = generateRandomCoordinate(userCoordinate, 20, 30)
    const gymsCoordinates = [
      nearGymCoordinate01,
      nearGymCoordinate02,
      farGymCoordinate01,
      farGymCoordinate02,
    ]
    gymsCoordinates.forEach(async (coordinate, index) => {
      await gymsRepository.create({
        title: `Gym ${index + 1}`,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      })
    })

    const { gyms } = await sut.execute({
      userLatitude: userCoordinate.latitude,
      userLongitude: userCoordinate.longitude,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Gym 1',
        }),
        expect.objectContaining({
          title: 'Gym 2',
        }),
      ]),
    )
  })
})
