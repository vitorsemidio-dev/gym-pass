import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createController } from '@/http/controllers/check-ins/create.controller'
import { historyController } from '@/http/controllers/check-ins/history.controller'
import { metricsController } from '@/http/controllers/check-ins/metrics.controller'
import { validateController } from '@/http/controllers/check-ins/validate.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateController,
  )

  app.post('/gyms/:gymId/check-ins', createController)
}
