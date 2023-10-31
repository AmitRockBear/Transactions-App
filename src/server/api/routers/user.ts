import z from "zod"
import { router, publicProcedure } from "../trpc"
import {
  userByIdHandler,
  userCreateHandler,
  userListHandler,
  userTransfterAccountsHandler,
} from "../handlers/user"

const isId = z.number().refine(Number.isInteger)
export const userCreateInputValidation = z.object({
  name: z.string(),
  description: z.string().optional(),
})
export const userTransferAccountsInputValidation = z.object({
  fromUserId: isId,
  toUserId: isId,
})

export const userRouter = router({
  userList: publicProcedure.query(userListHandler),
  userById: publicProcedure.input(isId).query(userByIdHandler),
  userCreate: publicProcedure
    .input(userCreateInputValidation)
    .mutation(userCreateHandler),
  userTransfterAccounts: publicProcedure
    .input(userTransferAccountsInputValidation)
    .mutation(userTransfterAccountsHandler),
})
