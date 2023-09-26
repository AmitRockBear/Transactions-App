import { router } from "../trpc"

import { accountRouter } from "./account/router"
import { appRouter } from "./app/router"
import { userRouter } from "./user/router"

export const serverRouter = router({
  app: appRouter,
  user: userRouter,
  account: accountRouter,
})

export type ServerRouter = typeof serverRouter
