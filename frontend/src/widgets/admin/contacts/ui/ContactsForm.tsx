"use client"

import type { Contacts } from "@/entities/contact"
import type { ContactFormValues } from "@/widgets/admin/contacts/model/contacts-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { contactFormSchema } from "@/widgets/admin/contacts/model/contacts-schema"
import { useContactsUpdate } from "@/entities/contact"
import { toastSaveChanges } from "@/shared/lib/toast"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { BilingualRow, FormInput, FormPhoneInput } from "@/shared/ui/widgets"

export function ContactsForm({ defaultValues }: { defaultValues: Contacts }) {
  const { isPending: isUpdating, mutateAsync } = useContactsUpdate()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: defaultValues ?? {
      email: "",
      phone: "",
      address: { ru: "", en: "" },
      hours: { ru: "", en: "" },
      map_url: "",
    },
  })

  async function onSubmit(values: ContactFormValues): Promise<void> {
    await toastSaveChanges(mutateAsync({ body: values }))
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="">
      <div className="flex flex-col bg-white p-5">
        <div className="flex flex-1 flex-col gap-1 md:flex-row md:gap-6">
          <div className="flex-1">
            <Typography as="h6" variant="h6" color="navy">
              Почта
            </Typography>
            <FormInput
              variant="light"
              size="sm"
              name="email"
              control={form.control}
              className="mt-2"
            />
          </div>
          <div className="flex-1">
            <Typography as="h6" variant="h6" color="navy">
              Телефон
            </Typography>
            <FormPhoneInput
              label="+7 (###) ###-##-##"
              variant="light"
              size="sm"
              name="phone"
              control={form.control}
              className="mt-2"
            />
          </div>
        </div>
        <div>
          <Typography as="h6" variant="h6" color="navy">
            Адрес
          </Typography>
          <BilingualRow name="address" control={form.control} className="mt-2 bg-white" />
        </div>

        <div className="">
          <Typography as="h6" variant="h6" color="navy">
            Режим работы
          </Typography>
          <BilingualRow name="hours" control={form.control} className="mt-2 bg-white" />
        </div>

        <div>
          <Typography as="h6" variant="h6" color="navy">
            URL карты{" "}
          </Typography>
          <FormInput
            variant="light"
            size="sm"
            name="map_url"
            label="https://yandex.ru/maps/..."
            control={form.control}
            className="mt-2"
            helperText={
              <Typography variant="bodyXs" as="span" color="slate" className="sm:text-[14px]">
                Скопируйте ссылку на свой адрес c{" "}
                <Typography
                  as="a"
                  color="burgundy"
                  href="https://yandex.ru/maps/213/moscow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:text-[14px]"
                >
                  Яндекс.Карт
                </Typography>
              </Typography>
            }
          />
        </div>
        <Button type="submit" disabled={isUpdating} className="mt-8">
          Сохранить
        </Button>
      </div>
    </form>
  )
}
