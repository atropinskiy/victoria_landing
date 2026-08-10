import * as z from "zod"

import { bilingual } from "@/shared/lib/validation"

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024

export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]

const imageFile = z
  .file()
  .max(MAX_IMAGE_SIZE, "Файл больше 10 МБ")
  .mime(IMAGE_MIME_TYPES, "Только изображения")

export const caseFormSchema = z.object({
  title: bilingual,
  description: bilingual,
  image: imageFile.optional(),
})

export const caseCreateSchema = caseFormSchema.extend({
  image: imageFile,
})

export type CaseFormValues = z.infer<typeof caseFormSchema>
