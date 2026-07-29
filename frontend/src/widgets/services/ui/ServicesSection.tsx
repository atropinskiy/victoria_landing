"use client"

import { useTranslations } from "next-intl"

import { SERVICES } from "@/widgets/services/config/services"
import { useServices } from "@/entities/service"
import { Container, SectionTitle } from "@/shared/ui/widgets"

import { ServiceRow } from "./ServiceRow"

export function ServicesSection() {
  const t = useTranslations("main")
  const {} = useServices()

  return (
    <Container id="services">
      <SectionTitle>{t("servicesTitle")}</SectionTitle>

      <div className="flex flex-col gap-8">
        {SERVICES.map((service) => (
          <ServiceRow key={service.titleKey} service={service} t={t} />
        ))}
      </div>
    </Container>
  )
}
