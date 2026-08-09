import * as z from "zod"

export const bilingual = z.object({
  ru: z.string().min(1, "Заполните поле"),
  en: z.string().min(1, "Заполните поле"),
})

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

export const caseFormSchema = z.object({
  title: bilingual,
  description: bilingual,
  image: z
    .file()
    .max(MAX_IMAGE_SIZE)
    .mime(["image/jpeg", "image/png", "image/webp", "image/avif"], "Только изображения")
    .optional(),
})

export type CaseFormValues = z.infer<typeof caseFormSchema>
