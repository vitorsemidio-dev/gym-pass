import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

type FetchNearbyGymsUseCaseInput = {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyGymsUseCaseOutput = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private prismaGymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseInput): Promise<FetchNearbyGymsUseCaseOutput> {
    const gyms = await this.prismaGymsRepository.searchNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return {
      gyms,
    }
  }
}
