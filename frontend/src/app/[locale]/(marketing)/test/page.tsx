import type { Metadata } from "next"

import { ArrowLeft } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { BusinessPartnerTest } from "@/widgets/test"
import { getTest } from "@/entities/test"
import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/widgets"

export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("test")

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function TestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const test = await getTest()
  if (!test) notFound()

  const t = await getTranslations("about")

  return (
    <Container grow className="gap-10">
      <Button asChild variant="plain" size="sm" className="-ml-3 self-start">
        <Link href={AppRoutes.SERVICES}>
          <ArrowLeft />
          {t("back")}
        </Link>
      </Button>

      <BusinessPartnerTest test={test} />
    </Container>
  )
}
