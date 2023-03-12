import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { CreateGymUseCase } from '@/use-cases/create-gym.use-case'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(prismaGymsRepository)
  return useCase
}
