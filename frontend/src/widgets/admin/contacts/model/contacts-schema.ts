import * as z from "zod"

import { bilingual } from "@/shared/lib/validation"

export const contactFormSchema = z.object({
  email: z.email(),
  phone: z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Введите номер полностью"),
  address: bilingual,
  map_url: z.union([z.literal(""), z.url("Некорректная ссылка")]),
  hours: bilingual,
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
