import type { Metadata } from "next"

import { ArrowLeft } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { AppRoutes } from "@/shared/config"
import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound")

  return {
    title: t("message"),
  }
}

export default async function NotFound() {
  const t = await getTranslations("notFound")

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <Typography as="span" variant="h1" color="burgundy">
        404
      </Typography>
      <Typography as="p" variant="body">
        {t("message")}
      </Typography>
      <Button asChild size="lg" className="w-55">
        <Link href={AppRoutes.HOME}>
          <ArrowLeft />
          {t("back")}
        </Link>
      </Button>
    </section>
  )
}
