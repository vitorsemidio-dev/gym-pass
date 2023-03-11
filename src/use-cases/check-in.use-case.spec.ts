import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'
import { MaxDistanceError } from '@/use-cases/errors/max-distance.error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins.error'
import { generateRandomCoordinate } from '@/utils/generate-random-coordinate'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()
    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      latitude: -22,
      longitude: -42,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -22,
      userLongitude: -42,
    })

    expect(checkIn).toBeTruthy()
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2000, 1, 1, 13))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -22,
      userLongitude: -42,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -22,
        userLongitude: -42,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2000, 1, 1, 13))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -22,
      userLongitude: -42,
    })

    vi.setSystemTime(new Date(2000, 1, 5, 13))

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -22,
        userLongitude: -42,
      }),
    ).resolves.toBeTruthy()
  })

  it('should not be able to check in on distant gym', async () => {
    const nearCoordinate = {
      latitude: -22,
      longitude: -42,
    }
    const distanceCoordinates = generateRandomCoordinate(nearCoordinate, 1, 2)
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Gym 02',
      latitude: distanceCoordinates.latitude,
      longitude: distanceCoordinates.longitude,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: nearCoordinate.latitude,
        userLongitude: nearCoordinate.longitude,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
