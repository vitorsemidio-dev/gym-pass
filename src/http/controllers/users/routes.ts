import { FastifyInstance } from 'fastify'

import { authenticateController } from '@/http/controllers/users/authenticate.controller'
import { profileController } from '@/http/controllers/users/profile.controller'
import { refreshController } from '@/http/controllers/users/refresh.controller'
import { registerController } from '@/http/controllers/users/register.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)

  app.patch('/token/refresh', refreshController)

  // Authenticated
  app.get('/me', { onRequest: verifyJWT }, profileController)
}
