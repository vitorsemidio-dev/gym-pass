import { Gym, Prisma } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'

type CreateGymUseCaseInput = {
  description?: string | null
  latitude: number
  longitude: number
  phone?: string | null
  title: string
}

type CreateGymUseCaseOutput = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private prismaGymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseInput): Promise<CreateGymUseCaseOutput> {
    const gym = await this.prismaGymsRepository.create({
      title,
      description,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      phone,
    })

    return {
      gym,
    }
  }
}
