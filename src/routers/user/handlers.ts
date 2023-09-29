import {
  client,
  getUsersByQuery,
  getUserById,
  createUser,
  updateAccountsUserId,
  type CreateUserInput,
  type UserWithoutAccounts,
} from "../../db"
import { getErrorMessage } from "../../utils"

export const userListHandler = async () => {
  return await getUsersByQuery()
}

export const userByIdHandler = async (opts: {
  input: UserWithoutAccounts["id"]
}) => {
  const { input: id } = opts
  return await getUserById(id)
}

export const userCreateHandler = async (opts: { input: CreateUserInput }) => {
  const { input } = opts
  return await createUser(input)
}

interface userTransfterAccountsInput {
  fromUserId: UserWithoutAccounts["id"]
  toUserId: UserWithoutAccounts["id"]
}

export const userTransfterAccountsHandler = async (opts: {
  input: userTransfterAccountsInput
}) => {
  const { input } = opts
  const { fromUserId, toUserId } = input

  const fromUserAccountsObject = await getUserById<"accounts">(fromUserId, {
    accounts: true,
  })
  if (!fromUserAccountsObject)
    return `Accounts transfer has failed, user with id: ${fromUserId} does not exist`

  const toUser = await getUserById(toUserId)
  if (!toUser)
    return `Accounts transfer has failed, user with id: ${toUserId} does not exist`

  const { accounts: fromUserAccounts } = fromUserAccountsObject
  try {
    await client.$transaction(async (_) => {
      await Promise.all(
        fromUserAccounts.map((account) =>
          updateAccountsUserId(account.id, toUserId)
        )
      )
    })
  } catch (error) {
    throw new Error(
      `Accounts transfer has failed, due to error: ${getErrorMessage(error)}`
    )
  }

  return `Accounts were sucessfully transfered from user with id: ${fromUserId} to user with id: ${toUserId}`
}
