"use client"

import { useTranslations } from "next-intl"

import { useServices } from "@/entities/service"
import { Container, SectionTitle } from "@/shared/ui/widgets"

import { ServiceRow } from "./ServiceRow"
import { ServiceRowSkeleton } from "./ServiceRowSkeleton"

export function ServicesSection() {
  const t = useTranslations("main")
  const { data, isPending } = useServices()

  return (
    <Container id="services">
      <SectionTitle>{t("servicesTitle")}</SectionTitle>

      <div className="flex flex-col gap-8">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <ServiceRowSkeleton key={i} isFirst={i === 0} />
            ))
          : data?.map((service) => <ServiceRow key={service.id} service={service} t={t} />)}
      </div>
    </Container>
  )
}
