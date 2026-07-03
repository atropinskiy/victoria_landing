import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"

import { LOCALE } from "@/shared/i18n"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Container } from "@/shared/ui/container"
import { Typography } from "@/shared/ui/typography"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("main")

  return (
    <main className="flex w-full flex-col">
      <Container className="mx-auto flex max-w-182.5 flex-col">
        <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start sm:justify-end">
          <div
            className={cn(
              "mt-6 mr-0 w-62 min-w-62 text-center sm:mt-0 sm:-mr-6 sm:text-left",
              locale === LOCALE.EN && "mr-0 sm:-mr-14"
            )}
          >
            <Typography variant="h1" as="h1" className="inline leading-none">
              <Typography
                as="span"
                variant="h2"
                color="burgundy"
                className="leading-none tracking-[0.02em]"
              >
                {t("namePart1")}
              </Typography>
              <Typography
                as="span"
                variant="h2"
                color="cream"
                className="text-burgundy sm:text-cream relative leading-none"
              >
                {t("namePart2")}
              </Typography>
            </Typography>

            <Typography as="p" variant="h5" className="mt-1 tracking-tight">
              {t("subtitle")}
            </Typography>

            <Typography as="span" variant="h1" color="burgundy" className="leading-none">
              {t("surname")}
            </Typography>
          </div>

          <Image
            src="/images/portrait.avif"
            alt={t("alt")}
            width={504}
            height={578}
            priority
            sizes="(min-width: 640px) 504px, 100vw"
            className="-mx-4 -mt-12 h-auto w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-126"
          />
        </div>
        <div className="self-center text-center sm:self-end sm:text-end">
          <Typography as="p" variant="bodyLg" className="mt-6 max-w-126">
            {t("description")}
          </Typography>

          <Button size="xl" className="mt-16 w-full self-end sm:w-auto">
            {t("cta")}
          </Button>
        </div>
        <ul className="mt-28 flex flex-col items-center gap-12">
          <Typography
            as="li"
            variant="h3"
            className="border-burgundy block border-t-8 pt-2 text-center sm:pr-10 sm:text-start"
          >
            {t("cases")}
          </Typography>
          <Typography
            as="li"
            variant="h5"
            className="border-burgundy block border-t-6 pt-2 text-center sm:self-end sm:text-start"
          >
            {t("deals")}
          </Typography>
          <Typography
            as="li"
            variant="h3"
            className="border-burgundy block border-t-8 pt-2 text-center sm:self-end sm:text-start"
          >
            {t("experience")}
          </Typography>
          <Typography
            as="li"
            variant="h5"
            className="border-burgundy block border-t-6 pt-2 text-center sm:self-end sm:text-start"
          >
            {t("mediation")}
          </Typography>
          <Typography
            as="li"
            variant="h3"
            className="border-burgundy block w-full border-t-8 pt-2 text-center sm:w-92 sm:pr-8 sm:text-start"
          >
            {t("realty")}
          </Typography>
        </ul>

        <Typography variant="h3" color="burgundy" className="mt-28 text-center whitespace-pre-line">
          {t("directionsTitle")}
        </Typography>

        <div className="mt-12 flex flex-col items-center justify-between gap-24 sm:flex-row">
          <ul className="flex flex-col gap-8">
            <Typography variant="h5" className="font-normal">
              {t("directionsItem1")}
            </Typography>
            <Typography variant="h5" className="font-normal">
              {t("directionsItem2")}
            </Typography>
            <Typography variant="h5" className="font-normal">
              {t("directionsItem3")}
            </Typography>
            <Typography variant="h5" className="font-normal">
              {t("directionsItem4")}
            </Typography>
            <Typography variant="h5" className="font-normal">
              {t("directionsItem5")}
            </Typography>
            <Typography variant="h5" className="font-normal">
              {t("directionsItem6")}
            </Typography>
          </ul>
          <Card className="min-w-fit" variant="default">
            <CardHeader className="text-xl">{t("customersTitle")}</CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 font-semibold italic">
                <Typography>{t("customerIndustry1")}</Typography>
                <Typography>{t("customerIndustry2")}</Typography>
                <Typography>{t("customerIndustry3")}</Typography>
                <Typography>{t("customerIndustry4")}</Typography>
                <Typography>{t("customerIndustry5")}</Typography>
                <Typography>{t("customerIndustry6")}</Typography>
                <Typography>{t("customerIndustry7")}</Typography>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>

      <div className="bg-card">
        <Container className="mx-auto flex max-w-182.5 flex-col items-center gap-10 text-center">
          <Typography as="h3" variant="h3" color="burgundy">
            {t("aboutTitle")}
          </Typography>
          <div className="flex flex-col gap-8 text-justify">
            <Typography variant="body" className="font-bold">
              {t("aboutIntro")}
            </Typography>
            <div>
              <Typography variant="body" className="font-bold">
                {t("aboutEducationTitle")}
              </Typography>
              <Typography variant="body">{t("aboutEducationMgua")}</Typography>
              <Typography variant="body">{t("aboutEducationMgavt")}</Typography>
            </div>
            <Typography variant="body">{t("aboutSince2008")}</Typography>
            <Typography variant="body">{t("aboutLocation")}</Typography>
            <Typography variant="body">{t("aboutClosing")}</Typography>
          </div>
          <Button size="lg">{t("aboutCta")}</Button>
        </Container>
      </div>
    </main>
  )
}
