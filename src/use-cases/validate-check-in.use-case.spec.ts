import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
    await checkInsRepository.create({
      id: 'check-in-01',
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    await checkInsRepository.create({
      id: 'check-in-02',
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    await sut.execute({
      checkInId: 'check-in-01',
    })

    const checkInValidated = await checkInsRepository.findById('check-in-01')
    const checkInNotValidated = await checkInsRepository.findById('check-in-02')

    expect(checkInValidated?.validated_at).toEqual(expect.any(Date))
    expect(checkInNotValidated?.validated_at).toBeFalsy()
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(
      sut.execute({
        checkInId: 'inexistent-check-in',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
