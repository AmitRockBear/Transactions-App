import { z } from "zod"

import { router, publicProcedure } from "../../trpc"
import { userByIdHandler, userCreateHandler, userListHandler } from "./handlers"

export const userRouter = router({
  userList: publicProcedure.query(userListHandler),
  userById: publicProcedure
    .input(z.number().refine((number) => Number.isInteger(number)))
    .query(userByIdHandler),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(userCreateHandler),
})
