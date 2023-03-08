import { FastifyInstance } from 'fastify'

import { registerController } from '@/http/controllers/register-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
}
