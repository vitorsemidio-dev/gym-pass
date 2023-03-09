import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'

let prismaCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    prismaCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(prismaCheckInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn).toBeTruthy()
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2000, 1, 1, 13))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2000, 1, 1, 13))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    vi.setSystemTime(new Date(2000, 1, 5, 13))

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).resolves.toBeTruthy()
  })
})
