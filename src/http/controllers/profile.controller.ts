import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(request.headers)
  await request.jwtVerify()
  console.log(request.user.sub)

  return reply.status(200).send()
}
