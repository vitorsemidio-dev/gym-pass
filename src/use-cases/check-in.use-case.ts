import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

type CheckInUseCaseInput = {
  gymId: string
  userId: string
}

type CheckInUseCaseOutput = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private prismaCheckInsRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseInput): Promise<CheckInUseCaseOutput> {
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
