import { FastifyInstance } from 'fastify'

import { authenticateController } from '@/http/controllers/authenticate.controller'
import { registerController } from '@/http/controllers/register.controller'
import { profileController } from '@/http/controllers/profile.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)

  // Authenticated
  app.get('/me', { onRequest: verifyJWT }, profileController)
}
