import { createHTTPServer } from "@trpc/server/adapters/standalone"

import setup from "./setup"
import { serverRouter } from "../routers"
import { logger } from "../logger"

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000

export default async () => {
  await setup()

  const server = createHTTPServer({ router: serverRouter })

  const { port } = server.listen(PORT)

  if (port) logger.info(`Server is up on port ${port}`)
}
