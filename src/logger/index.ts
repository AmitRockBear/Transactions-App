import { type Logger, createLogger, transports, format } from "winston"
import { envServer } from "../envVarsValidator"

export let logger: Logger

export const initLogger = () => {
  logger = createLogger({
    level: "info",
    format: format.combine(
      format.colorize({
        level: true,
      }),
      format.timestamp({
        format: "YY-MM-DD HH:mm:ss",
      }),
      format.printf(
        (info) => `${info.timestamp}  [${info.level}] : ${info.message}`
      )
    ),
    transports: [new transports.Console()],
  })
}
