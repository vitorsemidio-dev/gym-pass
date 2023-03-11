import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private data: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.data.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('day')
    const endOfDay = dayjs(date).endOf('day')
    const checkInOnSameDate = this.data.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isSameUser = checkIn.user_id === userId
      const isOnSameDay =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)
      return isSameUser && isOnSameDay
    })

    return checkInOnSameDate ?? null
  }

  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    const checkIns = this.data.filter((checkIn) => checkIn.user_id === userId)
    return checkIns
  }
}
