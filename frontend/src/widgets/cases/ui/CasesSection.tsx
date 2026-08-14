import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { Container, SectionTitle } from "@/shared/ui/widgets"

import { CasesList } from "./CasesList"
import { CasesListSkeleton } from "./CasesListSkeleton"

export async function CasesSection() {
  const t = await getTranslations("main")

  return (
    <Container id="cases" bg="secondary">
      <SectionTitle>{t("casesTitle")}</SectionTitle>
      <Suspense fallback={<CasesListSkeleton />}>
        <CasesList />
      </Suspense>
    </Container>
  )
}
