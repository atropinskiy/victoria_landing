import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { Container, SectionTitle } from "@/shared/ui/widgets"

import { ServicesList } from "./ServicesList"
import { ServicesListSkeleton } from "./ServicesListSkeleton"

export async function ServicesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="services">
      <SectionTitle>{t("servicesTitle")}</SectionTitle>

      <div className="flex flex-col gap-8">
        <Suspense fallback={<ServicesListSkeleton />}>
          <ServicesList t={t} />
        </Suspense>
      </div>
    </Container>
  )
}
