"use client"

import type { AboutFormValues } from "@/widgets/admin/model/about-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { aboutFormSchema } from "@/widgets/admin/model/about-schema"
import { useAbout, useAboutUpdate } from "@/entities/about"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { FormRichText } from "@/shared/ui/widgets"

export function AboutForm() {
  const { data } = useAbout()
  const { isPending: isUpdating, mutateAsync } = useAboutUpdate()
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      full: { ru: "", en: "" },
      promo: { ru: "", en: "" },
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        full: { ru: data.full.ru, en: data.full.en },
        promo: { ru: data.promo.ru, en: data.promo.en },
      })
      form.trigger()
    }
  }, [data])

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
