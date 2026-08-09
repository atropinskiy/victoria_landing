"use client"

import type { CaseFormValues } from "@/widgets/admin/model/case-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { caseFormSchema } from "@/widgets/admin/model/case-schema"
import { BilingualRow } from "@/widgets/admin/ui/BilingualRow"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { FormDropzone } from "@/shared/ui/widgets"

interface CaseFormProps {
  defaultValues?: CaseFormValues
  previewUrl?: string | null
  submitLabel?: string
  isPending?: boolean
  submit: (values: CaseFormValues) => Promise<void>
}

export function CaseForm({
  defaultValues,
  previewUrl,
  submitLabel,
  isPending,
  submit,
}: CaseFormProps) {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
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
      <div className="grid gap-x-8 gap-y-4 lg:grid-cols-[1fr_16.5rem]">
        <div className="flex flex-col">
          <Typography variant="h6" color="navy">
            Название
          </Typography>
          <BilingualRow control={form.control} name="title" />

          <Typography variant="h6" color="navy" className="mt-4">
            Описание
          </Typography>
          <BilingualRow control={form.control} name="description" multiline />
        </div>

        <div className="flex w-full max-w-66 flex-col">
          <Typography variant="h6" color="navy">
            Изображение
          </Typography>
          <FormDropzone
            control={form.control}
            name="image"
            previewUrl={previewUrl}
            hint="JPG, PNG, WebP или AVIF, до 10 МБ"
            className="mt-1.5"
          />
        </div>
      </div>

      <Button type="submit" className="mt-8" disabled={isPending}>
        {submitLabel}
      </Button>
    </form>
  )
}
