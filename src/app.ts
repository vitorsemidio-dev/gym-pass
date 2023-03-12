import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '@/env'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { usersRoutes } from '@/http/controllers/users/routes'

export const app = fastify()

// Plugins - JWT
app.register(fastifyJwt, {
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

// Plugins - Cookie
app.register(fastifyCookie)

// Plugins - Routes
app.register(checkInsRoutes)
app.register(gymsRoutes)
app.register(usersRoutes)

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
