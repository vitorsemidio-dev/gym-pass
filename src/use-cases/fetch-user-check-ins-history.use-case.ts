import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

type FetchUserCheckInsUseCaseInput = {
  userId: string
}

type FetchUserCheckInsUseCaseOutput = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsUseCaseInput): Promise<FetchUserCheckInsUseCaseOutput> {
    const checkIns = await this.prismaCheckInsRepository.findManyByUserId(
      userId,
    )
    return {
      checkIns,
    }
  }
}
