import { getTranslations } from "next-intl/server"

import { Container, SectionTitle } from "@/shared/ui/widgets"
import { LibraryCarousel } from "@/widgets/library/ui/LibraryCarousel"
import { LibraryLoginCta } from "@/widgets/library/ui/LibraryLoginCta"

export async function LibrarySection() {
  const t = await getTranslations("main")

  return (
    <Container id="library">
      <SectionTitle>{t("libraryTitle")}</SectionTitle>

      <LibraryCarousel />

      <LibraryLoginCta />
    </Container>
  )
}
