import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

type FetchUserCheckInsHistoryUseCaseInput = {
  userId: string
  page: number
}

type FetchUserCheckInsHistoryUseCaseOutput = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserCheckInsHistoryUseCaseInput): Promise<FetchUserCheckInsHistoryUseCaseOutput> {
    const checkIns = await this.prismaCheckInsRepository.findManyByUserId(
      userId,
      page,
    )
    return {
      checkIns,
    }
  }
}
