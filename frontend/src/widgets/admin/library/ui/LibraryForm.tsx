"use client"

import type { LibraryFormValues } from "@/widgets/admin/library/model/library-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  DOCUMENT_MIME_TYPES,
  IMAGE_MIME_TYPES,
  libraryCreateSchema,
  libraryFormSchema,
  MAX_FILE_SIZE,
} from "@/widgets/admin/library/model/library-schema"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { BilingualRow, FormFileDropzone, FormImageDropzone } from "@/shared/ui/widgets"

interface LibraryFormProps {
  defaultValues?: LibraryFormValues
  previewUrl?: string | null
  documentUrl?: string | null
  requireFiles?: boolean
  submitLabel?: string
  isPending?: boolean
  submit: (values: LibraryFormValues) => Promise<void>
}

export function LibraryForm({
  defaultValues,
  previewUrl,
  documentUrl,
  requireFiles,
  submitLabel,
  isPending,
  submit,
}: LibraryFormProps) {
  const form = useForm<LibraryFormValues>({
    resolver: zodResolver(requireFiles ? libraryCreateSchema : libraryFormSchema),
    defaultValues: defaultValues ?? {
      title: { ru: "", en: "" },
    },
  })

  const onSubmit = async (values: LibraryFormValues) => {
    await submit(values)
    if (!defaultValues) form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid gap-x-8 gap-y-4 lg:grid-cols-[1fr_18rem_13rem]">
        <div className="flex flex-col">
          <Typography as="h6" variant="h6" color="navy">
            Название
          </Typography>
          <BilingualRow
            control={form.control}
            name="title"
            className="gap-2 sm:flex-col sm:gap-2"
          />
        </div>

        <div className="flex w-full max-w-72 flex-col">
          <Typography as="h6" variant="h6" color="navy">
            Документ
          </Typography>
          <FormFileDropzone
            control={form.control}
            name="document"
            previewUrl={documentUrl}
            accept={DOCUMENT_MIME_TYPES}
            maxSize={MAX_FILE_SIZE}
            hint="PDF, DOC, XLS или PPT, до 10 МБ"
            className="mt-2"
          />
        </div>

        <div className="flex w-full max-w-52 flex-col">
          <Typography as="h6" variant="h6" color="navy">
            Обложка
          </Typography>
          <FormImageDropzone
            control={form.control}
            name="image"
            previewUrl={previewUrl}
            aspect={3 / 4}
            accept={IMAGE_MIME_TYPES}
            maxSize={MAX_FILE_SIZE}
            hint="JPG, PNG, WebP или AVIF, до 10 МБ"
            className="mt-2"
          />
        </div>
      </div>

      <Button type="submit" className="mt-4" disabled={isPending}>
        {submitLabel}
      </Button>
    </form>
  )
}
