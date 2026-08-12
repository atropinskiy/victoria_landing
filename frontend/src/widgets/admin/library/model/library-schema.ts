import * as z from "zod"

import { bilingual } from "@/shared/lib/validation"

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]

export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]

const imageFile = z
  .file()
  .max(MAX_FILE_SIZE, "Файл больше 10 МБ")
  .mime(IMAGE_MIME_TYPES, "Только изображения")

const documentFile = z
  .file()
  .max(MAX_FILE_SIZE, "Файл больше 10 МБ")
  .mime(DOCUMENT_MIME_TYPES, "Только документы")

export const libraryFormSchema = z.object({
  title: bilingual,
  image: imageFile.optional(),
  document: documentFile.optional(),
})

export const libraryCreateSchema = libraryFormSchema.extend({
  image: imageFile,
  document: documentFile,
})

export type LibraryFormValues = z.infer<typeof libraryFormSchema>
