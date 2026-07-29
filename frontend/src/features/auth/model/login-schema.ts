import * as z from "zod"

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    login: z.string().min(3, t("usernameMinLength")),
    password: z.string().min(8, t("passwordMinLength")),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
