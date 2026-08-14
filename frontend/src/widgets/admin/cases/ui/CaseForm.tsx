"use client"

import type { CaseFormValues } from "@/widgets/admin/cases/model/case-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  caseCreateSchema,
  caseFormSchema,
  IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE,
} from "@/widgets/admin/cases/model/case-schema"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { BilingualRow, FormImageDropzone } from "@/shared/ui/widgets"

interface CaseFormProps {
  defaultValues?: CaseFormValues
  previewUrl?: string | null
  requireImage?: boolean
  submitLabel?: string
  isPending?: boolean
  submit: (values: CaseFormValues) => Promise<void>
}

export function CaseForm({
  defaultValues,
  previewUrl,
  requireImage,
  submitLabel,
  isPending,
  submit,
}: CaseFormProps) {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(requireImage ? caseCreateSchema : caseFormSchema),
    defaultValues: defaultValues ?? {
      title: { ru: "", en: "" },
      description: { ru: "", en: "" },
    },
  })

  const onSubmit = async (values: CaseFormValues) => {
    await submit(values)
    if (!defaultValues) form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid gap-x-8 gap-y-4 lg:grid-cols-[1fr_13rem]">
        <div className="flex flex-col">
          <Typography as="h6" variant="h6" color="navy">
            Название
          </Typography>
          <BilingualRow control={form.control} name="title" />

          <Typography as="h6" variant="h6" color="navy" className="mt-3">
            Описание
          </Typography>
          <BilingualRow control={form.control} name="description" multiline size="lg" />
        </div>

        <div className="flex w-full max-w-52 flex-col">
          <Typography as="h6" variant="h6" color="navy">
            Изображение
          </Typography>
          <FormImageDropzone
            control={form.control}
            name="image"
            previewUrl={previewUrl}
            aspect={3 / 4}
            accept={IMAGE_MIME_TYPES}
            maxSize={MAX_IMAGE_SIZE}
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
