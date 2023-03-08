import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

const isDev = env.NODE_ENV === 'dev'

export const prisma = new PrismaClient({
  log: isDev ? ['query'] : [],
})
