import * as z from "zod"

export const bilingual = z.object({
  ru: z.string().min(1, "Заполните поле"),
  en: z.string().min(1, "Заполните поле"),
})

export const bilingualOptional = z.object({
  ru: z.string(),
  en: z.string(),
})
