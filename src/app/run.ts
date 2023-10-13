import { createHTTPServer } from "@trpc/server/adapters/standalone"

import setup from "./setup"
import { serverRouter } from "../routers"
import { logger } from "../logger"
import { envServer } from "../envVarsValidator"

export default async () => {
  await setup()

  const server = createHTTPServer({ router: serverRouter })

  const { port } = server.listen(envServer.PORT)

  if (port) logger.info(`Server is up on port ${port}`)
}
