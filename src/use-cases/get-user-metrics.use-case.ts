import { CheckInsRepository } from '@/repositories/check-ins.repository'

type GetUserMetricsUseCaseInput = {
  userId: string
}

type GetUserMetricsUseCaseOutput = {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseOutput> {
    const checkInsCount = await this.prismaCheckInsRepository.countByUserId(
      userId,
    )
    return {
      checkInsCount,
    }
  }
}
