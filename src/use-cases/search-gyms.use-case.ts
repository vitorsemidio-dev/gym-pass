import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

type SearchGymsUseCaseInput = {
  query: string
  page: number
}

type SearchGymsUseCaseOutput = {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private prismaGymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseInput): Promise<SearchGymsUseCaseOutput> {
    const gyms = await this.prismaGymsRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}
