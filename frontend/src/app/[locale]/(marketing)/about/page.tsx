import type { Metadata } from "next"

import { ArrowLeft } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Suspense } from "react"

import { AboutContentSkeleton, AboutFullContent } from "@/widgets/about"
import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about")

  return {
    title: t("title"),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("about")

  return (
    <Container bg="secondary" className="gap-10">
      <Button asChild variant="plain" size="sm" className="-ml-3 self-start">
        <Link href={AppRoutes.HOME}>
          <ArrowLeft />
          {t("back")}
        </Link>
      </Button>

      <Typography as="h1" variant="h1" color="burgundy" className="text-center">
        {t("heading")}
      </Typography>

      <Suspense fallback={<AboutContentSkeleton lines={[4, 4, 5, 2, 10]} />}>
        <AboutFullContent />
      </Suspense>
    </Container>
  )
}
