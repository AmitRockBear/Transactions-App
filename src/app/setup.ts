import { connectDb, disconnectDb } from "../db"
import { validateEnvVars } from "../envVarsValidator"
import { initLogger, logger } from "../logger"

export default async () => {
  validateEnvVars()

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
