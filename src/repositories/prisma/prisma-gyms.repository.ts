import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, SearchNearbyParams } from '../gyms.repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data })
    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })
    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const itensPerPage = 20
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * itensPerPage,
      take: itensPerPage,
    })
    return gyms
  }

  async searchNearby({
    latitude,
    longitude,
  }: SearchNearbyParams): Promise<Gym[]> {
    const MAX_DISTANCE_IN_KILOMETERS = 10
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT *
      FROM gyms
      WHERE (
          6371 * acos(
              cos(radians(${latitude})) * cos(radians(latitude)) *
              cos(radians(longitude) - radians(${longitude})) +
              sin(radians(${latitude})) * sin(radians(latitude))
          )
      ) <= ${MAX_DISTANCE_IN_KILOMETERS}
    `
    return gyms
  }
}
