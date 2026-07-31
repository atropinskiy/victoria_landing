import type { Metadata } from "next"

import { ArrowLeft } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { BusinessPartnerTest } from "@/widgets/test"
import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Container } from "@/shared/ui/widgets"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about")

  return {
    title: t("title"),
  }
}

export default async function TestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("about")

  return (
    <Container grow className="gap-10">
      <Button asChild variant="plain" size="sm" className="-ml-3 self-start">
        <Link href={AppRoutes.SERVICES}>
          <ArrowLeft />
          {t("back")}
        </Link>
      </Button>

      <BusinessPartnerTest />
    </Container>
  )
}
