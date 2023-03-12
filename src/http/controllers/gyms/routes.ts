import { FastifyInstance } from 'fastify'

import { createController } from '@/http/controllers/gyms/create.controller'
import { nearbyController } from '@/http/controllers/gyms/nearby.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/nearby', nearbyController)
  app.post('/gyms', createController)
}
