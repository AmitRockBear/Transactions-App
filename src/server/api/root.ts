import { router } from "./trpc"

import { accountRouter } from "./routers/account/router"
import { userRouter } from "./routers/user/router"

export const serverRouter = router({
  user: userRouter,
  account: accountRouter,
})

export type ServerRouter = typeof serverRouter
