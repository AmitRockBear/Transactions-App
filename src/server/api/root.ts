import { router } from "./trpc"
import { accountRouter } from "./routers/account"
import { userRouter } from "./routers/user"

export const appRouter = router({
  user: userRouter,
  account: accountRouter,
})

export type AppRouter = typeof appRouter
