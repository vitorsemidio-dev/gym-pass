import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

import { CheckInsRepository } from '@/repositories/check-ins.repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private data: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: data.id || randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }
    this.data.push(checkIn)
    return checkIn
  }

  async countByUserId(userId: string): Promise<number> {
    return this.data.filter((checkIn) => checkIn.user_id === userId).length
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.data.find((checkIn) => checkIn.id === id)
    return checkIn ?? null
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

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const itensPerPage = 20
    const checkIns = this.data
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * itensPerPage, page * itensPerPage)
    return checkIns
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.data.findIndex(
      (checkInItem) => checkInItem.id === checkIn.id,
    )
    if (checkInIndex < 0) {
      return this.create(checkIn)
    }
    this.data[checkInIndex] = checkIn
    return checkIn
  }
}
