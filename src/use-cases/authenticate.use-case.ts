import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users.repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'

type AuthenticateUseCaseInput = {
  email: string
  password: string
}

type AuthenticateUseCaseOutput = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private prismaUsersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const user = await this.prismaUsersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const isPasswordMatch = await compare(password, user.password_hash)
    if (!isPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
