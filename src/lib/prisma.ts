import { PrismaClient } from '@prisma/client'

import { env } from '@/env'

const isDev = env.NODE_ENV === 'dev'

export const prisma = new PrismaClient({
  log: isDev ? ['query'] : [],
})
