import type { Locale, Translator } from "@/shared/i18n"

import { getLocale } from "next-intl/server"

import { getServices } from "@/entities/service"

import { ServiceRow } from "./ServiceRow"

interface ServicesListProps {
  t: Translator
}

export async function ServicesList({ t }: ServicesListProps) {
  const locale = (await getLocale()) as Locale
  const services = await getServices()

  return (
    <>
      {services.map((service) => (
        <ServiceRow key={service.id} service={service} t={t} locale={locale} />
      ))}
    </>
  )
}
