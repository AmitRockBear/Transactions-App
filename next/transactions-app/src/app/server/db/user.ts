import { logger } from "../../../../../../logger/logger"
import { getErrorMessage } from "../utils"
import { type Fields, type Projection, type Query } from "../types"
import { type AccountWithoutUser } from "./account"
import { client } from "./prisma"

export interface UserWithoutAccounts {
  id: number
  name: string
  description: string | null
}

export interface UserWithAccounts extends UserWithoutAccounts {
  accounts: AccountWithoutUser[]
}

export const getUsersByQuery = async <keys extends keyof UserWithAccounts>(
  query?: Query<UserWithoutAccounts>,
  projection?: Projection<UserWithAccounts>
): Promise<Fields<UserWithAccounts, keys>[] | null> => {
  logger.info(
    `Getting users by query: ${JSON.stringify(
      query
    )}, with projection: ${JSON.stringify(projection)}`
  )

  try {
    return (await client.user.findMany({
      where: query,
      select: projection,
    })) as unknown as Fields<UserWithAccounts, keys>[] | null
  } catch (error) {
    throw new Error(
      `Failed to get users by query, due to error: ${getErrorMessage(error)}`
    )
  }
}

export const getUserById = async <keys extends keyof UserWithAccounts>(
  id: UserWithoutAccounts["id"],
  projection?: Projection<UserWithAccounts>
): Promise<Fields<UserWithAccounts, keys> | null> => {
  logger.info(
    `Getting user with id: ${id}, with projection: ${JSON.stringify(
      projection
    )}`
  )

  try {
    return (await client.user.findFirst({
      where: { id },
      select: projection,
    })) as Fields<UserWithAccounts, keys> | null
  } catch (error) {
    throw new Error(
      `Failed to get user with id ${id}, due to error: ${getErrorMessage(
        error
      )}`
    )
  }
}

export interface CreateUserInput {
  name: UserWithoutAccounts["name"]
  description?: UserWithoutAccounts["description"]
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
