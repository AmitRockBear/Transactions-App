import z from "zod"

type EnvSchemaType = z.infer<typeof envSchema>

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().trim().min(1),
  COMBINED_LOG_PATH: z.string().trim().default("./logs/combined.log"),
  ERROR_LOG_PATH: z.string().trim().default("./logs/error.log"),
})

export let envServer: EnvSchemaType

export const validateEnvVars = () => {
  const envParsed = envSchema.safeParse({
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    COMBINED_LOG_PATH: process.env.COMBINED_LOG_PATH,
    ERROR_LOG_PATH: process.env.ERROR_LOG_PATH,
  })

  if (!envParsed.success) {
    console.error(envParsed.error.issues)
    process.exit(1)
  }

  envServer = envParsed.data
}
