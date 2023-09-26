import {
  getUsersByQuery,
  getUserById,
  createUser,
  type CreateUserInput,
} from "../../db"

export const userListHandler = async () => {
  return await getUsersByQuery()
}

export const userByIdHandler = async (opts: { input: number }) => {
  const { input: id } = opts
  return await getUserById(id)
}

export const userCreateHandler = async (opts: { input: CreateUserInput }) => {
  const { input } = opts
  return await createUser(input)
}
