import { type Logger, createLogger, transports, format } from "winston"

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
    transports: [
      new transports.Console(),
      new transports.File({ filename: "./logs/error.log", level: "error" }),
      new transports.File({ filename: "./logs/combined.log" }),
    ],
  })
}
