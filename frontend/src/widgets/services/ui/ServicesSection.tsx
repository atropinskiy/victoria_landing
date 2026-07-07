import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function ServicesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="services">
      <SectionTitle>{t("servicesTitle")}</SectionTitle>
    </Container>
  )
}
