import * as z from "zod"

import { bilingual } from "@/shared/lib/validation"

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
