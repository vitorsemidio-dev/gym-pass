import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories'
import { omit } from '@/utils/clone-object'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify()
  const { sub: userId } = request.user
  const useCase = makeGetUserProfileUseCase()

  const { user } = await useCase.execute({ userId })
  const userWithoutPassword = omit(user, ['password_hash'])

  return reply.status(200).send({
    user: userWithoutPassword,
  })
}
