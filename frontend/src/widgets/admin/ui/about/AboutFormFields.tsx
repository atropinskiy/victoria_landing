"use client"

import type { About } from "@/entities/about"
import type { AboutFormValues } from "@/widgets/admin/model/about-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { aboutFormSchema } from "@/widgets/admin/model/about-schema"
import { useAboutUpdate } from "@/entities/about"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { FormRichText } from "@/shared/ui/widgets"

interface AboutFormFieldsProps {
  about: About
}

export function AboutFormFields({ about }: AboutFormFieldsProps) {
  const { isPending: isUpdating, mutateAsync } = useAboutUpdate()
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      promo: about.promo,
      full: about.full,
    },
  })

  async function onSubmit(values: AboutFormValues): Promise<void> {
    const promise = mutateAsync({ body: values })

    toast.promise(promise, {
      loading: "Сохраняем изменения",
      success: "Изменения сохранены",
      error: (error) => ({
        message: error?.message || "Не удалось сохранить изменения",
      }),
    })

    await promise
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Typography variant="h6" color="navy">
          Промо
        </Typography>
        <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:gap-5">
          <FormRichText control={form.control} name="promo.ru" label="RU" height="162px" />
          <FormRichText control={form.control} name="promo.en" label="EN" height="162px" />
        </div>
      </div>
      <div>
        <Typography variant="h6" color="navy">
          Полная
        </Typography>
        <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:gap-6">
          <FormRichText control={form.control} name="full.ru" label="RU" height="235px" />
          <FormRichText control={form.control} name="full.en" label="EN" height="235px" />
        </div>
      </div>

      <Button type="submit" disabled={isUpdating}>
        Сохранить
      </Button>
    </form>
  )
}
