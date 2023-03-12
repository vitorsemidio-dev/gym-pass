import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms.use-case'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository)
  return useCase
}
