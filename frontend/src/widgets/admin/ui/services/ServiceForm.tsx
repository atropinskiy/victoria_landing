"use client"

import type { ServiceFormValues } from "@/widgets/admin/model/service-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

import { serviceFormSchema } from "@/widgets/admin/model/service-schema"
import { BilingualRow } from "@/widgets/admin/ui/BilingualRow"
import { StageFields } from "@/widgets/admin/ui/services/StageFields"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

interface ServiceFormProps {
  defaultValues?: ServiceFormValues
  submitLabel?: string
  isPending?: boolean
  submit: (values: ServiceFormValues) => Promise<void>
}

export function ServiceForm({ defaultValues, submitLabel, isPending, submit }: ServiceFormProps) {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: defaultValues ?? {
      title: { ru: "", en: "" },
      description: { ru: "", en: "" },
      stages: [{ title: { ru: "", en: "" }, items: [{ ru: "", en: "" }] }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stages",
  })

  const onSubmit = async (values: ServiceFormValues) => {
    await submit(values)
    if (!defaultValues) form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <Typography variant="h6" color="navy">
        Название
      </Typography>
      <BilingualRow control={form.control} name="title" />

      <Typography variant="h6">Подход</Typography>
      <Typography variant="bodyXs" color="navy" className="mt-3 font-medium">
        Особенность моего подхода
      </Typography>
      <BilingualRow control={form.control} name="description" multiline />
      <Typography variant="h6" color="navy">
        Этапы
      </Typography>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border-border mt-2 flex flex-col gap-3 rounded-sm border p-3"
        >
          <StageFields control={form.control} stageIndex={index} onRemove={() => remove(index)} />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append({ title: { ru: "", en: "" }, items: [] })}
      >
        <Plus />
        Добавить этап
      </Button>
      <Button type="submit" className="mt-8" disabled={isPending}>
        {submitLabel}
      </Button>
    </form>
  )
}
