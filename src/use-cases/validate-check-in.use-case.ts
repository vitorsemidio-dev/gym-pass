import dayjs from 'dayjs'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { LateCheckInValidateError } from '@/use-cases/errors/late-check-in-validation.error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'

type ValidateCheckInUseCaseInput = {
  checkInId: string
}

type ValidateCheckInUseCaseOutput = {}

export class ValidateCheckInUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseInput): Promise<ValidateCheckInUseCaseOutput> {
    const checkIn = await this.prismaCheckInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError('Check-in not found')
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      dayjs(checkIn.created_at),
      'minute',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError('Check-in expired')
    }

    checkIn.validated_at = new Date()
    await this.prismaCheckInsRepository.save(checkIn)

    return {}
  }
}
