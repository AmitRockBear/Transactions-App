import { z } from "zod"

import { router, publicProcedure } from "../../trpc"
import { userByIdHandler, userCreateHandler, userListHandler } from "./handlers"

const isId = z.number().refine(Number.isInteger)

export const userRouter = router({
  userList: publicProcedure.query(userListHandler),
  userById: publicProcedure.input(isId).query(userByIdHandler),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(userCreateHandler),
})
