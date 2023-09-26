export const getErrorMessage = (error: unknown): string => {
  let errorMessage = "Undefined error"
  if (!error) errorMessage = "Error is null"
  else {
    if (error instanceof Error) errorMessage = error.message
    if (typeof error !== "object") errorMessage = String(error)
    else if ("message" in error) errorMessage = String(error.message)
  }
  return errorMessage
}
