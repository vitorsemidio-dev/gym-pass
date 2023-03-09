import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'

let prismaCheckInsRepository: InMemoryCheckInsRepository
let prismaGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    prismaCheckInsRepository = new InMemoryCheckInsRepository()
    prismaGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(prismaCheckInsRepository, prismaGymsRepository)
    vi.useFakeTimers()
    await prismaGymsRepository.create({
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
    ).rejects.toBeInstanceOf(Error)
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
    await prismaGymsRepository.create({
      id: 'gym-02',
      title: 'Gym 02',
      latitude: -23,
      longitude: -43,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -22,
        userLongitude: -42,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
