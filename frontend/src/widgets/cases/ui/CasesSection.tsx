import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function CasesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="cases" bg="secondary">
      <SectionTitle>{t("casesTitle")}</SectionTitle>
    </Container>
  )
}
