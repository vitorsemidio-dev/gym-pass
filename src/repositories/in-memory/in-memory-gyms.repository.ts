import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms.repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepository {
  private data: Gym[] = []

  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: data.id || randomUUID(),
      description: data.description || null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      phone: data.phone || null,
      title: data.title,
    }
    this.data.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.data.find((gym) => gym.id === id)
    return gym || null
  }

  async searchMany(query: string, page: number) {
    const itensPerPage = 20
    const gyms = this.data
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * itensPerPage, page * itensPerPage)
    return gyms
  }
}
