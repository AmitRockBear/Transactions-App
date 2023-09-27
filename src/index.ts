import run from "./app/run"
import { logger } from "./logger"
import { getErrorMessage } from "./utils"

const main = () => {
  try {
    run()
  } catch (error) {
    logger.error(getErrorMessage(error))
  }
}

main()
