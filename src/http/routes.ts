import { FastifyInstance } from 'fastify'

import { authenticateController } from '@/http/controllers/authenticate.controller'
import { registerController } from '@/http/controllers/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticateController)
  app.post('/users', registerController)
}
