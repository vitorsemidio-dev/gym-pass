import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'

import {
  GymsRepository,
  SearchNearbyParams,
} from '@/repositories/gyms.repository'
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

  async searchNearby(params: SearchNearbyParams) {
    const maxDistanceInKilometers = 10
    const gyms = this.data.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )
      console.log(distance)
      return distance <= maxDistanceInKilometers
    })
    return gyms
  }
}
