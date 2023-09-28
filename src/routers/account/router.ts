import { z } from "zod"

import { router, publicProcedure } from "../../trpc"
import {
  accountByIdHandler,
  accountCreateHandler,
  accountDeleteByIdHandler,
  accountListHandler,
  accountTransactionHandler,
} from "./handlers"

const isId = z.number().refine(Number.isInteger)

export const accountRouter = router({
  accountList: publicProcedure.query(accountListHandler),
  accountById: publicProcedure.input(isId).query(accountByIdHandler),
  accountCreate: publicProcedure
    .input(
      z.object({
        balance: z.number().optional(),
        userId: isId,
      })
    )
    .mutation(accountCreateHandler),
  accountTransaction: publicProcedure
    .input(
      z.object({
        fromAccountId: isId,
        toAccountId: isId,
        transactionAmount: z.number().refine((number) => number > 0),
      })
    )
    .mutation(accountTransactionHandler),
  accountDeleteById: publicProcedure
    .input(isId)
    .query(accountDeleteByIdHandler),
})
