import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'

export function makeSearchGymsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)
  return useCase
}
