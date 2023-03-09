import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { GymsRepository } from '@/repositories/gyms.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

type CheckInUseCaseInput = {
  gymId: string
  userId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseOutput = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private prismaCheckInsRepository: CheckInsRepository,
    private prismaGymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseInput): Promise<CheckInUseCaseOutput> {
    const gym = await this.prismaGymsRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error('User is too far from the gym')
    }

    const checkInOnSameDay =
      await this.prismaCheckInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new Error('User already checked in on this day')
    }

    const checkIn = await this.prismaCheckInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })
    return {
      checkIn,
    }
  }
}
