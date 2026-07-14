import * as z from "zod"

export function createRegistrationSchema(t: (key: string) => string) {
  return z
    .object({
      username: z.string().min(3, t("usernameMinLength")),
      email: z
        .email({ message: t("emailInvalid") })
        .optional()
        .or(z.literal("")),
      password: z.string().min(8, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    })
}

export type RegistrationFormValues = z.infer<ReturnType<typeof createRegistrationSchema>>
