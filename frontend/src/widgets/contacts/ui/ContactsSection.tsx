import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { ContactsContent } from "@/widgets/contacts/ui/ContactsContent"
import { ContactsContentSkeleton } from "@/widgets/contacts/ui/ContactsContentSkeleton"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function ContactsSection() {
  const t = await getTranslations("main")

  return (
    <Container id="contacts" bg="secondary">
      <SectionTitle>{t("contactsTitle")}</SectionTitle>
      <Suspense fallback={<ContactsContentSkeleton />}>
        <ContactsContent />
      </Suspense>
    </Container>
  )
}
