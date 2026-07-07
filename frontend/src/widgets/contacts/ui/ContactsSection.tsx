import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function ContactsSection() {
  const t = await getTranslations("main")

  return (
    <Container id="contacts" bg="secondary">
      <SectionTitle>{t("contactsTitle")}</SectionTitle>
    </Container>
  )
}
