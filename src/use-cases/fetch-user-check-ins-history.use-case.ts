import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

type FetchUserCheckInsUseCaseInput = {
  userId: string
  page: number
}

type FetchUserCheckInsUseCaseOutput = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page = 1,
  }: FetchUserCheckInsUseCaseInput): Promise<FetchUserCheckInsUseCaseOutput> {
    const checkIns = await this.prismaCheckInsRepository.findManyByUserId(
      userId,
      page,
    )
    return {
      checkIns,
    }
  }
}
