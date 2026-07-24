import * as z from "zod"

const bilingual = z.object({
  ru: z.string().min(1, "Заполните поле"),
  en: z.string().min(1, "Заполните поле"),
})

export const serviceFormSchema = z.object({
  title: bilingual,
  description: bilingual,
  stages: z.array(
    z.object({
      title: bilingual,
      items: z.array(bilingual).min(1, "Добавьте хотя бы один пункт"),
    })
  ),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
