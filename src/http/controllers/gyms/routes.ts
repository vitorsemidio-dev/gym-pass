import { FastifyInstance } from 'fastify'

import { createController } from '@/http/controllers/gyms/create.controller'
import { nearbyController } from '@/http/controllers/gyms/nearby.controller'
import { searchController } from '@/http/controllers/gyms/search.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/nearby', nearbyController)
  app.get('/gyms/search', searchController)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createController)
}
