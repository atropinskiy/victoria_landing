import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"

import { LOCALE } from "@/shared/i18n/config"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("main")

  return (
    <div className="mx-auto flex w-full max-w-182.5 flex-col">
      <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start sm:justify-end">
        <div
          className={cn(
            "mt-6 mr-0 w-62 min-w-62 text-center sm:mt-0 sm:-mr-6 sm:text-left",
            locale === LOCALE.EN && "mr-0 sm:-mr-14"
          )}
        >
          <div>
            <Typography variant="h2" as="span" color="burgundy" className="tracking-[0.02em]">
              {t("namePart1")}
            </Typography>
            <Typography
              variant="h2"
              as="span"
              color="cream"
              className="text-burgundy sm:text-cream relative"
            >
              {t("namePart2")}
            </Typography>
          </div>
          <Typography variant="h5" className="mt-2 tracking-tight">
            {t("subtitle")}
          </Typography>
          <Typography variant="h1" color="burgundy">
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
        <Typography variant="bodyLg" className="mt-6 max-w-126">
          {t("description")}
        </Typography>

        <Button size="xl" className="mt-16 w-full self-end sm:w-auto">
          {t("cta")}
        </Button>
      </div>

      <div className="mt-24 flex flex-col items-center gap-10 sm:items-center">
        <Typography variant="h3" className="border-burgundy border-t-8 leading-13">
          {t("cases")}
        </Typography>
        <Typography variant="h5" className="border-burgundy border-t-6 leading-13 sm:self-end">
          {t("deals")}
        </Typography>
        <Typography variant="h3" className="border-burgundy border-t-8 leading-13 sm:self-end">
          {t("experience")}
        </Typography>
        <Typography variant="h5" className="border-burgundy border-t-6 leading-13 sm:self-end">
          {t("mediation")}
        </Typography>
        <Typography variant="h3" className="border-burgundy w-full border-t-8 leading-13 sm:w-85">
          {t("realty")}
        </Typography>
      </div>
    </div>
  )
}
