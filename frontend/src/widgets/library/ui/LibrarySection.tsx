import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { Container, SectionTitle } from "@/shared/ui/widgets"
import { LibraryList } from "@/widgets/library/ui/LibraryList"
import { LibraryListSkeleton } from "@/widgets/library/ui/LibraryListSkeleton"
import { LibraryLoginCta } from "@/widgets/library/ui/LibraryLoginCta"

export async function LibrarySection() {
  const t = await getTranslations("main")

  return (
    <Container id="library">
      <SectionTitle>{t("libraryTitle")}</SectionTitle>

      <Suspense fallback={<LibraryListSkeleton />}>
        <LibraryList />
      </Suspense>

      <LibraryLoginCta />
    </Container>
  )
}
