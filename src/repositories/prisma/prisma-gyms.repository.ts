import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, SearchNearbyParams } from '../gyms.repository'

export class PrismaGymsRepository implements GymsRepository {
  searchNearby(params: SearchNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.')
  }

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
}
