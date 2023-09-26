import { initTRPC } from "@trpc/server"
import { logger } from "./logger"

const t = initTRPC.create()

export const router = t.router

const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  logger.info(`Request of type: ${type}, to path: ${path}`)
  return next()
})

export const publicProcedure = t.procedure.use(loggerMiddleware)
