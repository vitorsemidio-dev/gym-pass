import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'
import { appRoutes } from '@/http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((err, _request, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: err.format(),
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: log to a external tool like DataDog/Sentry/NewRelic/etc
  }
  reply.status(500).send({
    message: 'Internal server error',
  })
})
