import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { LateCheckInValidateError } from '@/use-cases/errors/late-check-in-validation.error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'
import { convertTime } from '@/utils/convert-time'

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

  it('should not be able to validate a check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date('2021-01-01 00:00:00'))

    await checkInsRepository.create({
      id: 'check-in-fake-hour',
      user_id: 'user-01',
      gym_id: 'gym-01',
    })

    const MAX_TIME_VALIDATION_CHECK_IN_IN_MINUTES = 20
    vi.advanceTimersByTime(
      convertTime(
        MAX_TIME_VALIDATION_CHECK_IN_IN_MINUTES + 1,
        'minutes',
        'milliseconds',
      ),
    )

    await expect(
      sut.execute({
        checkInId: 'check-in-fake-hour',
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
