import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile.use-case'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(prismaUsersRepository)
  return useCase
}
