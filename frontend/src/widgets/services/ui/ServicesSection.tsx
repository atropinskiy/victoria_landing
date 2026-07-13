import { getTranslations } from "next-intl/server"

import { SERVICES } from "@/widgets/services/config/services"
import { Container, SectionTitle } from "@/shared/ui/widgets"

import { ServiceRow } from "./ServiceRow"

export async function ServicesSection() {
  const t = await getTranslations("main")

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
