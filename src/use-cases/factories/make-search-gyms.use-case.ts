import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms.use-case'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(prismaGymsRepository)
  return useCase
}
