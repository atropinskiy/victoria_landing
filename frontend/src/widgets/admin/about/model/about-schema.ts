import * as z from "zod"

const richText = z
  .string()
  .refine((html) => html.replace(/<[^>]*>/g, "").trim().length > 0, "Заполните поле")

const richBilingual = z.object({
  ru: richText,
  en: richText,
})

export const aboutFormSchema = z.object({
  full: richBilingual,
  promo: richBilingual,
})

export type AboutFormValues = z.infer<typeof aboutFormSchema>
