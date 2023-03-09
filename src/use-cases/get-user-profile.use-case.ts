import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'

type GetUserProfileUseCaseInput = {
  userId: string
}

type GetUserProfileUseCaseOutput = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private prismaUsersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseInput): Promise<GetUserProfileUseCaseOutput> {
    const user = await this.prismaUsersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return {
      user,
    }
  }
}
