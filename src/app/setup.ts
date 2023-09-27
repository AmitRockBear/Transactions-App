import { connectDb, disconnectDb } from "../db"
import { initLogger, logger } from "../logger"

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

export default async () => {
  initLogger()

  logger.info("Starting server setup")

  await connectDb()

  handleExitSignals()

  logger.info("Finished server setup")
}

const handleExitSignals = () => {
  const _signalHandler = async (signal: NodeJS.SignalsListener) => {
    await disconnectDb()
    logger.info(`Server shutdowns due to exit signal: ${signal}`)
    process.exit()
  }

  process.on("SIGINT", _signalHandler)
  process.on("SIGTERM", _signalHandler)
  process.on("SIGQUIT", _signalHandler)
}
