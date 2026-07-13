import type { Metadata } from "next"

import { ArrowLeft } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/shared/i18n"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"
import { Container } from "@/shared/ui/widgets"

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
        <Link href="/">
          <ArrowLeft />
          {t("back")}
        </Link>
      </Button>

      <Typography as="h1" variant="h1" color="burgundy" className="text-center">
        {t("heading")}
      </Typography>

      <div className="flex flex-col gap-6 text-justify">
        <Typography variant="body">{t("paragraph1")}</Typography>
        <Typography variant="body">{t("paragraph2")}</Typography>
        <Typography variant="body">{t("paragraph3")}</Typography>
        <Typography variant="body">{t("paragraph4")}</Typography>

        <ul className="flex flex-col gap-2">
          <Typography as="li" variant="body" className="font-bold">
            — {t("listItem1")}
          </Typography>
          <Typography as="li" variant="body" className="font-bold">
            — {t("listItem2")}
          </Typography>
          <Typography as="li" variant="body" className="font-bold">
            — {t("listItem3")}
          </Typography>
          <Typography as="li" variant="body" className="font-bold">
            — {t("listItem4")}
          </Typography>
          <Typography as="li" variant="body" className="font-bold">
            — {t("listItem5")}
          </Typography>
        </ul>

        <Typography variant="body">{t("paragraph5")}</Typography>
        <Typography variant="body">{t("paragraph6")}</Typography>
        <Typography variant="body">{t("paragraph7")}</Typography>
        <Typography variant="body">{t("paragraph8")}</Typography>
      </div>
    </Container>
  )
}
