import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

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

    checkIn.validated_at = new Date()
    await this.prismaCheckInsRepository.save(checkIn)

    return {}
  }
}
