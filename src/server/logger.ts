import { createLogger, transports, format } from "winston"

export const logger = createLogger({
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
