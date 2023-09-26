import { router, publicProcedure } from "../../trpc"
import { appHealthCheckHandler } from "./handlers"

export const appRouter = router({
  appHealthCheck: publicProcedure.query(appHealthCheckHandler),
})
