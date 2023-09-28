import { PrismaClient } from "@prisma/client"

import { logger } from "../logger"
import { getErrorMessage } from "../utils"

export const client = new PrismaClient()

export const connectDb = async (): Promise<void> => {
  logger.info("Connecting to db")

  try {
    await client.$connect()
  } catch (error) {
    throw new Error(
      `Failed connecting to db due to error: ${getErrorMessage(error)}`
    )
  }
}

export const disconnectDb = async (): Promise<void> => {
  logger.info("Disconnecting from db")

  try {
    await client.$disconnect()
  } catch (error) {
    throw new Error(
      `Failed disconnecting from db due to error: ${getErrorMessage(error)}`
    )
  }
}
