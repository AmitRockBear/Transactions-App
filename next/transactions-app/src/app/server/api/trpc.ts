import { initTRPC } from "@trpc/server"
import { ZodError } from "zod"

import { logger } from "../../../../../../logger/logger"
import { getErrorMessage } from "../utils"

const t = initTRPC.create({
  errorFormatter(opts) {
    const { type, path, shape, error } = opts

    logger.error(
      `Request of type: ${type}, to path: ${path} has failed due to: ${
        getErrorMessage(error) ?? "unknown error"
      }`
    )

    return {
      ...shape,
      data: {
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

export const router = t.router

const loggerMiddleware = t.middleware(async ({ path, type, next }) => {
  logger.info(`Request of type: ${type}, to path: ${path}`)
  return next()
})

export const publicProcedure = t.procedure.use(loggerMiddleware)
