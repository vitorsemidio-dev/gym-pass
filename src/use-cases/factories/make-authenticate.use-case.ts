import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
  return authenticateUseCase
}
