import * as z from "zod"

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    username: z.string().min(1, t("usernameRequired")),
    password: z.string().min(1, t("passwordRequired")),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>
