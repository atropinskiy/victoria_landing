import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function LibrarySection() {
  const t = await getTranslations("main")

  return (
    <Container id="library">
      <SectionTitle>{t("libraryTitle")}</SectionTitle>
    </Container>
  )
}
