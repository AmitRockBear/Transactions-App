import { client } from "../../db/prisma"
import {
  createAccount,
  getAccountById,
  getAccountsByQuery,
  decreaseAccountBalanceById,
  increaseAccountBalanceById,
  deleteAccountById,
  type CreateAccountData,
  type AccountWithoutUser,
} from "../../db"

export const accountListHandler = async () => {
  return await getAccountsByQuery()
}

export const accountByIdHandler = async (opts: {
  input: AccountWithoutUser["id"]
}) => {
  const { input: id } = opts
  return await getAccountById(id)
}

export const accountCreateHandler = async (opts: {
  input: CreateAccountData
}) => {
  const { input } = opts
  return await createAccount(input)
}

export const accountDeleteByIdHandler = async (opts: {
  input: AccountWithoutUser["id"]
}) => {
  const { input: id } = opts

  await deleteAccountById(id)

  return true
}

interface AccountTransactionInput {
  fromAccountId: AccountWithoutUser["id"]
  toAccountId: AccountWithoutUser["id"]
  transactionAmount: AccountWithoutUser["balance"]
}

export const accountTransactionHandler = async (opts: {
  input: AccountTransactionInput
}) => {
  const { input } = opts
  const { fromAccountId, toAccountId, transactionAmount } = input

  const fromAccountBalanceObject = await getAccountById(fromAccountId, {
    balance: true,
  })
  if (!fromAccountBalanceObject)
    return `Transaction has failed, account with id ${fromAccountId} (the account passing the money) does not exist`

  const { balance } = fromAccountBalanceObject
  if (balance < transactionAmount)
    return `Transaction has failed, account with id ${fromAccountId} does not have enough money`

  const toAccount = await getAccountById(toAccountId)
  if (!toAccount)
    return `Transaction has failed, account with id ${toAccountId} (the account getting the money) does not exist`

  try {
    await client.$transaction(async (_) => {
      await decreaseAccountBalanceById(fromAccountId, transactionAmount)
      await increaseAccountBalanceById(toAccountId, transactionAmount)
    })
  } catch (error) {
    console.error(error)
    return "Transaction has failed. Don't worry we haven't taken money from your account"
  }
}
