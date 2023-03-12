import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )
  return useCase
}
