import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { FetchUserCheckInsUseCase } from '@/use-cases/fetch-user-check-ins-history.use-case'

export function makeFetchUserCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsUseCase(prismaCheckInsRepository)
  return useCase
}
