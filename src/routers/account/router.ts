import { z } from "zod"

import { router, publicProcedure } from "../../trpc"
import {
  accountByIdHandler,
  accountCreateHandler,
  accountDeleteByIdHandler,
  accountListHandler,
  accountTransactionHandler,
} from "./handlers"

export const accountRouter = router({
  accountList: publicProcedure.query(accountListHandler),
  accountById: publicProcedure
    .input(z.number().refine(Number.isInteger))
    .query(accountByIdHandler),
  accountCreate: publicProcedure
    .input(
      z.object({
        balance: z.number().optional(),
        userId: z.number().refine(Number.isInteger),
      })
    )
    .mutation(accountCreateHandler),
  accountTransaction: publicProcedure
    .input(
      z.object({
        fromAccountId: z.number().refine(Number.isInteger),
        toAccountId: z.number().refine(Number.isInteger),
        transactionAmount: z.number().refine((number) => number > 0),
      })
    )
    .mutation(accountTransactionHandler),
  accountDeleteById: publicProcedure
    .input(z.number().refine(Number.isInteger))
    .query(accountDeleteByIdHandler),
})
