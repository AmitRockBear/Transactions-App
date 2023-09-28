import { client } from "../db/prisma"
import { logger } from "../logger"
import { getErrorMessage } from "../utils"
import { type UserWithoutAccounts } from "./user"

export interface AccountWithoutUser {
  id: number
  balance: number
  userId: number
}

export interface AccountWithUser extends AccountWithoutUser {
  user: UserWithoutAccounts
}

export interface AccountQuery {
  id?: number
  name?: number
  userId?: number
}

export interface AccountProjection {
  id?: boolean
  balance?: boolean
  user?: boolean
}

export const getAccountsByQuery = async (
  query?: AccountQuery,
  projection?: AccountProjection
): Promise<AccountWithUser[] | null> => {
  logger.info(
    `Getting accounts by query: ${JSON.stringify(
      query
    )}, with projection: ${JSON.stringify(projection)}`
  )

  try {
    return (await client.account.findMany({
      where: query,
      select: projection,
    })) as AccountWithUser[] | null
  } catch (error) {
    throw new Error(
      `Failed to get accounts by query, due to error: ${getErrorMessage(error)}`
    )
  }
}

export const getAccountById = async (
  id: number,
  projection?: AccountProjection
): Promise<AccountWithUser | null> => {
  logger.info(
    `Getting account with id: ${id}, with projection: ${JSON.stringify(
      projection
    )}`
  )

  try {
    return (await client.account.findFirst({
      where: { id },
      select: projection,
    })) as AccountWithUser | null
  } catch (error) {
    throw new Error(
      `Failed to get account with id ${id}, due to error: ${getErrorMessage(
        error
      )}`
    )
  }
}

export interface CreateAccountData {
  balance?: number
  userId: number
}

export const createAccount = async (
  input: CreateAccountData
): Promise<AccountWithoutUser> => {
  const { balance, userId } = input

  logger.info(
    `Creating account for user with id: ${userId}, with initial balance of: ${
      balance ?? 0
    }`
  )

  try {
    return await client.account.create({
      data: { balance, user: { connect: { id: userId } } },
    })
  } catch (error) {
    throw new Error(
      `Failed to create account with balance ${balance} of user with id ${userId}, due to error: ${getErrorMessage(
        error
      )}`
    )
  }
}

export const decreaseAccountBalanceById = async (
  id: number,
  amountToDecrease: number
): Promise<AccountWithoutUser> => {
  logger.info(
    `Decreasing balance of account with id: ${id}, by ${amountToDecrease}`
  )

  try {
    return await client.account.update({
      where: {
        id,
      },
      data: {
        balance: { decrement: amountToDecrease },
      },
    })
  } catch (error) {
    throw new Error(
      `Failed to decrease balance of account with id: ${id}, by ${amountToDecrease}`
    )
  }
}

export const increaseAccountBalanceById = async (
  id: number,
  amountToIncrease: number
): Promise<AccountWithoutUser> => {
  logger.info(
    `Increasing balance of account with id: ${id}, by ${amountToIncrease}`
  )

  try {
    return await client.account.update({
      where: {
        id,
      },
      data: {
        balance: { increment: amountToIncrease },
      },
    })
  } catch (error) {
    throw new Error(
      `Failed to increase balance of account with id: ${id}, by ${amountToIncrease}`
    )
  }
}

export const updateAccountsUserId = async (
  accountId: number,
  userId: number
): Promise<AccountWithoutUser> => {
  logger.info(
    `Update user of account with id: ${accountId} to user with id: ${userId}`
  )

  try {
    return await client.account.update({
      where: {
        id: accountId,
      },
      data: {
        userId,
      },
    })
  } catch (error) {
    throw new Error(
      `Failed to update user of account with id: ${accountId} to user with id: ${userId}`
    )
  }
}

export const deleteAccountById = async (
  id: number
): Promise<AccountWithoutUser> => {
  logger.info(`Deleting account with id: ${id}`)

  try {
    return await client.account.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    throw new Error(`Failed to delete account with id: ${id}`)
  }
}
