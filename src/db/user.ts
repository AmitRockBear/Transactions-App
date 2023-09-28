import { logger } from "../logger"
import { getErrorMessage } from "../utils"
import { type AccountWithoutUser, updateAccountsUserId } from "./account"
import { client } from "./prisma"

export interface UserWithoutAccounts {
  id: number
  name: string
  description: string | null
}

export interface UserWithAccounts extends UserWithoutAccounts {
  accounts: AccountWithoutUser[]
}

export interface UserQuery {
  id?: number
  name?: string
  description?: string
}

export interface UserProjection {
  id?: boolean
  name?: boolean
  description?: boolean
  accounts?: boolean
}

export const getUsersByQuery = async (
  query?: UserQuery,
  projection?: UserProjection
): Promise<UserWithAccounts[] | null> => {
  logger.info(
    `Getting users by query: ${JSON.stringify(
      query
    )}, with projection: ${JSON.stringify(projection)}`
  )

  try {
    return (await client.user.findMany({
      where: query,
      select: projection,
    })) as UserWithAccounts[] | null
  } catch (error) {
    throw new Error(
      `Failed to get users by query, due to error: ${getErrorMessage(error)}`
    )
  }
}

export const getUserById = async (
  id: number,
  projection?: UserProjection
): Promise<UserWithAccounts | null> => {
  logger.info(
    `Getting user with id: ${id}, with projection: ${JSON.stringify(
      projection
    )}`
  )

  try {
    return (await client.user.findFirst({
      where: { id },
      select: projection,
    })) as UserWithAccounts | null
  } catch (error) {
    throw new Error(
      `Failed to get user with id ${id}, due to error: ${getErrorMessage(
        error
      )}`
    )
  }
}

export interface CreateUserInput {
  name: string
  description?: string
}

export const createUser = async (
  input: CreateUserInput
): Promise<UserWithoutAccounts> => {
  const { name } = input

  logger.info(`Creating user with name: ${name}`)

  try {
    return await client.user.create({ data: input })
  } catch (error) {
    throw new Error(
      `Failed to create user with name ${name}, due to error: ${getErrorMessage(
        error
      )}`
    )
  }
}
