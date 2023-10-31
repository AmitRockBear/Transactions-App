import { TRPCError } from "@trpc/server"
import { ZodError } from "zod"

export const getErrorMessage = (error: unknown): string => {
  let errorMessage = "Undefined error"

  if (!error) errorMessage = "Error is null"
  else {
    if (error instanceof Error) errorMessage = error.message
    if (typeof error === "object" && "message" in error)
      errorMessage = String(error.message)
    else errorMessage = String(error)
    if (error instanceof TRPCError) {
      if (error.code === "BAD_REQUEST" && error.cause instanceof ZodError) {
        errorMessage = error.cause.flatten().formErrors[0] as string
      } else errorMessage = error.message
    }
  }

  return errorMessage
}
