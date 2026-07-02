import { getTranslations, setRequestLocale } from "next-intl/server"
import Image from "next/image"

import { Button } from "@/shared/ui/button"
import { Typography } from "@/shared/ui/typography"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations("main")

  return (
    <div className="mx-auto w-full max-w-182.5">
      <div className="flex justify-center">
        <div className="-mr-8 w-62 min-w-62">
          <div className="">
            <Typography variant="h2" as="span" color="burgundy">
              {t("namePart1")}
            </Typography>
            <Typography variant="h2" as="span" color="cream" className="relative">
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

        <div className="flex flex-col items-end">
          <Image
            src="/images/portrait.avif"
            alt={t("alt")}
            width={504}
            height={578}
            priority
            className="-mt-12"
          />

          <Typography variant="bodyLg" className="mt-6 max-w-126">
            {t("description")}
          </Typography>

          <Button size="xl" className="mt-16 self-end">
            {t("cta")}
          </Button>
        </div>
      </div>
    </div>
  )
}
