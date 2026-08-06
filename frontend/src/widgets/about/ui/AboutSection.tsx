import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { AboutContent } from "@/widgets/about/ui/AboutContent"
import { AboutContentSkeleton } from "@/widgets/about/ui/AboutContentSkeleton"
import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Container, SectionTitle } from "@/shared/ui/widgets"

export async function AboutSection() {
  const t = await getTranslations("main")

  return (
    <Container id="about" bg="secondary" className="items-center">
      <SectionTitle>{t("aboutTitle")}</SectionTitle>
      <Suspense fallback={<AboutContentSkeleton />}>
        <AboutContent />
      </Suspense>
      <Button size="lg" asChild className="mt-10">
        <Link href={AppRoutes.ABOUT_PAGE}>{t("aboutCta")}</Link>
      </Button>
    </Container>
  )
}
