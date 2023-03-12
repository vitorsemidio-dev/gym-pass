import { FastifyInstance } from 'fastify'

import { createController } from '@/http/controllers/gyms/create.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms', createController)
}
