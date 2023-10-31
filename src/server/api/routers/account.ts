import z from "zod"
import { router, publicProcedure } from "../trpc"
import {
  accountByIdHandler,
  accountCreateHandler,
  accountDeleteByIdHandler,
  accountListHandler,
  accountTransactionHandler,
} from "../handlers/account"

const isId = z.number().refine(Number.isInteger)
export const accountCreateInputValidation = z.object({
  balance: z.number().optional(),
  userId: isId,
})
export const accountTransactionInputValidation = z.object({
  fromAccountId: isId,
  toAccountId: isId,
  transactionAmount: z.number().refine((number) => number > 0),
})

export const accountRouter = router({
  accountList: publicProcedure.query(accountListHandler),
  accountById: publicProcedure.input(isId).query(accountByIdHandler),
  accountCreate: publicProcedure
    .input(accountCreateInputValidation)
    .mutation(accountCreateHandler),
  accountTransaction: publicProcedure
    .input(accountTransactionInputValidation)
    .mutation(accountTransactionHandler),
  accountDeleteById: publicProcedure
    .input(isId)
    .query(accountDeleteByIdHandler),
})
