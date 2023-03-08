import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users.repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private prismaUsersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseParams) {
    const userExists = await this.prismaUsersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.prismaUsersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
